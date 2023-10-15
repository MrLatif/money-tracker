import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";
import FinanceContextProvider from "../lib/store/finance-context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Stay on top of your budget",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={poppins.className}
        suppressHydrationWarning={true}>
        <body>
          <FinanceContextProvider>
            <ToastContainer />
            {children}
          </FinanceContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
