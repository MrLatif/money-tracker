import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Typography, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { theme } from ".";

const WelcomeCard = () => {
  const { user } = useUser();

  return (
    <Box
      className="hi-box"
      height={"auto"}
      borderRadius={"16px"}
      boxShadow={"0px 0px 15px 0px rgba(0, 0, 0, 0.10)"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      sx={{
        bgcolor: "#323233",
        color: "white",
        [theme.breakpoints.down("xl")]: {
          width: "63%",
        },
        [theme.breakpoints.up("xl")]: {
          width: "53%",
        },
      }}>
      <Grid container spacing={2} margin={-3}>
        <Grid item xs={12} md={8}>
          <Box
            display={"inline-flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            padding={"24px 24px 24px 32px"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"6px"}>
              <Typography
                color={"#FFF"}
                fontFamily={"Poppins"}
                fontSize={"20px"}
                fontWeight={600}>
                Hi {user?.firstName}
              </Typography>
              <Typography
                color={"#FFF"}
                fontFamily={"Poppins"}
                fontSize={"17px"}
                fontWeight={500}>
                Welcome! Manage your all tasks & daily work here.
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              marginTop={2}>
              <Typography
                color={"#FFF"}
                fontFamily={"Poppins"}
                fontSize={15}
                fontWeight={400}>
                Your Score
              </Typography>
              <Typography
                color={"#99FC03"}
                fontFamily={"Poppins"}
                fontSize={20}
                fontWeight={800}
                marginLeft={1}>
                A+
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <Box>
            <img src="face.svg" width={170} height={170} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeCard;
