const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate a 30 second video on topic: interesting historical story along with Ai image promt in realistic format for each scene and give me result in json format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A dramatic illustration of a medieval marketplace bustling with activity, people bartering, merchants selling goods, and a shadowy figure lurking in the background\",\n    \"ContentText\": \"In the heart of medieval Europe, a bustling marketplace buzzed with activity. Merchants hawked their wares, artisans displayed their crafts, and the air crackled with a mixture of excitement and tension.\"\n  },\n  {\n    \"imagePrompt\": \"Close-up portrait of a young woman, dressed in simple clothing, with a determined look in her eyes, holding a small, worn book\",\n    \"ContentText\": \"Among the throngs was a young woman named Agnes. Unlike the others, she wasn't there to buy or sell. She carried a worn book, its pages filled with forgotten knowledge.\"\n  },\n  {\n    \"imagePrompt\": \"A dark and ominous scene inside a dimly lit library, with stacks of ancient books towering around a single oil lamp, highlighting the woman reading intently\",\n    \"ContentText\": \"Agnes was a scholar, seeking forgotten wisdom in the dusty pages of ancient texts. She believed that knowledge was power, and she was determined to uncover the truth.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic scene with Agnes standing before a group of powerful-looking men, their expressions stern and disapproving, while she boldly defends her findings\",\n    \"ContentText\": \"But her quest for knowledge made her a target. The powerful and influential saw her as a threat, and they sought to silence her.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic illustration of a medieval torture chamber, with Agnes bound and distressed, but with a defiant look on her face\",\n    \"ContentText\": \"Agnes was imprisoned and tortured, but she refused to betray her beliefs. Her courage inspired others to fight for freedom of thought and knowledge.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of the book, now open to a page with a bold inscription, surrounded by a bright light, symbolizing the power of knowledge\",\n    \"ContentText\": \"Through her sacrifice, Agnes's book became a symbol of resistance, inspiring generations to come to fight for the right to learn and to think freely.\"\n  },\n  {\n    \"imagePrompt\": \"An image of a modern library, filled with people of diverse backgrounds, reading, studying, and collaborating, representing the legacy of Agnes and the power of knowledge\",\n    \"ContentText\": \"Today, libraries around the world stand as a testament to the power of knowledge and the courage of those who fight for the freedom to learn.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure contains a list of objects, each representing a scene in your 30-second video. Each object contains two fields:\n\n* **imagePrompt:** This field provides a detailed description for an AI image generation tool like Midjourney or DALL-E. You can use this prompt to create a visual representation of the scene.\n* **ContentText:** This field provides the text content to be spoken or displayed on screen during that scene.\n\n**Using this JSON data:**\n\n1. **Generate images:** Use the `imagePrompt` field to generate images for each scene using your preferred AI image generation tool.\n2. **Create the video:** Combine the images with the corresponding `ContentText` in a video editing software. You can use the text as narration, subtitles, or a combination of both.\n3. **Edit and polish:** Add transitions, music, sound effects, and other elements to complete your 30-second historical video.\n\n**Notes:**\n\n* You can modify the `imagePrompt` and `ContentText` to better fit your specific vision and storytelling style.\n* You can adjust the number of scenes and their content to fit within the 30-second time frame.\n* Experiment with different AI image generation tools to find the style that best suits your video.\n* Consider adding additional elements, such as historical music or sound effects, to enhance the video's atmosphere.\n"},
          ],
        },
      ],
    });
  
   