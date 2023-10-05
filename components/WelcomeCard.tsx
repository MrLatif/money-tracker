import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Typography } from "@mui/material";
const WelcomeCard = () => {
  const { user } = useUser();

  return (
    <Box
      className="hi-box"
      width={"60%"}
      height={"auto"}
      borderRadius={"16px"}
      boxShadow={"0px 0px 15px 0px rgba(0, 0, 0, 0.10)"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      sx={{ bgcolor: "#323233", color: "white" }}>
      <Box
        display={"inline-flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        padding={"24px 24px 24px 32px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"10px"}>
          <Typography
            color={"#FFF"}
            fontFamily={"Poppins"}
            fontSize={"22px"}
            fontWeight={600}>
            Hi {user?.firstName}
          </Typography>
          <Typography
            color={"#FFF"}
            fontFamily={"Poppins"}
            fontSize={"18px"}
            fontWeight={400}>
            Welcome! Manage your all tasks & daily work here.
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          marginTop={3}>
          <Typography
            color={"#FFF"}
            fontFamily={"Poppins"}
            fontSize={16}
            fontWeight={400}>
            Your Score
          </Typography>
          <Typography
            color={"#99FC03"}
            fontFamily={"Poppins"}
            fontSize={34}
            fontWeight={800}
            marginLeft={1}>
            A+
          </Typography>
        </Box>
      </Box>
      <Box>
        <img
          src="face.svg"
          width={200}
          height={200}
          style={{ marginLeft: "100px" }}
        />
      </Box>
    </Box>
  );
};

export default WelcomeCard;
