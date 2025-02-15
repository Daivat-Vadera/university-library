import React from "react";
import { auth, signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { desc, eq, inArray } from "drizzle-orm";
import BorrowedBookList from "@/components/BorrowedBookList";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const user = session?.user;
  if (!userId || !user) return redirect("/");
  const latestBook = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  const booksBorrowedEntries = await db
    .select({ bookId: borrowRecords.bookId, status: borrowRecords.status })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId));

  const bookIds = booksBorrowedEntries
    .filter((entry) => entry.status === "BORROWED")
    .map((entry) => entry.bookId);

  const booksBorrowed = (await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds))) as Book[];
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="text-white text-4xl font-ibm-plex-sans">Hey, {user.name}</div>
        <form
          className="mb-10"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Logout</Button>
        </form>
      </div>
      {booksBorrowed.length > 0 && (
        <BorrowedBookList title="Borrowed Books" books={booksBorrowed} />
      )}

      <BookList
        title="Latest book"
        books={latestBook}
        containerClassName="mt-28"
      />
    </>
  );
};

export default page;
