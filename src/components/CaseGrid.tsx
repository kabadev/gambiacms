"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import CaseCard from "./CaseCard";
import AddCase from "./AddCase";
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

const casesData: Case[] = [
  {
    id: "1",
    serialNo: "CAS123456",
    dateReceived: "2024-11-01T10:30:00Z",
    suitNo: "S12345",
    title: "John Doe vs ABC Corporation",
    nature: "Breach of Contract",
    court: "Banjul high Court",
    status: "pending",
    priority: "high",
    label: "Urgent",
    assignedTo: "0dcd8d5f-b567-45d7-9a3c-573ab5b4238e",
    remarks: ["Initial documents received", "Awaiting response from defendant"],
  },
  {
    id: "2",
    serialNo: "CAS123457",
    dateReceived: "2024-11-02T11:45:00Z",
    suitNo: "S12346",
    title: "Jane Smith vs XYZ Ltd",
    nature: "Personal Injury",
    court: "Serrekunda Magistrate Court",
    status: "in progress",
    priority: "medium",
    label: "Investigation",
    assignedTo: "12b9c3df-876d-47d7-bfa7-b7dbf68b62b5",
    remarks: [
      "Medical reports submitted",
      "Witness statements being collected",
    ],
  },
  {
    id: "3",
    serialNo: "CAS123458",
    dateReceived: "2024-11-03T09:00:00Z",
    suitNo: "S12347",
    title: "Ali Touray vs Ministry of Finance",
    nature: "Employment Dispute",
    court: "Banjul high Court",
    status: "closed",
    priority: "low",
    label: "Archived",
    assignedTo: "b3459d10-65d1-4c3c-bb4a-13c2c29f762d",
    remarks: ["Settlement reached", "Case files archived"],
  },
  {
    id: "4",
    serialNo: "CAS123459",
    dateReceived: "2024-11-04T14:20:00Z",
    suitNo: "S12348",
    title: "Fatimah Camara vs Gambia Telecom",
    nature: "Consumer Rights",
    court: "Serrekunda Magistrate Court",
    status: "resolved",
    priority: "high",
    label: "Finalized",
    assignedTo: "a834f295-121e-43bc-b2b9-0343a8ed7c5d",
    remarks: ["Judgment in favor of plaintiff", "Compensation paid"],
  },
  {
    id: "5",
    serialNo: "CAS123460",
    dateReceived: "2024-11-05T15:30:00Z",
    suitNo: "S12349",
    title: "Omar Faal vs National Bank",
    nature: "Fraud Allegation",
    court: "Banjul high Court",
    status: "pending",
    priority: "medium",
    label: "pending Investigation",
    assignedTo: "3a6e67a8-4e0c-4b84-97ac-657bd832cf29",
    remarks: ["Forensic audit requested", "Court date pending"],
  },
  {
    id: "6",
    serialNo: "CAS123461",
    dateReceived: "2024-11-06T16:00:00Z",
    suitNo: "S12350",
    title: "Kemo Bah vs The Gambia Electricity Company",
    nature: "Environmental Damage",
    court: "Serrekunda Magistrate Court",
    status: "in progress",
    priority: "high",
    label: "Ongoing",
    assignedTo: "762a22d0-bf53-401f-bbfe-cc0d5d65b54b",
    remarks: [
      "Environmental impact assessment submitted",
      "Expert witnesses being consulted",
    ],
  },
  {
    id: "7",
    serialNo: "CAS123462",
    dateReceived: "2024-11-07T13:25:00Z",
    suitNo: "S12351",
    title: "Mary Jatta vs Gambia Airways",
    nature: "Flight Delay Compensation",
    court: "Banjul high Court",
    status: "resolved",
    priority: "medium",
    label: "Settled",
    assignedTo: "7325e5ab-68d4-4a55-bd23-e7b4067f9847",
    remarks: ["Out-of-court settlement reached", "Compensation terms agreed"],
  },
  {
    id: "8",
    serialNo: "CAS123463",
    dateReceived: "2024-11-08T10:40:00Z",
    suitNo: "S12352",
    title: "Lamin Sillah vs Gambia Ports Authority",
    nature: "Land Dispute",
    court: "Serrekunda Magistrate Court",
    status: "pending",
    priority: "low",
    label: "Awaiting Review",
    assignedTo: "be5a2c52-9e9b-4e96-a8f7-f3b6a5b03ff1",
    remarks: ["Land survey report pending", "Mediation suggested by court"],
  },
  {
    id: "9",
    serialNo: "CAS123464",
    dateReceived: "2024-11-09T08:15:00Z",
    suitNo: "S12353",
    title: "Sira Kinteh vs Gambia Civil Aviation Authority",
    nature: "Regulatory Compliance",
    court: "Banjul high Court",
    status: "in progress",
    priority: "medium",
    label: "Under Review",
    assignedTo: "47d0a9d4-f218-47de-9255-88a4992e9be0",
    remarks: [
      "Regulatory documents under review",
      "Expert testimony scheduled",
    ],
  },
  {
    id: "10",
    serialNo: "CAS123465",
    dateReceived: "2024-11-10T17:50:00Z",
    suitNo: "S12354",
    title: "Mariama Touray vs Ministry of Education",
    nature: "Discrimination",
    court: "Serrekunda Magistrate Court",
    status: "closed",
    priority: "high",
    label: "resolved",
    assignedTo: "933f9882-6ca1-4f66-b5e7-c672d47b2b9c",
    remarks: ["Case dismissed", "Appeal period expired"],
  },
];

export default function CaseGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [courtFilter, setCourtFilter] = useState("all");
  const [sortField, setSortField] = useState<"dateReceived" | "priority">(
    "dateReceived"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredAndSortedCases = useMemo(() => {
    return casesData
      .filter(
        (caseItem) =>
          (caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caseItem.serialNo
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (statusFilter === "all" || caseItem.status === statusFilter) &&
          (priorityFilter === "all" || caseItem.priority === priorityFilter) &&
          (courtFilter === "all" || caseItem.court === courtFilter) &&
          (!dateFilter ||
            new Date(caseItem.dateReceived).toDateString() ===
              dateFilter.toDateString())
      )
      .sort((a, b) => {
        if (sortField === "dateReceived") {
          const dateA = new Date(a.dateReceived).getTime();
          const dateB = new Date(b.dateReceived).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else {
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          const priorityA =
            priorityOrder[a.priority as keyof typeof priorityOrder];
          const priorityB =
            priorityOrder[b.priority as keyof typeof priorityOrder];
          return sortOrder === "asc"
            ? priorityA - priorityB
            : priorityB - priorityA;
        }
      });
  }, [
    searchTerm,
    statusFilter,
    priorityFilter,
    courtFilter,
    sortField,
    sortOrder,
    dateFilter,
  ]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleSortField = () => {
    setSortField(sortField === "dateReceived" ? "priority" : "dateReceived");
  };

  const pageCount = Math.ceil(filteredAndSortedCases.length / itemsPerPage);
  const paginatedCases = filteredAndSortedCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-8 text-primary">Case Management</h1>
        <Link href={"/cases/new"}>
          <Button>Add New</Button>
        </Link>
      </div>
      <div className="pb-8 space-y-4 bg-card p-4 ">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or serial number"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courtFilter} onValueChange={setCourtFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Court" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courts</SelectItem>
              <SelectItem value="Banjul high Court">
                Banjul High Court
              </SelectItem>
              <SelectItem value="Serrekunda Magistrate Court">
                Serrekunda Magistrate Court
              </SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                className="w-[280px] justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateFilter ? (
                  dateFilter.toDateString()
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-between items-center">
          <Button
            onClick={toggleSortField}
            variant="outline"
            className="w-[200px]"
          >
            Sort by:{" "}
            {sortField === "dateReceived" ? "Date Received" : "Priority"}
          </Button>
          <Button
            onClick={toggleSortOrder}
            variant="default"
            className="w-[200px]"
          >
            Order:{" "}
            {sortOrder === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-accent p-4 ">
          {paginatedCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
        <div className="mt-8 w-full flex justify-between items-center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            variant="outline"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
