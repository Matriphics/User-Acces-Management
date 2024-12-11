import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      // Make the POST request to the API
      const response = await axios.post(
        `http://127.0.0.1:8082/auth/user_request/${requestId}/action`,
        { action }, // Body payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      alert(response.data.message); // Notify the user of the action result
      fetchData(); // Refresh the data after action
    } catch (error) {
      console.error("Error processing action:", error.response?.data || error.message);
      alert("Failed to process action. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8082/auth/user_requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.user_requests;
      setRows(
        data.map((item, index) => ({
          id: index + 1, // Add a unique `id` required by DataGrid
          ...item,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const columns = [
    { field: "request_id", headerName: "Request ID", width: 120 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email_id", headerName: "Email ID", width: 200 },
    { field: "role_id", headerName: "Role ID", width: 120 },
    { field: "reason", headerName: "Reason", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <button
            onClick={() => handleAction(params.row.request_id, "Approve")}
            style={{
              padding: "5px 10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Approve
          </button>
          <button
            onClick={() => handleAction(params.row.request_id, "Deny")}
            style={{
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Deny
          </button>
        </Box>
      ),
    },
  ];

  return (
    <Box
    sx={{
      height: "calc(100vh - 60px)", // Subtract navbar height
      width: "100%",
      marginTop: "60px", // Add margin to avoid overlap
    }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
      />
    </Box>
  );
}

