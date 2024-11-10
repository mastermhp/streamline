import React from "react";
import FeatureCard from "./FeatureCard";
import {
  Bot,
  Calendar,
  Edit3,
  Image,
  LayoutTemplate,
  Mic,
  Music,
  Share2,
  Video,
} from "lucide-react";
import Link from "next/link";

function PowerfulFeatures() {
  return (
    <div className="w-full p-12 md:p-24 lg:p-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href={"/dashboard/create-new"}>
            <FeatureCard
              icon={<Video />}
              title="Text-to-Video Generation"
              description="Convert your text into dynamic videos"
            />
          </Link>
          <Link href={"/dashboard/pre-made-templates"}>
            <FeatureCard
              icon={<LayoutTemplate />}
              title="Pre-made Templates"
              description="Choose from hundreds of professional templates"
            />
          </Link>
          <Link href={"/dashboard/editing-tools"}>
            <FeatureCard
              icon={<Edit3 />}
              title="Video Editing Tools"
              description="Trim, crop, and enhance your videos"
            />
          </Link>

          <FeatureCard
            icon={<Music />}
            title="Music & Sound"
            description="Integrate music and sound effects"
          />
          <FeatureCard
            icon={<Bot />}
            title="AI Scripts"
            description="Generate engaging video scripts automatically"
          />
          <FeatureCard
            icon={<Mic />}
            title="AI Voiceovers"
            description="Convert text to natural-sounding speech"
          />
          <FeatureCard
            icon={<Image />}
            title="Stock Library"
            description="Access millions of images and videos"
          />
          <FeatureCard
            icon={<Share2 />}
            title="Social Media Integration"
            description="Share directly to social platforms"
          />
          <FeatureCard
            icon={<Calendar />}
            title="Schedule Uploads"
            description="Plan and automate your content calendar"
          />
        </div>
      </div>
    </div>
  );
}

export default PowerfulFeatures;
