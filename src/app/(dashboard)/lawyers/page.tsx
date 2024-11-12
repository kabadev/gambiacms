"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock data for lawyers
const lawyers = [
  {
    id: 1,
    name: "Alice Johnson",
    specialization: "Criminal Law",
    email: "alice.johnson@law.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    specialization: "Corporate Law",
    email: "bob.smith@law.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Williams",
    specialization: "Family Law",
    email: "carol.williams@law.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Lee",
    specialization: "Intellectual Property",
    email: "david.lee@law.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eva Green",
    specialization: "Environmental Law",
    email: "eva.green@law.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const lawyerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  specialization: z
    .string()
    .min(2, { message: "Specialization must be at least 2 characters." }),
  avatar: z
    .string()
    .url({ message: "Please enter a valid URL for the avatar." })
    .optional(),
});

export default function LawyersTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lawyerToDelete, setLawyerToDelete] = useState<number | null>(null);
  const [addLawyerModalOpen, setAddLawyerModalOpen] = useState(false);

  const form = useForm<z.infer<typeof lawyerFormSchema>>({
    resolver: zodResolver(lawyerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      avatar: "",
    },
  });

  const handleEdit = (lawyerId: number) => {
    console.log(`Edit lawyer with ID: ${lawyerId}`);
    // Implement edit functionality here
  };

  const handleDelete = (lawyerId: number) => {
    setLawyerToDelete(lawyerId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (lawyerToDelete) {
      console.log(`Delete lawyer with ID: ${lawyerToDelete}`);
      // Implement delete functionality here
    }
    setDeleteDialogOpen(false);
    setLawyerToDelete(null);
  };

  const onSubmit = (data: z.infer<typeof lawyerFormSchema>) => {
    console.log(data);
    // Implement add lawyer functionality here
    setAddLawyerModalOpen(false);
    form.reset();
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lawyers</h2>
        <Button onClick={() => setAddLawyerModalOpen(true)}>
          Add New Lawyer
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawyers.map((lawyer) => (
              <TableRow key={lawyer.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                    <AvatarFallback>
                      {lawyer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{lawyer.name}</TableCell>
                <TableCell>{lawyer.specialization}</TableCell>
                <TableCell>{lawyer.email}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(lawyer.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(lawyer.id)}
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
              Are you sure you want to delete this lawyer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`This action cannot be undone. This will permanently delete the
              lawyer's account and remove their data from our servers.`}
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

      <Sheet open={addLawyerModalOpen} onOpenChange={setAddLawyerModalOpen}>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Add New Lawyer</SheetTitle>
            <SheetDescription>Add a new lawyer to the system.</SheetDescription>
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  {...form.register("specialization")}
                />
                {form.formState.errors.specialization && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.specialization.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL (optional)</Label>
                <Input id="avatar" {...form.register("avatar")} />
                {form.formState.errors.avatar && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.avatar.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddLawyerModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Lawyer</Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
