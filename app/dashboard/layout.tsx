import { ClerkProvider } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { Poppins } from "next/font/google";

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
    <html lang="en">
      <body
        style={{
          background: "rgba(32, 32, 33)",
          border: "1px solid rgba(79, 79, 79, 0.00)",
          backdropFilter: "blur(50px)",
        }}>
        {children}
      </body>
    </html>
  );
}
