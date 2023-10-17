"use client";

import ResponsiveAppBar from "../../components/Toolbar";
import Dashboard from "../../components/Dashboard";
import { useUser } from "@clerk/nextjs";


export default function DashboardPage() {
  const { user } = useUser();

  return (
      <>
          <ResponsiveAppBar />
          {user &&
              <Dashboard
                  userId={user.id}
                  userFirstName={user.firstName}
                  userEmail={user.primaryEmailAddressId}
                  userImageUrl={user.imageUrl}
              />
          }
      </>
  ); 
}
