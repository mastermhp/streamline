"use client";
import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({onUserSelect}) {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "Watercolor",
      image: "/watercolor.jpg",
    },
    {
      name: "GTA",
      image: "/gta.jpg",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-fuchsia-950"> Style</h2>
      <p className="text-gray-500">Select your style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            className={`relative hover:scale-110 transition-all cursor-pointer rounded-xl ${
              selectedOption == item.name && "border-4 border-fuchsia-950"
            }`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 text-white w-full text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;