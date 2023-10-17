"use client";

import ResponsiveAppBar from "../../components/Toolbar";
import Dashboard from "../../components/Dashboard";
import { Box } from "@mui/material";
export default function DashboardPage() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Dashboard />
    </Box>
  );
}
