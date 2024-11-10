"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileVideo,
  Scissors,
  Crop,
  Volume2,
  Image,
  Type,
  Palette,
  Sparkles,
} from "lucide-react";

function VideoEditing() {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

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
          <h1 className="text-3xl font-bold mb-6">Video Editing Tools</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-100 aspect-video rounded-lg mb-4">
                {/* Video preview area */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Video Preview
                </div>
              </div>
              <div className="space-y-4">
                <Slider
                  value={[currentTime]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                  className="w-full"
                />
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline">
                    <Scissors className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Crop className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2 ml-auto">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trim</h3>
                    <div className="flex space-x-2">
                      <Input type="text" placeholder="Start time" />
                      <Input type="text" placeholder="End time" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Text Overlay</h3>
                    <Input type="text" placeholder="Enter text" />
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Type className="h-4 w-4 mr-2" />
                        Font
                      </Button>
                      <Button size="sm" variant="outline">
                        <Palette className="h-4 w-4 mr-2" />
                        Color
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Background Music
                    </h3>
                    <Button className="w-full">
                      <Image className="h-4 w-4 mr-2" />
                      Choose Audio
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Color Grading
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm">Brightness</label>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      <div>
                        <label className="text-sm">Contrast</label>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      <div>
                        <label className="text-sm">Saturation</label>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      <div>
                        <label className="text-sm">Temperature</label>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Effects</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">Fade In</Button>
                      <Button variant="outline">Fade Out</Button>
                      <Button variant="outline">Slow Motion</Button>
                      <Button variant="outline">Speed Up</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      AI Enhancement
                    </h3>
                    <Button className="w-full">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Auto Enhance
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Video Creator. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              Save Draft
            </Button>
            <Button size="sm">Export Video</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default VideoEditing;
