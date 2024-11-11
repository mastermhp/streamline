"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  FileVideo,
  Scissors,
  Volume2,
  Type,
  Play,
  Pause,
  Download,
  Loader2,
  Sun,
  Contrast,
  Palette,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function VideoEditing() {
    const { toast } = useToast()

    const [selectedVideo, setSelectedVideo] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(0)
  const [textOverlay, setTextOverlay] = useState("")
  const [textColor, setTextColor] = useState("#ffffff")
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(1)
  const [saturation, setSaturation] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editedVideoUrl, setEditedVideoUrl] = useState("")
  const [isApplyingEdits, setIsApplyingEdits] = useState(false)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const editedVideoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration)
        setTrimEnd(videoRef.current.duration)
      }
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [selectedVideo])

  useEffect(() => {
    applyEditsToPreview()
  }, [brightness, contrast, saturation, textOverlay, textColor, trimStart, trimEnd])

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file)
      setTrimStart(0)
      setTrimEnd(0)
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file)
        videoRef.current.load()
      }
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      if (videoRef.current.currentTime < trimStart) {
        videoRef.current.currentTime = trimStart
      }
      if (videoRef.current.currentTime > trimEnd) {
        videoRef.current.currentTime = trimStart
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleVolumeChange = (value) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleTrimChange = (start, end) => {
    setTrimStart(start)
    setTrimEnd(end)
    if (videoRef.current) {
      videoRef.current.currentTime = start
    }
  }

  const applyEditsToPreview = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const drawFrame = () => {
      ctx.filter = `brightness(${100 + brightness * 100}%) contrast(${contrast * 100}%) saturate(${saturation * 100}%)`
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (textOverlay) {
        ctx.filter = 'none'
        ctx.font = '30px Arial'
        ctx.fillStyle = textColor
        ctx.textAlign = 'center'
        ctx.fillText(textOverlay, canvas.width / 2, canvas.height - 50)
      }

      requestAnimationFrame(drawFrame)
    }

    drawFrame()
  }

  const handleExport = async () => {
    if (!videoRef.current || !canvasRef.current) {
      toast({
        title: "Error",
        description: "Video or canvas is not ready. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsApplyingEdits(true)

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      toast({
        title: "Error",
        description: "Unable to get canvas context. Please try again.",
        variant: "destructive",
      })
      setIsApplyingEdits(false)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const audioCtx = new AudioContext()
    const source = audioCtx.createMediaElementSource(video)
    const destination = audioCtx.createMediaStreamDestination()
    source.connect(destination)

    const canvasStream = canvas.captureStream()
    const audioTrack = destination.stream.getAudioTracks()[0]
    canvasStream.addTrack(audioTrack)

    const mediaRecorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm; codecs=vp9,opus' })
    const chunks = []

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setEditedVideoUrl(url)
      setIsModalOpen(true)
      setIsApplyingEdits(false)
    }

    mediaRecorder.start()

    video.currentTime = trimStart
    video.play()

    const processFrame = () => {
      if (video.currentTime >= trimEnd) {
        video.pause()
        mediaRecorder.stop()
        return
      }

      ctx.filter = `brightness(${100 + brightness * 100}%) contrast(${contrast * 100}%) saturate(${saturation * 100}%)`
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (textOverlay) {
        ctx.filter = 'none'
        ctx.font = '30px Arial'
        ctx.fillStyle = textColor
        ctx.textAlign = 'center'
        ctx.fillText(textOverlay, canvas.width / 2, canvas.height - 50)
      }

      requestAnimationFrame(processFrame)
    }

    processFrame()
  }

  const handleDownload = () => {
    if (editedVideoUrl) {
      const a = document.createElement('a')
      a.href = editedVideoUrl
      a.download = 'edited_video.webm'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      toast({
        title: "Success",
        description: "Your edited video has been downloaded.",
      })
    } else {
      toast({
        title: "Error",
        description: "No edited video available for download.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <FileVideo className="h-6 w-6 text-primary" />
        <span className="font-bold ml-2 text-lg">AI Video Editor</span>
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
              <div className="bg-gray-100 aspect-video rounded-lg mb-4 overflow-hidden relative">
                {selectedVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      className="absolute top-0 left-0 w-full h-full object-contain"
                      onTimeUpdate={handleTimeUpdate}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source src={URL.createObjectURL(selectedVideo)} type={selectedVideo.type} />
                      Your browser does not support the video tag.
                    </video>
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full object-contain"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Select a video to preview</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={(value) => {
                    setCurrentTime(value[0])
                    if (videoRef.current) {
                      videoRef.current.currentTime = value[0]
                    }
                  }}
                  className="w-full"
                />
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline" onClick={handlePlayPause}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleExport} disabled={isApplyingEdits || !selectedVideo}>
                    {isApplyingEdits ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center space-x-2 ml-auto">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                      value={[volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
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
                    <h3 className="text-lg font-semibold mb-2">Select Video</h3>
                    <Input type="file" accept="video/*" onChange={handleFileSelect} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trim</h3>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Start time"
                        value={trimStart}
                        onChange={(e) => handleTrimChange(Number(e.target.value), trimEnd)}
                      />
                      <Input
                        type="number"
                        placeholder="End time"
                        value={trimEnd}
                        onChange={(e) => handleTrimChange(trimStart, Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Text Overlay</h3>
                    <Input
                      type="text"
                      placeholder="Enter text"
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                    />
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Type className="h-4 w-4 mr-2" />
                        Font
                      </Button>
                      <Input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Color Grading</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          Brightness
                        </label>
                        <Slider
                          value={[brightness]}
                          min={-1}
                          max={1}
                          step={0.1}
                          onValueChange={(value) => setBrightness(value[0])}
                        />
                      </div>
                      <div>
                        <label className="text-sm flex items-center">
                          <Contrast className="h-4 w-4 mr-2" />
                          Contrast
                        </label>
                        <Slider
                          value={[contrast]}
                          min={0}
                          max={2}
                          step={0.1}
                          onValueChange={(value) => setContrast(value[0])}
                        />
                      </div>
                      <div>
                        <label className="text-sm flex items-center">
                          <Palette className="h-4 w-4 mr-2" />
                          Saturation
                        </label>
                        <Slider
                          value={[saturation]}
                          min={0}
                          max={2}
                          step={0.1}
                          onValueChange={(value) => setSaturation(value[0])}
                        />
                      </div>
                    </div>
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
            © 2024 AI Video Editor. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              Save Draft
            </Button>
            <Button size="sm" onClick={handleExport} disabled={isApplyingEdits || !selectedVideo}>
              {isApplyingEdits ? 'Exporting...' : 'Export Video'}
            </Button>
          </div>
        </div>
      </footer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edited Video Preview</DialogTitle>
            <DialogDescription>
              Here's a preview of your edited video. You can download it using the button below.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video mt-4">
            <video ref={editedVideoRef} src={editedVideoUrl} controls className="w-full h-full" />
          </div>
          <Button onClick={handleDownload} className="mt-4">
            <Download className="mr-2 h-4 w-4" /> Download Edited Video
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default VideoEditing;
