import { NextResponse } from "next/server";
import { storage } from "@/configs/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function pollPredictionStatus(predictionId) {
  const pollUrl = `https://api.replicate.com/v1/predictions/${predictionId}`;

  while (true) {
    const response = await fetch(pollUrl, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Polling data:", data);

    if (data.status === "succeeded") {
      return data.output; // Output contains the image URLs
    } else if (data.status === "failed") {
      throw new Error("Prediction failed to complete.");
    }

    // Wait for a short interval before polling again
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function saveVideoToFirebase(url, fileName) {
  const response = await fetch(url);
  const blob = await response.blob();

  // Create a reference to Firebase Storage
  const storageRef = ref(storage, `streamline-files/${fileName}.mp4`);

  // Upload the video blob to Firebase Storage
  await uploadBytes(storageRef, blob);

  // Get the download URL for the uploaded video
  const publicUrl = await getDownloadURL(storageRef);
  return publicUrl;
}

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    // Step 1: Start prediction
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        input: {
          prompt: prompt,
          width: 1024,
          height: 576,
          guidance_scale: 17.5,
          negative_prompt:
            "very blue, dust, noisy, washed out, ugly, distorted, broken, low quality",
        },
      }),
    });

    const predictionData = await response.json();
    console.log("Prediction Data:", predictionData);

    const predictionId = predictionData.id;
    if (!predictionId) throw new Error("Prediction ID is undefined");


    // Step 2: Poll until prediction is complete
    const output = await pollPredictionStatus(predictionId);
    console.log("Polling output:", output);

    const videoUrl = output[0]; // Get the generated video URL
    if (!videoUrl) throw new Error("Video URL is undefined");

    // Save the video to Firebase Storage
    const fileName = `video_${predictionId}`;
    const firebaseUrl = await saveVideoToFirebase(videoUrl, fileName);

    console.log("Final Firebase URL:", firebaseUrl);
    return NextResponse.json({ firebaseUrl});
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({
      error: "Failed to retrieve scene from Replicate",
    });
  }
}
