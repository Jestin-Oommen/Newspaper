// core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PrismaClient } from "@prisma/client"; // Make sure this is the correct import

const prisma=new PrismaClient();

const f = createUploadthing();

export const ourFileRouter = {
  epaperUploader: f({ pdf: { maxFileSize: "16MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("Upload complete:", file.url);

      // Save URL to DB
      await prisma.ePaper.deleteMany(); // delete old one
      await prisma.ePaper.create({
        data: {
          url: file.url,
        },
      });

      console.log("PDF URL saved to DB");
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
