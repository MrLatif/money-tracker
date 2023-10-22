"use client";

import ResponsiveAppBar from "../../components/Toolbar";
import Dashboard from "../../components/Dashboard";
import { useUser } from "@clerk/nextjs";


export default function DashboardPage() {
  const { user } = useUser();

  return (
      <>
          <ResponsiveAppBar />
          {user && (
              <Dashboard
                  uid={user.id}
                  displayName={user.firstName}
                  email={user.primaryEmailAddressId}
                  photoUrl={user.imageUrl}
              />
          )}
      </>
  ); 
}
