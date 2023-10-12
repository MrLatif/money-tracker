import { ClerkProvider } from "@clerk/nextjs";
import { Box } from "@mui/material";
import "./globals.css";

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
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
