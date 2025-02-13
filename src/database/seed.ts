import ImageKit from "imagekit";
import dummyBooks from "../../dummybooks.json";
import { books } from "./schema";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
});

const uploadImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName: fileName,
      folder: folder,
    });
    return response.filePath;
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  console.log("Seeding database...");
  try {
    for (const book of dummyBooks) {
      const bookImage = await uploadImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );
      const bookVideo = await uploadImageKit(
        book.videoUrl,
        `${book.title}.jpg`,
        "/books/videos"
      );
      await db.insert(books).values({
        bookTitle: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        bookImage: bookImage ? bookImage : "",
        bookPrimaryColor: book.coverColor,
        description: book.description,
        totalNoOfBooks: book.totalCopies,
        availableCopies: book.availableCopies,
        bookVideo: bookVideo ? bookVideo : "",
        bookSummary: book.summary,
      });
    }
  } catch (error) {
    console.error(error);
  }

  console.log("Database seeded successfully.");
};
seed();
