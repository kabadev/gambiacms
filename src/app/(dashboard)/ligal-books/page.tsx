"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ChevronLeft, Plus, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import PdfReader from "@/components/PdfResder";
// import PdfResder from "@/components/PdfResder";
// import PdfResder from "@/components/PdfResder";

const PdfResder = dynamic(() => import("@/components/PdfResder"), {
  ssr: false,
});

// Updated mock data with all documents from the website
const documents = [
  {
    id: 1,
    title: "The Gambia Constitution 1997 (2002 revision)",
    type: "Constitution",
    category: "Constitution of The Gambia",
    date: "2002-01-01",
    size: "1.27 MB",
    fileType: "pdf",
    url: "/documents/The-Gambia-Constitution-1997-2002-revision.pdf",
  },
  {
    id: 2,
    title: "Truth Reconciliation and Reparations Commission Act, 2017",
    type: "Act",
    category: "Acts",
    date: "2017-12-31",
    size: "2.20 MB",
    fileType: "pdf",
    url: "/documents/Truth-Reconcilation-and-Reparations-Commission-Act-2017.pdf",
  },
  {
    id: 3,
    title: "Constitutional Review Commission Act, 2017",
    type: "Act",
    category: "Acts",
    date: "2017-12-31",
    size: "1.47 MB",
    fileType: "pdf",
    url: "/documents/Constitutional-Review-Commission-Act-2017.pdf",
  },
  {
    id: 4,
    title: "National Human Rights Commission Act, 2017",
    type: "Act",
    category: "Acts",
    date: "2017-12-31",
    size: "147.43 KB",
    fileType: "pdf",
    url: "/documents/National-Human-Rights-Commission-Act-2017.pdf",
  },
  {
    id: 5,
    title: "Victims Reparations Act, 2023",
    type: "Act",
    category: "Acts",
    date: "2024-03-06",
    size: "164.62 KB",
    fileType: "pdf",
    url: "/documents/Victims-Reparations-Act-2023.pdf",
  },
  {
    id: 6,
    title: "Final Draft Constitution",
    type: "Draft",
    category: "Constitutional Review Process",
    date: "2020-03-30",
    size: "2.11 MB",
    fileType: "pdf",
    url: "/documents/Final-Draft-Constitution.pdf",
  },
  {
    id: 7,
    title: "Report of The Constitutional Review Commission",
    type: "Report",
    category: "Constitutional Review Process",
    date: "2020-03-30",
    size: "580.37 KB",
    fileType: "pdf",
    url: "/documents/Report-of-The-Constitutional-Review-Commission.pdf",
  },
  {
    id: 8,
    title: "Explanatory Memorandum to the Draft Constitution",
    type: "Memorandum",
    category: "Constitutional Review Process",
    date: "2020-01-01",
    size: "580.37 KB",
    fileType: "pdf",
    url: "/documents/Explanatory-Memorandum-to-the-Draft-Constitution.pdf",
  },
  {
    id: 9,
    title: "Gazette No.88/2020 of 28th May 2020 ( Vol. 137)",
    type: "Gazette",
    category: "Gazettes",
    date: "2020-05-28",
    size: "72.84 KB",
    fileType: "jpeg",
    url: "/documents/Gazette-No-88-2020-of-28th-May-2020-Vol-137.pdf",
  },
  {
    id: 10,
    title: "White Paper",
    type: "Report",
    category: "Janneh Commission Reports",
    date: "2019-09-13",
    size: "557.50 KB",
    fileType: "pdf",
    url: "/documents/White-Paper.pdf",
  },
  {
    id: 11,
    title:
      "Volume 1 and 2 - GENERAL INTRODUCTION AND EX-PRESIDENT JAMMEH'S FINANCIAL DEALINGS & CORRUPTION (BANK ACCOUNTS)",
    type: "Report",
    category: "Janneh Commission Reports",
    date: "2019-03-29",
    size: "4.31 MB",
    fileType: "pdf",
    url: "/documents/Volume-1-and-2-GENERAL-INTRODUCTION-AND-EX-PRESIDENT-JAMMEH-S-FINANCIAL-DEALINGS-CORRUPTION-BANK-ACC.pdf",
  },
  {
    id: 12,
    title: "Company Registry Fee Schedule 2024",
    type: "Schedule",
    category: "Company Registry",
    date: "2024-01-01",
    size: "816.77 KB",
    fileType: "pdf",
    url: "/documents/Company-Registry-Fee-Schedule-2024.pdf",
  },
  {
    id: 13,
    title: "Volume 1: Compendium Part A",
    type: "Report",
    category: "TRRC Final Report",
    date: "2021-11-25",
    size: "1.68 MB",
    fileType: "pdf",
    url: "/documents/Volume-1-Compendium-Part-A.pdf",
  },
  {
    id: 14,
    title: "White Paper on TRRC Report",
    type: "Report",
    category: "Government White Paper on the TRRC Report",
    date: "2022-05-25",
    size: "1.29 MB",
    fileType: "pdf",
    url: "/documents/White-Paper-on-TRRC-Report.pdf",
  },
  {
    id: 15,
    title: "Child - Report",
    type: "Report",
    category: "TRRC Child - Friendly Report",
    date: "2022-10-20",
    size: "2.20 MB",
    fileType: "pdf",
    url: "/documents/TRRC-Child-Friendly-Report.pdf",
  },
  {
    id: 16,
    title: "Nna Nyanto Newsletter",
    type: "Newsletter",
    category: "Newsletter",
    date: "2023-09-13",
    size: "3.59 MB",
    fileType: "pdf",
    url: "/documents/Nna-Nyanto-Newsletter.pdf",
  },
  {
    id: 17,
    title: "TERMS OF REFERENCE (TOR) FOR EXPERT COMMUNICATIONS FIRM",
    type: "TOR",
    category: "Consultancy",
    date: "2024-02-08",
    size: "83.47 KB",
    fileType: "pdf",
    url: "/documents/TOR-EXPERT-COMMUNICATIONS-FIRM.pdf",
  },
];

const documentFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  type: z.string().min(2, { message: "Type is required." }),
  category: z.string().min(2, { message: "Category is required." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<
    (typeof documents)[0] | null
  >(null);
  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
      type: "",
      category: "",
      url: "",
    },
  });

  const onSubmit = (data: z.infer<typeof documentFormSchema>) => {
    console.log(data);
    setAddDocumentModalOpen(false);
    form.reset();
  };

  const handleDocumentClick = (document: (typeof documents)[0]) => {
    setSelectedDocument(document);
    if (window.innerWidth < 768) {
      setIsMobileDetailView(true);
    }
  };

  const handleBackClick = () => {
    setSelectedDocument(null);
    setIsMobileDetailView(false);
  };

  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  const filteredDocuments = documents.filter(
    (doc) =>
      (selectedCategory === null ||
        selectedCategory === "all" ||
        doc.category === selectedCategory) &&
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-theme(spacing.24))]">
        {/* Left column */}
        <div
          className={`bg-card rounded-lg shadow-md  ${
            isMobileDetailView ? "hidden md:block" : ""
          }`}
        >
          <div className="p-4 border-b sticky top-0 bg-card z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Legal Documents</h2>
              <Button onClick={() => setAddDocumentModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory || "all"}
                onValueChange={(value) =>
                  setSelectedCategory(value === "all" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-theme(spacing.64))]">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="p-4 border-b cursor-pointer hover:bg-accent"
                onClick={() => handleDocumentClick(document)}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">{document.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {document.category}
                    </p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>{document.fileType.toUpperCase()}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(document.date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Right column */}
        <div
          className={`bg-card rounded-lg shadow-md col-span-2 ${
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
              {selectedDocument ? selectedDocument.title : "Document Details"}
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-theme(spacing.40))]">
            {selectedDocument && (
              <div className="p-4">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {selectedDocument.category} •{" "}
                    {format(new Date(selectedDocument.date), "MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Size: {selectedDocument.size} • Type:{" "}
                    {selectedDocument.fileType.toUpperCase()}
                  </p>
                </div>
                <PdfReader
                  source={selectedDocument.url}
                  fileName={selectedDocument.title}
                />
              </div>
            )}
            {!selectedDocument && (
              <div className="p-4 text-center text-muted-foreground">
                Select a document to view details
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <Sheet open={addDocumentModalOpen} onOpenChange={setAddDocumentModalOpen}>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Add New Document</SheetTitle>
            <SheetDescription>
              Add a new legal document to the collection.
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
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => form.setValue("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Constitution">Constitution</SelectItem>
                    <SelectItem value="Act">Act</SelectItem>
                    <SelectItem value="Bill">Bill</SelectItem>
                    <SelectItem value="Regulation">Regulation</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Memorandum">Memorandum</SelectItem>
                    <SelectItem value="Gazette">Gazette</SelectItem>
                    <SelectItem value="Schedule">Schedule</SelectItem>
                    <SelectItem value="Newsletter">Newsletter</SelectItem>
                    <SelectItem value="TOR">TOR</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => form.setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Document URL</Label>
                <Input
                  id="url"
                  {...form.register("url")}
                  placeholder="https://example.com/document.pdf"
                />
                {form.formState.errors.url && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.url.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddDocumentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Document</Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
