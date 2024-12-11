import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

const MyAssetRequests = () => {
  const [assetId, setAssetId] = useState(""); // For raising a request
  const [reason, setReason] = useState(""); // Reason for raising a request
  const [pendingRequests, setPendingRequests] = useState([]); // Pending requests
  const [approvedAssets, setApprovedAssets] = useState([]); // Approved assets
  const [deniedRequests, setDeniedRequests] = useState([]); // Denied requests
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchMyRequests = async () => {
      setLoading(true);
      setFeedback("");

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8082/my_asset_requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { pending_requests, approved_assets, denied_requests } = response.data;
          setPendingRequests(pending_requests);
          setApprovedAssets(approved_assets);
          setDeniedRequests(denied_requests);
        } else {
          setFeedback("Failed to fetch asset requests.");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setFeedback("An error occurred while fetching requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!assetId || !reason) {
      setFeedback("Please provide both Asset ID and Reason.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://127.0.0.1:8082/request_asset/${assetId}`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setFeedback(response.data.message || "Request raised successfully.");
        setAssetId("");
        setReason("");
      }
    } catch (error) {
      console.error("Error raising request:", error);
      setFeedback("An error occurred while raising the request.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: 4, marginLeft: "240px" }}>
      <Typography variant="h4" gutterBottom>
        My Asset Requests
      </Typography>
      {feedback && <Alert severity="info">{feedback}</Alert>}

      {/* Raise a New Request */}
      <Box
        component="form"
        onSubmit={handleRequestSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}
      >
        <Typography variant="h6">Raise a New Request</Typography>
        <TextField
          label="Asset ID"
          variant="outlined"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Reason"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          multiline
          rows={3}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Raise Request
        </Button>
      </Box>

      {/* My Requests (Pending) */}
      <Typography variant="h6" gutterBottom>
        My Requests (Pending)
      </Typography>
      {pendingRequests.length > 0 ? (
        <List>
          {pendingRequests.map((request) => (
            <ListItem key={request.request_id}>
              <ListItemText
                primary={`Request ID: ${request.request_id} | Asset ID: ${request.asset_id}`}
                secondary={
                  <>
                    <Typography>Reason: {request.reason}</Typography>
                    <Typography>
                      Requested On: {new Date(request.request_time).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No pending requests found.</Typography>
      )}

      {/* My Assets (Approved) */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        My Assets (Approved)
      </Typography>
      {approvedAssets.length > 0 ? (
        <List>
          {approvedAssets.map((asset) => (
            <ListItem key={asset.asset_id}>
              <ListItemText
                primary={`Asset ID: ${asset.asset_id} | Location: ${asset.asset_location}`}
                secondary={`Reason: ${asset.reason}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No approved assets found.</Typography>
      )}

      {/* My Assets (Denied) */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        My Assets (Denied)
      </Typography>
      {deniedRequests.length > 0 ? (
        <List>
          {deniedRequests.map((request) => (
            <ListItem key={request.request_id}>
              <ListItemText
                primary={`Request ID: ${request.request_id} | Asset ID: ${request.asset_id}`}
                secondary={`Reason: ${request.reason}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No denied requests found.</Typography>
      )}
    </Box>
  );
};

export default MyAssetRequests;
