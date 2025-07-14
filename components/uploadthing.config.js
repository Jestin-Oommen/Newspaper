import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  epaperUploader: f({ pdf: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("upload complete", file);
    }),
};
