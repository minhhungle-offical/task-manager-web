import React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { EmployeeLoginForm } from "../components/EmployeeLoginForm";

export function EmployeeLogin() {
  return (
    <Container maxWidth="sm">
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={4}
        minHeight="100vh"
      >
        <Paper sx={{ width: "100%", p: 3 }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <WorkIcon sx={{ fontSize: 100, color: "primary.main" }} />

            <Typography variant="h5" fontWeight={600}>
              Employee Login
            </Typography>
          </Box>

          <Box width="100%">
            <EmployeeLoginForm />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
