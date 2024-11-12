import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface Case {
  id: string;
  serialNo: string;
  dateReceived: string;
  suitNo: string;
  title: string;
  nature: string;
  court: string;
  status: string;
  priority: string;
  label: string;
  assignedTo: string;
  remarks: string[];
}

const assignedToData: { [key: string]: { name: string; avatar: string } } = {
  "0dcd8d5f-b567-45d7-9a3c-573ab5b4238e": {
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "12b9c3df-876d-47d7-bfa7-b7dbf68b62b5": {
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "b3459d10-65d1-4c3c-bb4a-13c2c29f762d": {
    name: "Ali Touray",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "a834f295-121e-43bc-b2b9-0343a8ed7c5d": {
    name: "Fatimah Camara",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "3a6e67a8-4e0c-4b84-97ac-657bd832cf29": {
    name: "Omar Faal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "762a22d0-bf53-401f-bbfe-cc0d5d65b54b": {
    name: "Kemo Bah",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "7325e5ab-68d4-4a55-bd23-e7b4067f9847": {
    name: "Mary Jatta",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "be5a2c52-9e9b-4e96-a8f7-f3b6a5b03ff1": {
    name: "Lamin Sillah",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "47d0a9d4-f218-47de-9255-88a4992e9be0": {
    name: "Sira Kinteh",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "933f9882-6ca1-4f66-b5e7-c672d47b2b9c": {
    name: "Mariama Touray",
    avatar: "/placeholder.svg?height=40&width=40",
  },
};

const CaseCard = ({ caseItem }: { caseItem: Case }) => {
  return (
    <div
      key={caseItem.id}
      className="flex flex-col p-4 border bg-card rounded-md"
    >
      <div>
        <CardTitle className="text-lg font-semibold">
          {caseItem.title}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {caseItem.serialNo} | {caseItem.suitNo}
        </div>
        <div className="text-sm text-muted-foreground">
          Date Received: {new Date(caseItem.dateReceived).toLocaleDateString()}
        </div>
      </div>
      <CardContent className="flex-grow bg-accent mt-2 p-4 rounded-md ">
        <div className="mb-4 flex gap-2">
          <Badge
            variant={
              caseItem.status === "pending"
                ? "outline"
                : caseItem.status === "in progress"
                ? "default"
                : caseItem.status === "closed"
                ? "destructive"
                : "outline"
            }
          >
            {caseItem.status}
          </Badge>
          <Badge
            variant={
              caseItem.priority === "high"
                ? "destructive"
                : caseItem.priority === "medium"
                ? "default"
                : "outline"
            }
          >
            {caseItem.priority}
          </Badge>
        </div>
        <p className="text-sm mb-2">
          <strong>Nature:</strong> {caseItem.nature}
        </p>
        <p className="text-sm mb-2">
          <strong>Court:</strong> {caseItem.court}
        </p>
        <p className="text-sm mb-4">
          <strong>Label:</strong> {caseItem.label}
        </p>
        {/* <div className="text-sm">
          <strong>Remarks:</strong>
          <ul className="list-disc list-inside mt-1">
            {caseItem.remarks.map((remark, index) => (
              <li key={index}>{remark}</li>
            ))}
          </ul>
        </div> */}
      </CardContent>
      <div className=" pt-4 flex items-center justify-between  ">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={assignedToData[caseItem.assignedTo]?.avatar}
              alt="Avatar"
            />
            <AvatarFallback>
              {assignedToData[caseItem.assignedTo]?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">
            {assignedToData[caseItem.assignedTo]?.name}
          </div>
        </div>
        <Link href="/cases/case/cssjks">
          <Button>View Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default CaseCard;
