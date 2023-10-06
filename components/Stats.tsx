import { Box, createTheme } from "@mui/material";
import React from "react";
import { theme } from ".";

const Stats = () => {
  return (
    <Box
      display={"flex"}
      padding={"24px 28px"}
      marginLeft={-3}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={6}
      borderRadius={4}
      sx={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(113, 113, 113, 0.10) 100%)",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.10)",
        [theme.breakpoints.down("xl")]: {
          width: "678px",
        },
        [theme.breakpoints.up("xl")]: {
          width: "710px",
        },
      }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        bgcolor={"red"}
        sx={{
          [theme.breakpoints.down("xl")]: {
            width: "620px",
          },
          [theme.breakpoints.up("xl")]: {
            width: "650px",
          },
        }}>
        <Box
          className="$789"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}></Box>
      </Box>
    </Box>
  );
};

export default Stats;
