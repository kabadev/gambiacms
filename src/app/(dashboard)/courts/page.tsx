"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for courts
const courts = [
  {
    id: 1,
    name: "Supreme Court",
    jurisdiction: "Federal",
    location: "Washington, D.C.",
    type: "Appellate",
  },
  {
    id: 2,
    name: "New York Southern District Court",
    jurisdiction: "Federal",
    location: "New York, NY",
    type: "District",
  },
  {
    id: 3,
    name: "California Superior Court",
    jurisdiction: "State",
    location: "Los Angeles, CA",
    type: "Trial",
  },
  {
    id: 4,
    name: "Texas Court of Appeals",
    jurisdiction: "State",
    location: "Austin, TX",
    type: "Appellate",
  },
  {
    id: 5,
    name: "Florida Circuit Court",
    jurisdiction: "State",
    location: "Miami, FL",
    type: "Trial",
  },
];

const courtFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  jurisdiction: z
    .string()
    .min(2, { message: "Jurisdiction must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  type: z.string().min(2, { message: "Type must be at least 2 characters." }),
});

export default function CourtsTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<number | null>(null);
  const [addCourtModalOpen, setAddCourtModalOpen] = useState(false);

  const form = useForm<z.infer<typeof courtFormSchema>>({
    resolver: zodResolver(courtFormSchema),
    defaultValues: {
      name: "",
      jurisdiction: "",
      location: "",
      type: "",
    },
  });

  const handleEdit = (courtId: number) => {
    console.log(`Edit court with ID: ${courtId}`);
    // Implement edit functionality here
  };

  const handleDelete = (courtId: number) => {
    setCourtToDelete(courtId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (courtToDelete) {
      console.log(`Delete court with ID: ${courtToDelete}`);
      // Implement delete functionality here
    }
    setDeleteDialogOpen(false);
    setCourtToDelete(null);
  };

  const onSubmit = (data: z.infer<typeof courtFormSchema>) => {
    console.log(data);
    // Implement add court functionality here
    setAddCourtModalOpen(false);
    form.reset();
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courts</h2>
        <Button onClick={() => setAddCourtModalOpen(true)}>
          Add New Court
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courts.map((court) => (
              <TableRow key={court.id}>
                <TableCell className="font-medium">{court.name}</TableCell>
                <TableCell>{court.jurisdiction}</TableCell>
                <TableCell>{court.location}</TableCell>
                <TableCell>{court.type}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(court.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(court.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this court?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`This action cannot be undone. This will permanently delete the
              court's information from our system.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={addCourtModalOpen} onOpenChange={setAddCourtModalOpen}>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Add New Court</SheetTitle>
            <SheetDescription>Add a new court to the system.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-180px)] px-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Input id="jurisdiction" {...form.register("jurisdiction")} />
                {form.formState.errors.jurisdiction && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.jurisdiction.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} />
                {form.formState.errors.location && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" {...form.register("type")} />
                {form.formState.errors.type && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddCourtModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Court</Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
