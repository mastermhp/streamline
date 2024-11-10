import { Button } from "@/components/ui/button";
import React from "react";

function Footer() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-1 sm:py-1 lg:py-1">
      <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-400 dark:text-gray-400">
          © 2024 AI Video Creator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Button variant="link" className="text-xs text-fuchsia-600">
            Terms of Service
          </Button>
          <Button variant="link" className="text-xs text-fuchsia-600">
            Privacy
          </Button>
        </nav>
      </div>
      
    </div>
  );
}

export default Footer;
