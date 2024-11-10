import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

function SelectDuration({onUserSelect}) {
  return (
    <div className='mt-7'>
      <h2 className="font-bold text-2xl text-fuchsia-950"> Duration</h2>
      <p className="text-gray-500">Select the duration of your video?</p>
      <Select
        onValueChange={(value) => {
          value != "Custom Promt" && onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='15 seconds'>15 seconds</SelectItem>
            <SelectItem value='30 seconds'>30 seconds</SelectItem>
            <SelectItem value='1 minutes'>1 minutes</SelectItem>
            <SelectItem value='2 minutes'>2 minutes</SelectItem>
            <SelectItem value='3 minutes'>3 minutes</SelectItem>
            <SelectItem value='4 minutes'>4 minutes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
