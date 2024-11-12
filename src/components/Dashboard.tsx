"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bell,
  Briefcase,
  Building,
  Calendar,
  MessageSquare,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const caseData = [
  { name: "Jan", cases: 40 },
  { name: "Feb", cases: 30 },
  { name: "Mar", cases: 45 },
  { name: "Apr", cases: 50 },
  { name: "May", cases: 65 },
  { name: "Jun", cases: 60 },
];

const caseStatusData = [
  { name: "Pending", value: 30 },
  { name: "In Progress", value: 45 },
  { name: "Resolved", value: 25 },
];

const caseNatureData = [
  { name: "Civil", value: 40 },
  { name: "Criminal", value: 30 },
  { name: "Family", value: 20 },
  { name: "Corporate", value: 10 },
];

const courtData = [
  { name: "Supreme Court", cases: 25 },
  { name: "High Court", cases: 40 },
  { name: "Magistrate Court", cases: 35 },
  { name: "Family Court", cases: 20 },
  { name: "Commercial Court", cases: 15 },
];

const lawyersData = [
  {
    name: "Alice Brown",
    cases: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Wilson",
    cases: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carol Davis",
    cases: 10,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Lee",
    cases: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Eva Green",
    cases: 7,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const recentRemarks = [
  {
    caseTitle: "Smith vs. Johnson",
    content: "Witness statements collected. Ready for court presentation.",
    date: "2024-11-10",
  },
  {
    caseTitle: "Green Enterprises Bankruptcy",
    content: "Filed for Chapter 11. Awaiting court decision.",
    date: "2024-11-09",
  },
  {
    caseTitle: "City vs. EcoPower Corp",
    content:
      "Environmental impact assessment submitted. Negotiating settlement.",
    date: "2024-11-08",
  },
];

const recentAnnouncements = [
  {
    title: "New Case Management System Update",
    content:
      "System will be down for maintenance on Nov 15th from 10 PM to 2 AM.",
    date: "2024-11-12",
  },
  {
    title: "Upcoming Legal Workshop",
    content:
      "Join us for a workshop on recent changes in corporate law on Nov 20th.",
    date: "2024-11-11",
  },
  {
    title: "Court Holiday Schedule",
    content:
      "Please note the updated court holiday schedule for the upcoming month.",
    date: "2024-11-10",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 bg-background">
      <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">290</div>
            <p className="text-xs text-muted-foreground">
              +4.75% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Lawyers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courts</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Across 3 jurisdictions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Hearings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Case Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Case Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Case Nature</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseNatureData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {caseNatureData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Court Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courtData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Top Lawyers</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {lawyersData.map((lawyer, index) => (
                <div key={index} className="flex items-center mb-4 last:mb-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                    <AvatarFallback>
                      {lawyer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {lawyer.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lawyer.cases} active cases
                    </p>
                  </div>
                  <Badge className="ml-auto">{lawyer.cases}</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Case Remarks</CardTitle>
            <CardDescription>Last 3 remarks from various cases</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px]">
              {recentRemarks.map((remark, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h4 className="text-sm font-semibold">
                      {remark.caseTitle}
                    </h4>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {remark.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{remark.content}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Last 3 system-wide announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px]">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h4 className="text-sm font-semibold">
                      {announcement.title}
                    </h4>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {announcement.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{announcement.content}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
