import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Data from "./Data";
import Expenses from "./Expenses";
import "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserType } from "../types";

//import { collection, addDoc } from "firebase/firestore";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = ({
  userId,
  userFirstName,
  userEmail,
  userImageUrl,
}: UserType) => {
  const [value, setValue] = useState(0);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("Function running");
    StoreUserDataInFirestore();
  }, []);

  const StoreUserDataInFirestore = async () => {
    console.log("Entered to the function!");
    console.log("UserID: ", userId);
    if (userId) {
      console.log("User exists");
      try {
        await setDoc(doc(db, "users", userId), {
          uid: userId,
          displayName: userFirstName,
          email: userEmail,
          photoUrl: userImageUrl,
        });

        await setDoc(doc(db, "userChats", userId), {});

        console.log("User data added to Firestore successfully.");
      } catch (error) {
        console.error("Error adding user data to Firestore:", error);
      }
    }
  };

  // if(user){
  //   console.log("Function running");
  //   storeUserDataInFirestore();
  // }

  return (
    <Box
      className="contain-two-boxes"
      marginTop={0}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box width={"70%"}>
        {/* <WelcomeCard /> */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={4}
          marginTop={0}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={3}
          >
            {/* <Typography color={"#FFF"} fontSize={24} fontWeight={600}>
              Dashboard
            </Typography> */}
            <Box
              display={"flex"}
              paddingLeft={0}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={1000}
              gap={"70px"}
              borderRadius={"8px"}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#97F704",
                  },
                }}
              >
                <Tab
                  label="Stats"
                  {...a11yProps(0)}
                  sx={{
                    minWidth: 150,
                    width: 150,
                    bgcolor: "none",
                    paddingBottom: 0,
                    color: "#FFF",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "16px",
                    textTransform: "none",
                    "&.Mui-selected": {
                      color: "#FFF",
                      fontFamily: "Poppins",
                    },
                  }}
                />
                <Tab
                  label="Expenses"
                  {...a11yProps(1)}
                  sx={{
                    minWidth: 150,
                    width: 150,
                    bgcolor: "none",
                    paddingBottom: 0,
                    color: "#FFF",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "16px",
                    textTransform: "none",
                    "&.Mui-selected": {
                      color: "#FFF",
                      fontFamily: "Poppins",
                    },
                  }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Data />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Expenses />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
