import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { theme } from ".";
import FacebookCircularProgress from "./FacebookCircularProgress";

const Stats = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"11px"}
      sx={{
        [theme.breakpoints.down("xl")]: {
          width: "678px",
        },
        [theme.breakpoints.up("xl")]: {
          width: "710px",
        },
      }}>
      <Box
        display={"flex"}
        padding={"27.4px"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"11px"}
        flexShrink={0}
        borderRadius={"27.4px"}
        border={"1px solid #414141"}
        width={"auto"}
        height={"auto"}
        boxShadow={"0px -4px 37px 0px rgba(50, 50, 50, 0.30)"}
        sx={{
          background: "linear-gradient(180deg, #383838 0%, #29292A 100%)",
        }}>
        <FacebookCircularProgress />
      </Box>
    </Box>
  );
};

export default Stats;
