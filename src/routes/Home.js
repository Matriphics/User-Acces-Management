import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "60px",
        textAlign: "center",
        backgroundColor: "#f5f5f5", // Optional: Set a background color
      }}
    >
      {/* Logo Image */}
     

      {/* Page Header */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginBottom: "20px" }}
      >
        Home
      </Typography>

      {/* Button to Open Dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "20px" }}
      >
        Learn About User Management
      </Button>

      {/* Full Page Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>User Management</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" paragraph>
            User management is a critical feature in modern applications,
            allowing administrators to control access, manage roles, and
            ensure secure usage. It encompasses various operations such as
            creating, editing, and deleting users, assigning permissions,
            and maintaining the overall security of the system.
          </Typography>
          <Typography variant="body1" paragraph>
            Key features include:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <strong>Role-based Access Control (RBAC):</strong> Assign
                specific roles and permissions to ensure users only access
                what they are authorized to.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>User Profiles:</strong> Maintain comprehensive
                details of each user, including preferences, activity logs,
                and permissions.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Authentication and Authorization:</strong> Ensure
                only authenticated users gain access, while permissions
                dictate what actions they can perform.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
            Effective user management improves security, streamlines
            workflows, and enhances the overall user experience in your
            application.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        component="img"
        src="/compLogo.png" // Ensure this path is correct
        alt="Company Logo"
        sx={{
          width: "90%",        // Adjust the width to reduce the size
          maxWidth: "1400px",   // Set a maximum width
          height: "auto",      // Maintain aspect ratio
          opacity: 0.1,        // Reduce transparency
          marginBottom: "20px",
        }}
      />
    </Box>
  );
}

export default Home;
