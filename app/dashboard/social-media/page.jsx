"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileVideo,
  BarChart2,
  Clock,
  Send,
  Heart,
  MessageSquare,
  Share2,
  Link,
} from "lucide-react";
import AnalyticsCard from "./_components/AnalyticsCard";

function SocialMedia() {
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "https://example.com/alice-avatar.jpg",
      content: "Just posted a new AI tutorial video!",
      likes: 42,
      comments: 7,
      shares: 3,
      views: 1000,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      date: new Date(2023, 5, 15).toISOString(),
    },
    {
      id: 2,
      user: "Bob",
      avatar: "https://example.com/bob-avatar.jpg",
      content: "Check out my latest product launch!",
      likes: 28,
      comments: 5,
      shares: 2,
      views: 500,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      date: new Date(2023, 5, 14).toISOString(),
    },
  ]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handlePost = () => {
    if (selectedFile && caption && user) {
      const newPost = {
        id: feedPosts.length + 1,
        user: user.fullName,
        avatar: user.imageUrl,
        content: caption,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        videoUrl: URL.createObjectURL(selectedFile),
        date: new Date().toISOString(),
      };
      setFeedPosts([newPost, ...feedPosts]);
      setSelectedFile(null);
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSchedulePost = () => {
    if (selectedFile && caption && date && user) {
      const newScheduledPost = {
        id: scheduledPosts.length + 1,
        user: user.fullName,
        avatar: user.imageUrl,
        content: caption,
        date: date.toISOString(),
      };
      setScheduledPosts([...scheduledPosts, newScheduledPost]);
      setSelectedFile(null);
      setCaption("");
      setDate(new Date());
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      scheduledPosts.forEach((post) => {
        if (new Date(post.date) <= now) {
          const newPost = {
            id: feedPosts.length + 1,
            user: post.user,
            avatar: post.avatar,
            content: post.content,
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
            videoUrl: URL.createObjectURL(selectedFile),
            date: post.date,
          };
          setFeedPosts((prev) => [newPost, ...prev]);
          setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id));
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [scheduledPosts, feedPosts, selectedFile]);

  const getUserPosts = () => {
    return feedPosts.filter((post) => post.user === user?.fullName);
  };

  const getTotalEngagement = () => {
    return getUserPosts().reduce(
      (total, post) => total + post.likes + post.comments + post.shares,
      0
    );
  };

  const getTotalViews = () => {
    return getUserPosts().reduce((total, post) => total + post.views, 0);
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
          <h1 className="text-3xl font-bold mb-6">Social Media Management</h1>
          <Tabs defaultValue="post" className="space-y-4">
            <TabsList>
              <TabsTrigger value="post">Post</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="feed">Feed</TabsTrigger>
            </TabsList>
            <TabsContent value="post" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create Post</CardTitle>
                  <CardDescription>
                    Share your video across multiple platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="video" className="text-sm font-medium">
                      Select Video
                    </label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                    />
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="caption" className="text-sm font-medium">
                      Caption
                    </label>
                    <Textarea
                      id="caption"
                      placeholder="Write a caption for your post..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handlePost}
                    disabled={!selectedFile || !caption}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post Now
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Posts</CardTitle>
                  <CardDescription>Plan your content calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="scheduled-video"
                      className="text-sm font-medium"
                    >
                      Select Video
                    </label>
                    <Input
                      id="scheduled-video"
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                    />
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="scheduled-caption"
                      className="text-sm font-medium"
                    >
                      Caption
                    </label>
                    <Textarea
                      id="scheduled-caption"
                      placeholder="Write a caption for your scheduled post..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Schedule Date</label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      Time
                    </label>
                    <Input
                      type="time"
                      id="time"
                      onChange={(e) =>
                        setDate((prev) => {
                          const [hours, minutes] = e.target.value.split(":");
                          const newDate = new Date(prev);
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          return newDate;
                        })
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleSchedulePost}
                    disabled={!selectedFile || !caption || !date}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    Track your video performance across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnalyticsCard
                      title="Views"
                      value={getTotalViews().toString()}
                      icon={<BarChart2 className="h-4 w-4" />}
                    />
                    <AnalyticsCard
                      title="Likes"
                      value={getUserPosts()
                        .reduce((total, post) => total + post.likes, 0)
                        .toString()}
                      icon={<Heart className="h-4 w-4" />}
                    />
                    <AnalyticsCard
                      title="Comments"
                      value={getUserPosts()
                        .reduce((total, post) => total + post.comments, 0)
                        .toString()}
                      icon={<MessageSquare className="h-4 w-4" />}
                    />
                    <AnalyticsCard
                      title="Shares"
                      value={getUserPosts()
                        .reduce((total, post) => total + post.shares, 0)
                        .toString()}
                      icon={<Share2 className="h-4 w-4" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="feed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Social Feed</CardTitle>
                  <CardDescription>See posts from all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {feedPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={post.avatar}
                                  alt={`${post.user}'s avatar`}
                                />
                                <AvatarFallback>{post.user[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{post.user}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(post.date).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <p className="mt-2">{post.content}</p>
                          </div>
                          <div className="relative aspect-video">
                            <video
                              src={post.videoUrl}
                              className="w-full h-full object-cover"
                              controls
                              playsInline
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1"
                                >
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1"
                                >
                                  <Share2 className="h-4 w-4" />
                                  <span>{post.shares}</span>
                                </Button>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {post.views} views
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Video Creator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SocialMedia;
