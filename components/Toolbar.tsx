import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

function ResponsiveAppBar() {
  const { user } = useUser();

  return (
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
          <Box sx={{ flexGrow: 0 }}>
            <Box
              display={"flex"}
              padding={"6px 6px 6px 16px"}
              alignItems={"center"}
              gap={2}
              borderRadius={"90px"}
              bgcolor={"#333333"}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
