import { boolean, json, serial, varchar } from "drizzle-orm/pg-core"; // Use pg-core for PostgreSQL
import { pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(), // serial does not take a length argument
  name: varchar("name", 255).notNull(),
  email: varchar("email", 255).notNull(),
  imageUrl: varchar("imageUrl", 255), // varchar should specify length
  subscription: boolean("subscription").default(false), // boolean type is fine
});

export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey(), // serial does not take a length argument
  script: json("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  videoList: varchar("videoList").array(),
  createdBy: varchar("createdBy").notNull(),
});
