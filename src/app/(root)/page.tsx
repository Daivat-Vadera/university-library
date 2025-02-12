import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { auth } from "../../../auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
export default async function Home() {
  const session = await auth();

  const latestBook = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBook[0]} />
      <BookList
        title="Latest book"
        books={latestBook}
        containerClassName="mt-28"
      />
    </>
  );
}
