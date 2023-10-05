import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}>
      {children}
    </Box>
  );
};

export default AuthLayout;
