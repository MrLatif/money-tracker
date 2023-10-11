"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import "./globals.css";
import FinanceContextProvider from "../lib/store/finance-context";
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
      <html lang="en" className={poppins.className}>
        <body>
          <FinanceContextProvider>{children}</FinanceContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
