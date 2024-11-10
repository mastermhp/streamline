"use client";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {db} from "@/configs/db"; // Import your db client here
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User detected:", user);
      isNewUser();
    } else {
      console.log("No user detected");
    }
  }, [user]);

  const isNewUser = async () => {
    console.log("Checking if user exists...");
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
        
      console.log("User query result:", result);

      if (!result[0]) {
        console.log("Inserting new user...");
        await db.insert(Users).values({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
        });
        console.log("User inserted");
      } else {
        console.log("User already exists");
      }
    } catch (error) {
      console.error("Error in isNewUser function:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
