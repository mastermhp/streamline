/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://ai-video-generator_owner:Mqs5AeZlCPy0@ep-gentle-mouse-a8jyecof.eastus2.azure.neon.tech/ai-video-generator?sslmode=require",
  },
};