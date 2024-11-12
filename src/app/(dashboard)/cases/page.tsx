import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import CaseGrid from "@/components/CaseGrid";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  return (
    <>
      <div className="p-4">
        <CaseGrid />
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}
