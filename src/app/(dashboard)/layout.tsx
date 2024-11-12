"use client";

import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarComponent from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session).isLoggedIn : false;
  });

  React.useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    if (session.isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  if (!isAuthenticated) {
    return router.push("/login");
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset className="">
        <Navbar />
        <div className="mt-[70px]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
