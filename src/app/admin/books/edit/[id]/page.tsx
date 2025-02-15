import BookForm from "@/components/admin/form/BookForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
    // console.log(bookDetails);
    
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm type="update" {...bookDetails[0]} />
      </section>
    </>
  );
};

export default Page;
