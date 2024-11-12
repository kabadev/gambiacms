"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: "New Case Management System Update",
    content:
      "We are excited to announce the launch of our new case management system. This update includes improved performance, new features, and enhanced security measures.",
    date: "2024-11-15",
  },
  {
    id: 2,
    title: "Upcoming Legal Workshop",
    content:
      "Join us for a workshop on recent changes in corporate law. The workshop will be held on November 20th, 2024, from 2 PM to 5 PM.",
    date: "2024-11-10",
  },
  {
    id: 3,
    title: "Court Holiday Schedule",
    content:
      "Please note the updated court holiday schedule for the upcoming month. All courts will be closed on November 24th and 25th for the Thanksgiving holiday.",
    date: "2024-11-05",
  },
  {
    id: 4,
    title: "New Partner Announcement",
    content:
      "We are pleased to announce that Jane Doe has been promoted to partner. Jane has been with our firm for 10 years and has shown exceptional skill in handling complex litigation cases.",
    date: "2024-10-30",
  },
  {
    id: 5,
    title: "Office Renovation Notice",
    content:
      "Our main office will be undergoing renovations from December 1st to December 15th. During this time, some departments may be temporarily relocated within the building.",
    date: "2024-10-25",
  },
];

const announcementFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
});

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<
    (typeof announcements)[0] | null
  >(null);
  const [addAnnouncementModalOpen, setAddAnnouncementModalOpen] =
    useState(false);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

  const form = useForm<z.infer<typeof announcementFormSchema>>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof announcementFormSchema>) => {
    console.log(data);
    // Implement add announcement functionality here
    setAddAnnouncementModalOpen(false);
    form.reset();
  };

  const handleAnnouncementClick = (announcement: (typeof announcements)[0]) => {
    setSelectedAnnouncement(announcement);
    if (window.innerWidth < 768) {
      setIsMobileDetailView(true);
    }
  };

  const handleBackClick = () => {
    setSelectedAnnouncement(null);
    setIsMobileDetailView(false);
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-theme(spacing.24))]">
        {/* Left column */}
        <div
          className={`bg-card rounded-lg shadow-md ${
            isMobileDetailView ? "hidden md:block" : ""
          }`}
        >
          <div className="p-4 border-b sticky top-0 bg-card z-10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Announcements</h2>
            <Button onClick={() => setAddAnnouncementModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-theme(spacing.40))]">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 border-b cursor-pointer hover:bg-accent"
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(announcement.date), "MMMM d, yyyy")}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Right column */}
        <div
          className={`bg-card rounded-lg shadow-md ${
            isMobileDetailView ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-4 border-b sticky top-0 bg-card z-10 flex items-center">
            {isMobileDetailView && (
              <Button
                variant="ghost"
                className="mr-2 p-0"
                onClick={handleBackClick}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            <h2 className="text-2xl font-bold">
              {selectedAnnouncement
                ? selectedAnnouncement.title
                : "Announcement Details"}
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-theme(spacing.40))]">
            {selectedAnnouncement ? (
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {format(new Date(selectedAnnouncement.date), "MMMM d, yyyy")}
                </p>
                <p>{selectedAnnouncement.content}</p>
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Select an announcement to view details
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <Sheet
        open={addAnnouncementModalOpen}
        onOpenChange={setAddAnnouncementModalOpen}
      >
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Add New Announcement</SheetTitle>
            <SheetDescription>
              Create a new announcement to share with the team.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-180px)] px-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title")} />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" {...form.register("content")} rows={5} />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.content.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddAnnouncementModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Announcement</Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
