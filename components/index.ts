import Hero from "./Hero";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1636,
    },
  },
});
export { Hero, Footer, Navbar, theme };
