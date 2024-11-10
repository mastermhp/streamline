"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";

const scriptData =
  "It was a dark and stormy night. The wind howled outside, rattling the windows of the old, abandoned house on the hill.  A chill ran down my spine as I approached the house, its once-bright paint now peeling and faded, the windows boarded up. As I stepped inside, the air grew thick and heavy, laden with the scent of decay and something else, something darker.  A single candle flickered on a dusty table, casting long, sinister shadows on the walls. A faint scratching sound echoed from the hallway. I slowly made my way towards it, my heart pounding in my chest. As I rounded the corner, I saw a shadowy figure standing at the end of the hallway. Its eyes glowed with an eerie, unnatural light. I froze, my breath catching in my throat.  As the figure slowly turned towards me, I saw its pale skin, sharp teeth, and vacant eyes. It was a horrifying sight. Terror flooded through me. I turned and ran, the figures eerie laughter echoing behind me. The candlelight flickered wildly, casting grotesque shadows that danced on the walls, as if mocking my fear. I stumbled and fell, my heart pounding like a drum. The figure loomed over me, its long, sharp claws reaching out.  Its face twisted into a horrifying grin as it leaned in, its breath cold and stale. Just as quickly as it appeared, the figure vanished.  I was left alone in the dark, the only light a flickering candle, casting eerie shadows on the walls. I stumbled to my feet and ran out of the house, never looking back. The old house on the hill remained, a silent sentinel against the stormy night. But I knew, deep down, that the darkness inside was waiting, waiting for its next victim. ";

const FILEURL =
  "https://firebasestorage.googleapis.com/v0/b/streamline-90242.firebasestorage.app/o/streamline-files%2Fc46bc166-16bc-413c-9dd6-93eb54d83fdf.mp3?alt=media&token=f57b8385-7f13-485c-ad2d-d9768e9bcbb7";

const videoSCRIPT = [
  {
    imagePrompt:
      "A dark, overgrown forest path with gnarled trees and flickering shadows. A single beam of light from a flashlight cuts through the darkness, revealing a figure walking alone.  Realistic, cinematic, moody lighting.",
    ContentText:
      "The air was thick with the scent of damp earth and decaying leaves.  Each step I took crunched on the dry undergrowth, the sound echoing unnaturally loud in the stillness. My flashlight beam danced across the twisted branches of ancient trees, their gnarled limbs reaching out like skeletal fingers. I knew I shouldn't have come this way, but I couldn't shake the feeling that I was being watched.",
  },
  {
    imagePrompt:
      "A close-up of a weathered, wooden door with iron hinges, hanging slightly ajar. The door creaks in the wind, revealing a dark and cavernous interior.  Realistic, unsettling, eerie lighting.",
    ContentText:
      "As I rounded a bend in the path, I stumbled upon a crumbling stone structure.  A heavy wooden door, its paint peeling and warped, hung slightly ajar.  It creaked ominously in the breeze, revealing a dark, gaping maw beyond.  A chill ran down my spine, and I hesitated, my hand hovering over the rusted handle.",
  },
];

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
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
      console.error("Error in creating video:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get video script
  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No plain text`;
    
    try {
      const resp = await axios.post("/api/get-video-script", { prompt });
      return resp.data.result || null;
    } catch (error) {
      console.error("Error in GetVideoScript:", error);
      return null;
    }
  };

  const GenerateAduioFile = async (videoScriptData) => {
    const script = videoScriptData.map(item => item.ContentText).join(" ");
    const id = uuidv4();
  
    try {
      const response = await axios.post("/api/generate-audio", { text: script, id });
      return response.data?.Result || null;
    } catch (error) {
      console.error("Error in GenerateAduioFile:", error);
      return null;
    }
  };

  // const GenerateAduioFile = async (videoScriptData) => {
  //   setLoading(true);
  //   let script = "";
  //   const id = uuidv4();
  //   videoScriptData.forEach((item) => {
  //     script = script + item.ContentText + " ";
  //   });

  //   const resp = await axios.post("/api/generate-audio", {
  //     text: script,
  //     id: id,
  //   });
  //   setVideoData((prev) => ({
  //     ...prev,
  //     audioFileUrl: resp.data.result,
  //   }));
  //   setAudioFileUrl(resp.data.result);
  //   resp.data.result &&
  //     (await generateAudioCaption(resp.data.result, videoScriptData));
  //   return resp.data.result;

  // };

  const generateAudioCaption = async (fileUrl, videoScriptData) => {
    try {
      const resp = await axios.post("/api/generate-caption", { audioFileUrl: fileUrl });
      return resp.data.result || null;
    } catch (error) {
      console.error("Error in generateAudioCaption:", error);
      return null;
    }
  };

  const GenerateScene = async (videoScriptData) => {
    try {
      const scenes = await Promise.all(
        videoScriptData.map(async (element) => {
          try {
            const response = await axios.post("/api/generate-scene", {
              prompt: element.imagePrompt,
            });
            return response.data.result || null; // Return result or null if empty
          } catch (error) {
            console.error("Error generating scene for prompt:", element.imagePrompt, error);
            return null;
          }
        })
      );
  
      console.log("Generated scenes:", scenes); // Log scenes array to inspect its structure
      return scenes.filter((scene) => scene !== null);
    } catch (error) {
      console.error("Error in GenerateScene:", error);
      return [];
    }
  };
  

  useEffect(() => {
    console.log(videoData);
    if (videoData && Object.keys(videoData).length === 4 && videoData.videoScene.every(scene => scene !== undefined)) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData.videoScript,
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          videoList: videoData.videoScene,
          createdBy: user.primaryEmailAddress.emailAddress,
        })
        .returning("*");
      console.log("Database insertion result:", result);
    } catch (error) {
      console.error("Error inserting data into the database:", error);
    }

    console.log(result);
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-fuchsia-950 text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* select topic  */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* select style  */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* duration  */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* button  */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
