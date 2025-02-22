import ImageKit from "imagekit";
import { users } from "./schema";
import dummyusers from "../../dummyusers.json";
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
    for (const user of dummyusers) {
      const university_card = await uploadImageKit(
        user.universityCard,
        `${user.fullName}.jpg`,
        "/users/university-card"
      );
      await db.insert(users).values({
        fullName: user.fullName,
        email: user.email,
        universityId: user.universityId,
        password: user.password,
        universityCard: university_card ? university_card : "",
        status: user.status,
        role: user.role,
        createdAt: new Date(user.createdAt),
        lastActivityDate: new Date(user.lastActivityDate),
      });
    }
  } catch (error) {
    console.error(error);
  }

  console.log("Database seeded successfully.");
};
seed();
