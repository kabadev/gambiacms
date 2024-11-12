"use client";
import React from "react";
import AddModal from "./AddModal";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon } from "lucide-react";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  suitNo: z.string().min(1, "Suit number is required"),
  title: z.string().min(1, "Title is required"),
  nature: z.string().min(1, "Nature of case is required"),
  court: z.string().min(1, "Court is required"),
  priority: z.enum(["low", "medium", "high"]),
  label: z.string().min(1, "Label is required"),
  assignedTo: z.string().uuid("Invalid UUID for assigned person"),
  description: z.string().min(1, "Description is required"),
  dateReceived: z.date({
    required_error: "Date received is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

const assignedToData = [
  {
    id: "0dcd8d5f-b567-45d7-9a3c-573ab5b4238e",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "12b9c3df-876d-47d7-bfa7-b7dbf68b62b5",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "b3459d10-65d1-4c3c-bb4a-13c2c29f762d",
    name: "Ali Touray",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "a834f295-121e-43bc-b2b9-0343a8ed7c5d",
    name: "Fatimah Camara",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3a6e67a8-4e0c-4b84-97ac-657bd832cf29",
    name: "Omar Faal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function AddNewCaseForm() {
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "New Case Added",
      description: `Case "${data.title}" has been successfully added.`,
    });
    // Here you would typically send the data to your backend
  };

  return (
    <AddModal title="Add Case">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Case</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="suitNo">Suit Number</Label>
              <Input id="suitNo" {...register("suitNo")} />
              {errors.suitNo && (
                <p className="text-sm text-red-500">{errors.suitNo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Case Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nature">Nature of Case</Label>
              <Input id="nature" {...register("nature")} />
              {errors.nature && (
                <p className="text-sm text-red-500">{errors.nature.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Select onValueChange={(value) => setValue("court", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Court" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banjul high Court">
                      Banjul High Court
                    </SelectItem>
                    <SelectItem value="Serrekunda Magistrate Court">
                      Serrekunda Magistrate Court
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.court && (
                  <p className="text-sm text-red-500">{errors.court.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("priority", value as "low" | "medium" | "high")
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
                {errors.priority && (
                  <p className="text-sm text-red-500">
                    {errors.priority.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input id="label" {...register("label")} />
              {errors.label && (
                <p className="text-sm text-red-500">{errors.label.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select onValueChange={(value) => setValue("assignedTo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assignedToData.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {person.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignedTo && (
                <p className="text-sm text-red-500">
                  {errors.assignedTo.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date Received</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setValue("dateReceived", newDate as Date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateReceived && (
                <p className="text-sm text-red-500">
                  {errors.dateReceived.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Add New Case
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AddModal>
  );
}
