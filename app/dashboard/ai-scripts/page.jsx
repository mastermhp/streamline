"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  FileVideo,
  Wand2,
  Sparkles,
  Save,
  Download,
  Trash2,
} from "lucide-react";

function AiScript() {
  const [scriptContent, setScriptContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScript = async () => {
    setIsGenerating(true);
    // Simulating API call for script generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScriptContent(
      "This is a sample AI-generated script for your video. It includes an introduction, main content, and a call to action. Feel free to edit and refine this script to match your specific needs and style."
    );
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <FileVideo className="h-6 w-6 text-primary" />
        <span className="font-bold ml-2 text-lg">AI Video Creator</span>
        <nav className="ml-auto flex items-center space-x-4 lg:space-x-6">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">My Projects</Button>
          <Button variant="ghost">Help</Button>
        </nav>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">AI Script Generator</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium">
                  Script Prompt
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Enter a brief description or outline for your video script..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={generateScript} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Script
                    </>
                  )}
                </Button>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Script Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="explainer">Explainer Video</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="script" className="text-sm font-medium">
                  Generated Script
                </label>
                <Textarea
                  id="script"
                  value={scriptContent}
                  onChange={(e) => setScriptContent(e.target.value)}
                  placeholder="Your AI-generated script will appear here..."
                  className="min-h-[300px]"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Script
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Script Settings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="tone" className="text-sm font-medium">
                      Tone
                    </label>
                    <Select defaultValue="neutral">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="length" className="text-sm font-medium">
                      Script Length (words)
                    </label>
                    <Slider defaultValue={[300]} max={1000} step={50} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="keywords" className="text-sm font-medium">
                      Include Keywords
                    </label>
                    <Switch id="keywords" />
                  </div>
                  <div>
                    <label
                      htmlFor="keywords-input"
                      className="text-sm font-medium"
                    >
                      Keywords (comma-separated)
                    </label>
                    <Input
                      id="keywords-input"
                      placeholder="Enter keywords..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">AI Assistance</h2>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Improve Writing
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Suggest Transitions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Add Call-to-Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Video Creator. All rights reserved.
          </p>
          <Button variant="ghost" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Script
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default AiScript;
