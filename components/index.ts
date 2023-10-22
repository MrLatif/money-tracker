"use client";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createTheme } from "@mui/material/styles";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import KanbanBoard from "./KanbanBoard";
import Chat from "./chat/Chat";
import ChatNavbar from "./chat/ChatNavbar";
import Chats from "./chat/Chats";
import Message from "./chat/Message";
import ChatSearch from "./chat/ChatSearch";
import ChatInput from "./chat/ChatInput";
import ChatSidebar from "./chat/ChatSidebar";
import Messages from "./chat/Messages";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 2036,
    },
  },
});
export {
  Hero,
  Footer,
  Navbar,
  theme,
  TopBar,
  SideBar,
  KanbanBoard,
  Chat,
  ChatNavbar,
  Chats,
  Message,
  Messages,
  ChatSearch,
  ChatInput,
  ChatSidebar,
};
