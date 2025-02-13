import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const userId = session?.user?.id;
  if(!userId) return redirect("/");
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview
        {...bookDetails}
        bookid={bookDetails.id}
        userid={userId}
      />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.bookVideo} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.bookSummary.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
