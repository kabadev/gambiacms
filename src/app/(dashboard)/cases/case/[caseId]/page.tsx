"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Paperclip,
  Send,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for the case
const caseData = {
  id: "1",
  serialNo: "CAS123456",
  suitNo: "S12345",
  title: "John Doe vs ABC Corporation",
  nature: "Breach of Contract",
  court: "Banjul High Court",
  status: "pending",
  priority: "high",
  label: "Urgent",
  assignedTo: {
    id: "0dcd8d5f-b567-45d7-9a3c-573ab5b4238e",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  dateReceived: "2024-11-01T10:30:00Z",
  description:
    "This case involves a breach of contract dispute between John Doe and ABC Corporation. The plaintiff alleges that ABC Corporation failed to deliver goods as specified in their agreement, resulting in significant financial losses.",
};

// Mock data for remarks
const initialRemarks = [
  {
    id: "1",
    user: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Initial documents have been received and reviewed. We need to schedule a meeting with the client to discuss the next steps.",
    timestamp: "2024-11-02T09:00:00Z",
    attachments: [],
  },
  {
    id: "2",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Scheduled a meeting with the client for next week. Attached is the meeting agenda and some relevant documents.",
    timestamp: "2024-11-03T14:30:00Z",
    attachments: [
      { name: "meeting_agenda.pdf", type: "pdf", url: "#" },
      { name: "contract_analysis.docx", type: "document", url: "#" },
    ],
  },
  {
    id: "3",
    user: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Here are some photos from the site visit and a video recording of the client interview.",
    timestamp: "2024-11-05T11:15:00Z",
    attachments: [
      {
        name: "site_photo_1.jpg",
        type: "image",
        url: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "site_photo_2.jpg",
        type: "image",
        url: "/placeholder.svg?height=100&width=100",
      },
      { name: "client_interview.mp4", type: "video", url: "#" },
    ],
  },
];

const updateSchema = z.object({
  status: z.enum(["pending", "in progress", "closed", "resolved"]),
  priority: z.enum(["low", "medium", "high"]),
  label: z.string().min(1, "Label is required"),
});

const remarkSchema = z.object({
  content: z.string().min(1, "Remark content is required"),
});

type UpdateFormData = z.infer<typeof updateSchema>;
type RemarkFormData = z.infer<typeof remarkSchema>;

export default function CaseDetailsPage() {
  const [remarks, setRemarks] = useState(initialRemarks);
  const [caseDetails, setCaseDetails] = useState(caseData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateForm = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      status: caseDetails.status as
        | "pending"
        | "in progress"
        | "closed"
        | "resolved",
      priority: caseDetails.priority as "low" | "medium" | "high",
      label: caseDetails.label,
    },
  });

  const remarkForm = useForm<RemarkFormData>({
    resolver: zodResolver(remarkSchema),
  });

  const onUpdateSubmit: SubmitHandler<UpdateFormData> = (data) => {
    console.log("Update submitted:", data);
    setCaseDetails({ ...caseDetails, ...data });
    // Here you would typically send the update to your backend
  };

  const onRemarkSubmit: SubmitHandler<RemarkFormData> = (data) => {
    console.log("Remark submitted:", data);
    const newRemark = {
      id: (remarks.length + 1).toString(),
      user: {
        name: "Current User",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: data.content,
      timestamp: new Date().toISOString(),
      attachments: selectedFile
        ? [
            {
              name: selectedFile.name,
              type: selectedFile.type.split("/")[0],
              url: "#",
            },
          ]
        : [],
    };
    setRemarks([...remarks, newRemark]);
    remarkForm.reset();
    setSelectedFile(null);
    // Here you would typically send the new remark to your backend
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {caseDetails.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Case details and update form */}
        <div className=" w-full space-y-6">
          <Card className="shadow-md">
            <CardHeader className="bg-muted">
              <CardTitle className="text-xl">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Serial Number
                  </Label>
                  <div className="font-medium">{caseDetails.serialNo}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Suit Number
                  </Label>
                  <div className="font-medium">{caseDetails.suitNo}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Nature
                  </Label>
                  <div className="font-medium">{caseDetails.nature}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Court
                  </Label>
                  <div className="font-medium">{caseDetails.court}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Date Received
                  </Label>
                  <div className="font-medium">
                    {format(new Date(caseDetails.dateReceived), "PPP")}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Assigned To
                  </Label>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src={caseDetails.assignedTo.avatar}
                        alt={caseDetails.assignedTo.name}
                      />
                      <AvatarFallback>
                        {caseDetails.assignedTo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {caseDetails.assignedTo.name}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Description
                </Label>
                <p className="mt-1">{caseDetails.description}</p>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant={
                    caseDetails.status === "pending"
                      ? "secondary"
                      : caseDetails.status === "in progress"
                      ? "default"
                      : caseDetails.status === "closed"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {caseDetails.status}
                </Badge>
                <Badge
                  variant={
                    caseDetails.priority === "high"
                      ? "destructive"
                      : caseDetails.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {caseDetails.priority}
                </Badge>
                <Badge variant="outline">{caseDetails.label}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-muted">
              <CardTitle className="text-xl">Update Case</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                onSubmit={updateForm.handleSubmit(onUpdateSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(value) =>
                        updateForm.setValue(
                          "status",
                          value as
                            | "pending"
                            | "in progress"
                            | "closed"
                            | "resolved"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      onValueChange={(value) =>
                        updateForm.setValue(
                          "priority",
                          value as "low" | "medium" | "high"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Input id="label" {...updateForm.register("label")} />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Update Case
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right side: Remarks and file upload */}
        <Card className=" w-full shadow-md">
          <CardHeader className="bg-muted">
            <CardTitle className="text-xl">Remarks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] p-4">
              {remarks.map((remark) => (
                <div key={remark.id} className="mb-6 last:mb-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={remark.user.avatar}
                        alt={remark.user.name}
                      />
                      <AvatarFallback>
                        {remark.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{remark.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(remark.timestamp), "PPp")}
                      </div>
                    </div>
                  </div>
                  <p className="mb-2">{remark.content}</p>
                  {remark.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {remark.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-muted rounded-md p-2"
                        >
                          {attachment.type === "image" && (
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-16 h-16 object-cover rounded mr-2"
                            />
                          )}
                          {attachment.type === "video" && (
                            <Video className="w-6 h-6 mr-2" />
                          )}
                          {attachment.type === "pdf" && (
                            <FileText className="w-6 h-6 mr-2" />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {attachment.name}
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0"
                                    onClick={() =>
                                      console.log(
                                        `Downloading ${attachment.name}`
                                      )
                                    }
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Separator className="my-4" />
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 bg-background border-t">
              <form
                onSubmit={remarkForm.handleSubmit(onRemarkSubmit)}
                className="space-y-4"
              >
                <Textarea
                  placeholder="Add a remark..."
                  {...remarkForm.register("content")}
                  className="min-h-[100px]"
                />
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span>
                        {selectedFile ? selectedFile.name : "Attach file"}
                      </span>
                    </div>
                  </Label>
                  <Button type="submit" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
