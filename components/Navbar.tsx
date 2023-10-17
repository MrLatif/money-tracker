"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        {/* <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo2.svg"
            alt="Money Tracker Logo"
            width={200}
            height={30}
            className="object-contain"
          />
        </Link> */}
        <Box display={"flex"}>
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
        <SignedIn>
          <Link href="/dashboard">
            <button className="text-emerald-600 rounded-full bg-white min-w-[130px] min-h-[50px]">
              Dashboard
            </button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton redirectUrl="localhost:3000/dashboard">
            <button className="text-emerald-600 rounded-full bg-white min-w-[130px] min-h-[50px]">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Navbar;
