import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 4,
        mt: 4,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              CollabBros
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Empowering your projects with modern tools and resources.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack
              spacing={1}
              sx={{
                "& a": {
                  textDecoration: "none",
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                Email:{" "}
                <Link href="mailto:support@yourapp.com">
                  support@CollabBros.com
                </Link>
              </Typography>
              <Typography variant="body2">Phone: +1 (555) 123-4567</Typography>
              <Typography variant="body2">
                Address: 1234 Main Street, Anytown, USA
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} CollabBros. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
