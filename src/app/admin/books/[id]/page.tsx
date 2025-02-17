import BookCoverWithDynamicBG from "@/components/admin/BookCoverWithDynamicBG";
import BookCover from "@/components/BookCover";
import BookVideo from "@/components/BookVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { formatDate } from "@/utils/helper";
import { eq } from "drizzle-orm";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <div className="w-full overflow-hidden">
        <div className="flex flex-row gap-10 items-center">
          <BookCoverWithDynamicBG
            coverColor={bookDetails.bookPrimaryColor}
            coverImage={bookDetails.bookImage}
          />
          <div className="flex flex-col gap-4">
            <p className="flex-row flex gap-2 text-[#64748B]">
              Created at:
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 2V5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.5 9.08997H20.5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6947 13.7H15.7037"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6947 16.7H15.7037"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.9955 13.7H12.0045"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.9955 16.7H12.0045"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.29431 13.7H8.30329"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.29431 16.7H8.30329"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="text-base font-normal font-ibm-plex-sans text-dark-200">
                {formatDate(bookDetails.createdAt)}
              </span>
            </p>
            <h2 className="text-dark-400 text-2xl font-semibold font-ibm-plex-sans">
              {bookDetails.bookTitle}
            </h2>
            <h3 className="text-dark-200 text-lg font-semibold font-ibm-plex-sans">
              By{bookDetails.author}
            </h3>
            <p className="text-[#64748B] text-base font-normal">
              {bookDetails.genre}
            </p>
            <Button asChild className="bg-primary-admin text-white">
              <Link className="text-white" href={`/admin/books/edit/${id}`}>
                Edit Book
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 flex flex-row gap-10">
          <div className="w-8/12">
            <h3 className="text-base font-semibold text-dark-400 font-ibm-plex-sans leading-5">
              Summary
            </h3>
            <div className="text-[#64748B] leading-6 text-base font-normal mt-4">
              {bookDetails.bookSummary.split("\n").map((paragraph, index) => (
                <p className="mt-4" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-4/12">
            <h3 className="text-base font-semibold text-dark-400 font-ibm-plex-sans leading-5 mb-4">
              Video
            </h3>
            <BookVideo videoUrl={bookDetails.bookVideo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
