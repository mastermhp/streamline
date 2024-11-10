"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileVideo, Search } from "lucide-react";

const templateCategories = [
  "All",
  "Social Media",
  "Marketing",
  "Education",
  "Entertainment",
  "Business",
];

const templates = [
  {
    id: 1,
    name: "Product Showcase",
    category: "Marketing",
    thumbnail: "/pds.jpg?height=200&width=300",
  },
  {
    id: 2,
    name: "Tutorial Video",
    category: "Education",
    thumbnail: "/tv.jpg?height=200&width=300",
  },
  {
    id: 3,
    name: "Social Media Story",
    category: "Social Media",
    thumbnail: "/sms.jpg?height=200&width=300",
  },
  {
    id: 4,
    name: "Company Introduction",
    category: "Business",
    thumbnail: "/ci.jpg?height=200&width=300",
  },
  {
    id: 5,
    name: "Movie Trailer",
    category: "Entertainment",
    thumbnail: "/mt.jpg?height=200&width=300",
  },
  {
    id: 6,
    name: "Explainer Video",
    category: "Education",
    thumbnail: "/ev.jpg?height=200&width=300",
  },
  {
    id: 7,
    name: "Testimonial Compilation",
    category: "Marketing",
    thumbnail: "/tc.jpg?height=200&width=300",
  },
  {
    id: 8,
    name: "Event Invitation",
    category: "Social Media",
    thumbnail: "/ei.jpg?height=200&width=300",
  },
];

function PreMadeTemp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <FileVideo className="h-6 w-6 text-primary" />
        <span className="font-bold ml-2 text-lg">AI Video Creator</span>
        <nav className="ml-auto flex items-center space-x-4 lg:space-x-6">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">My Projects</Button>
          <Button variant="ghost">Help</Button>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Pre-made Templates</h1>
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Tabs defaultValue="All" className="mb-8">
          <TabsList>
            {templateCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.category}
                  </p>
                  <Button className="w-full">Use Template</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No templates found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find more templates.
            </p>
          </div>
        )}
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 AI Video Creator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default PreMadeTemp;
