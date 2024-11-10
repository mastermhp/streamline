"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-fuchsia-950 ">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button> + Create new</Button>
        </Link>
      </div>

      {/* Empty State  */}
      {videoList?.length == 0 && (
        <div className="">
          <EmptyState />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
