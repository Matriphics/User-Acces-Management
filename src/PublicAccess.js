import React from "react";
import { Card, Typography, Box, List, ListItem, ListItemText, Link } from "@mui/material";

export default function PublicAccess() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Public Access
        </Typography>

        {/* User Guides Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            User Guides
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                <Link
                  href="https://www.marylandtaxes.gov/mdtaxconnect/docs/MTC-Registration-Linking-Tax-Accounts-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  Maryland Tax Connect Registration and Linking Tax Account(s) Guide
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link
                  href="https://www.marylandtaxes.gov/mdtaxconnect/docs/Adding-Authorized-User-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  Adding an Authorized User Guide
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link
                  href="https://www.marylandtaxes.gov/mdtaxconnect/docs/File-Form-Guest-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  File a Form as a Guest Guide
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        {/* FAQs Section */}
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            FAQs
          </Typography>
          <Typography variant="body1">
            For frequently asked questions about the Maryland Tax Connect portal, visit the{" "}
            <Link
              href="https://example.com/faqs"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "primary.main", textDecoration: "none", fontWeight: "bold" }}
            >
              FAQs page
            </Link>.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
