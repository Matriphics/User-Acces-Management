import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const AssetRequestsForApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(""); // Feedback for any errors or actions
  const [userRole, setUserRole] = useState(""); // To store the user's role

  // Fetch pending requests and check user role
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setFeedback("");

      try {
        const token = localStorage.getItem("accessToken"); // Assuming token is stored here

        if (!token) {
          setFeedback("You need to log in to view approval requests.");
          setTimeout(() => {
            window.location.href = "/"; // Redirect to login page
          }, 2000);
          return;
        }

        // Fetch pending requests
        const response = await axios.get(
          "http://127.0.0.1:8082/pending_asset_requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests(response.data);

        // Fetch user role
        const userResponse = await axios.get("http://127.0.0.1:8082/user_role", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status === 200) {
          setUserRole(userResponse.data.role_name); // Assuming the API returns the role name
        }
      } catch (error) {
        console.error("Error fetching approval requests or user role:", error);
        setFeedback(
          error.response?.data?.message || "Error fetching data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `http://127.0.0.1:8082/approve_asset_request/${requestId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests((prev) => prev.filter((req) => req.request_id !== requestId));
      setFeedback(`Request ${action.toLowerCase()}ed successfully.`);
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing request:`, error);
      setFeedback(
        error.response?.data?.message ||
          `Error ${action.toLowerCase()}ing the request.`
      );
    }
  };

  if (loading) return <CircularProgress />;

  // Restrict view to only CISO and SO roles
  if (userRole !== "CISO" && userRole !== "SO") {
    return <Alert severity="error">You do not have permission to view this page.</Alert>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Asset Requests for Approval
      </Typography>
      {feedback && <Alert severity="info">{feedback}</Alert>}

      {requests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Asset ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Request Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.request_id}>
                  <TableCell>{request.request_id}</TableCell>
                  <TableCell>{request.asset_id}</TableCell>
                  <TableCell>{request.user_id}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    {new Date(request.request_time).toLocaleString()}
                  </TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAction(request.request_id, "Approve")}
                      sx={{ marginRight: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleAction(request.request_id, "Deny")}
                    >
                      Deny
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No pending requests found.</Typography>
      )}
    </Box>
  );
};

export default AssetRequestsForApproval;
