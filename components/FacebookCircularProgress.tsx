import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

// Inspired by the former Facebook spinners.
export default function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: "#FFF",
          margin: -2,
        }}
        size={180}
        thickness={3.5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        value={75}
        sx={{
          color: "#FE1114",
          position: "absolute",
          margin: -2,
          scale: "-1 1",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={180}
        thickness={4.3}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          marginTop={-1}>
          <Typography
            variant="caption"
            component="div"
            color="#FFF"
            fontFamily={"Poppins"}
            fontSize={"40px"}
            fontWeight={700}
            marginBottom={-1}>{`${Math.round(75)}%`}</Typography>
          <Typography
            color={"#FFF"}
            fontFamily={"Poppins"}
            fontSize={"18px"}
            fontWeight={400}>
            Spent
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
