import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { auth } from "../../../auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  if(!userId) return redirect("/");
  const latestBook = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview
        {...latestBook[0]}
        userid={userId}
        bookid={latestBook[0].id}
      />
      <BookList
        title="Latest book"
        books={latestBook}
        containerClassName="mt-28"
      />
    </>
  );
}
