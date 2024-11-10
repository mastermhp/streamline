import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-lg">
      <div className="flex gap-3 items-center">
        <Link href={"/"}>
          <Image
            className="w-full h-full"
            src={"/stln.png"}
            alt="logo"
            width={31}
            height={31}
          />
        </Link>

        {/* <Image src={'/streamline.png'}/> */}
        <h2 className="font-bold text-xl text-fuchsia-950">Streamline</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
