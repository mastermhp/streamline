import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed">
      <h2 className="">Didn't created any video yet?</h2>
      <Link href={"/dashboard/create-new"}>
        <Button>Create New video</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
