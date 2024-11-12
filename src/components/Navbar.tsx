import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ui/ModeToggle";

const Navbar = () => {
  return (
    <header className="flex fixed border-b z-30  h-16 w-full bg-card items-center  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <ModeToggle />
    </header>
  );
};

export default Navbar;
