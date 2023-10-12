import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

function ResponsiveAppBar() {
  const { user } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display={"inline-flex"} alignItems={"center"}>
            <Image src={"logo.svg"} alt={"logo"} />

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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"></IconButton>
            </Box>
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
