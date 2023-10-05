import { ClerkProvider } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { Poppins } from "@next/font/google";
import './globals.css';
import { Footer, Navbar } from "../components";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Budget Tracker",
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
