import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Tab, Tabs } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { theme } from ".";
import WelcomeCard from "./WelcomeCard";
import Data from "./Data";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ResponsiveAppBar() {
  const { user } = useUser();

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box
            sx={{
              p: 3,
              maxWidth: theme.breakpoints.values.xl ? "1200px" : "600px",
              margin: "0 auto",
            }}>
            {children}
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

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box display={"inline-flex"} alignItems={"center"}>
              <Typography
                color={"#97F704"}
                fontFamily={"Poppins"}
                fontWeight={700}
                fontSize={25}
                marginLeft={1}>
                T
              </Typography>
              <Typography
                fontSize={25}
                marginLeft={0.25}
                component="a"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  color: "#FFF",
                  textDecoration: "none",
                }}>
                reker
              </Typography>
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#97F704",
                },
              }}
              centered>
              <Tab
                disableRipple
                label="Dashboard"
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
                disableRipple
                label="Actions"
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
                disableRipple
                label="Kanban"
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

            <Box
              display={"flex"}
              padding={"6px 6px 6px 16px"}
              alignItems={"center"}
              gap={2}
              borderRadius={"90px"}
              bgcolor={"#333333"}
              flexGrow={0}>
              <Typography
                color={"rgba(255, 255, 255, 0.95)"}
                textAlign={"center"}
                fontFamily={"Poppins"}
                fontSize={16}
                fontWeight={500}>
                {user?.fullName}
              </Typography>
              <UserButton afterSignOutUrl="/" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <WelcomeCard />
          <Data />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
export default ResponsiveAppBar;
