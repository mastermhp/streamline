"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import Image from "next/image";

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [demoMode, setDemoMode] = useState(false); // Added demoMode state

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = async () => {
    if (demoMode) {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setVideoData({
          videoScript: [
            {
              ContentText: "This is Paid and as this website is free hosted so for now you are watching a dummy image.",
              imagePrompt: "A colorful abstract background",
            },
          ],
          audioFileUrl: "https://example.com/demo-audio.mp3",
          captions: [{ start: 0, end: 5, text: "This is Paid and as this website is free hosted so for now you are watching a dummy image." }],
          videoScene: [
            {
              url: "/demo.jpg?height=480&width=640",
              alt: "Demo scene showing a colorful abstract background",
              seed: 123456,
              num_inference_steps: 50,
              guidance_scale: 7.5,
            },
          ],
        });
        setVideoData(demoData);
      } catch (error) {
        setError("Error in demo mode: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const videoScript = await GetVideoScript();
        if (!videoScript) throw new Error("Failed to generate video script");

        const audioFileUrl = await GenerateAduioFile(videoScript);
        if (!audioFileUrl) throw new Error("Failed to generate audio file");

        const captions = await generateAudioCaption(audioFileUrl, videoScript);
        if (!captions) throw new Error("Failed to generate captions");

        const scenes = await GenerateScene(videoScript);
        if (!scenes.length) throw new Error("Failed to generate scenes");

        setVideoData({
          videoScript,
          audioFileUrl,
          captions,
          videoScene: scenes,
        });
      } catch (error) {
        setError("Error creating video: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No plain text`;

    try {
      const resp = await axios.post("/api/get-video-script", { prompt });
      return resp.data.result || null;
    } catch (error) {
      throw new Error("Failed to generate video script: " + error.message);
    }
  };

  const GenerateAduioFile = async (videoScriptData) => {
    const script = videoScriptData.map((item) => item.ContentText).join(" ");
    const id = uuidv4();

    try {
      const response = await axios.post("/api/generate-audio", {
        text: script,
        id,
      });
      return response.data?.Result || null;
    } catch (error) {
      throw new Error("Failed to generate audio: " + error.message);
    }
  };

  const generateAudioCaption = async (fileUrl, videoScriptData) => {
    try {
      const resp = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });
      return resp.data.result || null;
    } catch (error) {
      throw new Error("Failed to generate captions: " + error.message);
    }
  };

  const GenerateScene = async (videoScriptData) => {
    try {
      console.log("Starting scene generation for:", videoScriptData);
      const scenes = await Promise.all(
        videoScriptData.map(async (element, index) => {
          try {
            console.log(`Generating scene ${index + 1}:`, element.imagePrompt);
            const width = 640;
            const height = 480;
            const imageUrl = `/demo.jpg?height=${height}&width=${width}&text=Scene${
              index + 1
            }`;

            // const imageUrl = `sltn.png${width}/${height}?random=${index}`;

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log(`Scene ${index + 1} generated:`, imageUrl);
            return {
              url: imageUrl,
              alt: `Scene ${index + 1}: ${element.imagePrompt}`,
              seed: Math.floor(Math.random() * 1000000),
              num_inference_steps: 50,
              guidance_scale: 7.5,
            };
          } catch (error) {
            console.error(`Error generating scene ${index + 1}:`, error);
            return null;
          }
        })
      );

      console.log("All generated scenes:", scenes);
      const filteredScenes = scenes.filter((scene) => scene !== null);
      console.log("Filtered scenes:", filteredScenes);
      return filteredScenes;
    } catch (error) {
      console.error("Error in GenerateScene:", error);
      return [];
    }
  };

  // useEffect(() => {
  //   console.log("Current videoData:", videoData);
  //   if (
  //     videoData &&
  //     Object.keys(videoData).length === 4 &&
  //     Array.isArray(videoData.videoScene) &&
  //     videoData.videoScene.length > 0 &&
  //     videoData.videoScene.every((scene) => scene !== undefined)
  //   ) {
  //     console.log("Calling SaveVideoData with:", videoData);
  //     SaveVideoData(videoData);
  //   } else {
  //     console.log("Not saving video data yet. Conditions not met.");
  //   }
  // }, [videoData]);

  // const SaveVideoData = async (videoData) => {
  //   setLoading(true);
  //   try {
  //     console.log("Attempting to save video data:", videoData);

  //     const dataToInsert = {
  //       script: JSON.stringify(videoData.videoScript),
  //       audioFileUrl: videoData.audioFileUrl,
  //       captions: JSON.stringify(videoData.captions),
  //       videoList: JSON.stringify(videoData.videoScene.map(scene => ({
  //         url: scene.url,
  //         alt: scene.alt,
  //         seed: scene.seed
  //       }))),
  //       createdBy: user.primaryEmailAddress.emailAddress,
  //     };

  //     const result = await db
  //       .insert(VideoData)
  //       .values(dataToInsert)
  //       .returning();
  //     console.log("Database insertion result:", result);
  //   } catch (error) {
  //     console.error("Error inserting data into the database:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const SaveVideoData = async (videoData, demoMode) => {
    if (demoMode) {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const demoImages = [
          "/demo.jpg",
          "/demo2.jpg",
          "/demo3.jpg",
          // Add all your image paths here
        ];

        const demoData = {
          videoScript: [
            {
              ContentText: "This is Paid and as this website is free hosted so for now you are watching a dummy image.",
              imagePrompt: "A colorful abstract background",
            },
            {
              ContentText: "This is another demo scene.",
              imagePrompt: "A futuristic cityscape",
            },
            {
              ContentText: "And a final demo scene.",
              imagePrompt: "A serene mountain landscape",
            },
          ],
          audioFileUrl: "https://example.com/demo-audio.mp3",
          captions: [{ start: 0, end: 5, text: "This is a demo video." }],
          videoScene: [],
        };

        demoData.videoScene = demoData.videoScript.map((element, index) => {
          console.log(`Generating scene ${index + 1}:`, element.imagePrompt);
          const imageUrl = demoImages[index] || demoImages[0]; // Fallback to first image if index doesn't exist
          return {
            url: imageUrl,
            alt: `Demo scene ${index + 1}: ${element.imagePrompt}`,
            seed: 123456,
            num_inference_steps: 50,
            guidance_scale: 7.5,
          };
        });

        setVideoData(demoData);
      } catch (error) {
        setError("Error in demo mode: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        // Ensure videoData exists and has the required properties
        if (!videoData) throw new Error("No video data provided");
        // Prepare the data in the correct format for the database
        const preparedData = {
          // For JSON fields, pass the objects directly - no need to stringify
          script: videoData.videoScript || [],
          audioFileUrl: videoData.audioFileUrl || "",
          captions: videoData.captions || [],
          // For array field, ensure it's an array of strings
          videoList: videoData.videoScene?.map((scene) => scene.url) || [],
          createdBy: user?.primaryEmailAddress?.emailAddress || "",
        };

        // Validate required fields
        if (!preparedData.script.length) throw new Error("Script is required");
        if (!preparedData.audioFileUrl)
          throw new Error("Audio URL is required");
        if (!preparedData.captions.length)
          throw new Error("Captions are required");
        if (!preparedData.createdBy)
          throw new Error("Creator email is required");

        // Log the prepared data for debugging
        console.log("Prepared data for database:", preparedData);

        // Insert the data
        const result = await db.insert(VideoData).values(preparedData);

        console.log("Database insertion successful:", result);
      } catch (error) {
        console.error("Database insertion error:", error);
        setError("Failed to save video data: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (
      videoData &&
      videoData.videoScript &&
      videoData.audioFileUrl &&
      videoData.captions &&
      Array.isArray(videoData.videoScene) &&
      videoData.videoScene.length > 0
    ) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-fuchsia-950 text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <div className="flex items-center justify-between mt-4 mb-2">
          <span>Demo Mode</span>
          <Button
            onClick={() => setDemoMode(!demoMode)}
            variant={demoMode ? "default" : "outline"}
          >
            {demoMode ? "On" : "Off"}
          </Button>
        </div>
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Video"}
        </Button>
        {/* <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Video
        </Button> */}
      </div>
      {loading && <CustomLoading loading={loading} />}

      {/* <CustomLoading loading={loading} /> */}

      {error && (
        <AlertDialog open={!!error}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogTitle className="text-xl font-bold">
              Demo Preview
            </AlertDialogTitle>
            <div className="grid gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="/demo.jpg"
                  alt="Demo video preview"
                  fill
                  className="object-cover"
                />
              </div>
              <AlertDialogDescription className="text-base">
                <p className="mb-2">
                  <strong>Scene Description:</strong>
                </p>
                <p>{videoData?.videoScript?.[0]?.ContentText || "Loading scene description..."}</p>
                <p className="mt-4">
                  <strong>Image Prompt:</strong>
                </p>
                <p>
                  {videoData?.videoScript?.[0]?.imagePrompt ||
                    "Loading image prompt..."}
                </p>
              </AlertDialogDescription>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setError("")}>Close Preview</Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {videoData && videoData.videoScene && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Generated Scenes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoData.videoScene.map((scene, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="relative aspect-video">
                  <Image
                    src={scene.url}
                    alt={scene.alt}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">{scene.alt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {videoData && videoData.videoScene && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Generated Scenes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoData.videoScene.map((scene, index) => (
              <div key={index} className="border rounded-lg p-4">
                <Image
                  src={scene.url}
                  alt={scene.alt || `Generated scene ${index + 1}`}
                  width={300}
                  height={200}
                  layout="responsive"
                />
                <p className="mt-2 text-sm text-gray-600">{scene.alt}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default CreateNew;
