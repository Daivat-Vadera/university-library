import React from "react";
import { auth, signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq, inArray } from "drizzle-orm";
import BorrowedBookList from "@/components/BorrowedBookList";
import { getInitials } from "@/lib/utils";
import UniversityCard from "@/components/UniversityCard";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const user = session?.user;

  if (!userId || !user) return redirect("/");
  const [userDetail] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  const booksBorrowedEntries = await db
    .select()
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
      <div className='flex flex-row mb-6 gap-10 flex-wrap lg:flex-nowrap '>
        <div className="w-full lg:w-2/5">
          <div className='px-10 pb-10 pt-28 rounded-3xl id-card'>
            <div className='badge'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='59'
                height='88'
                viewBox='0 0 59 88'
                fill='none'
              >
                <path
                  d='M0 0H59V58.5C59 74.7924 45.7924 88 29.5 88C13.2076 88 0 74.7924 0 58.5V0Z'
                  fill='#464F6F'
                />
                <rect
                  x='9'
                  y='59'
                  width='40'
                  height='10'
                  rx='5'
                  fill='#1E2230'
                />
              </svg>
            </div>
            <div className='user flex flex-row items-center'>
              <div className='size-20 text-3xl bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold'>
                {getInitials(user.name || "IN")}
              </div>
              <div className='flex flex-col max-md:hidden pl-2'>
                <p className='font-semibold text-2xl text-white'>{user.name}</p>
                <p className='text-lg text-white'>{user.email}</p>
              </div>
            </div>
            <div>
              <p className='text-lg text-light-100 pt-8'>University</p>
              <p className='text-2xl font-semibold text-white'>Book Wise</p>
            </div>
            <div>
              <p className='text-lg text-light-100 pt-8'>Student ID</p>
              <p className='text-2xl font-semibold text-white'>
                {userDetail.universityId}
              </p>
            </div>
            <div className='pt-10'>
              <UniversityCard path={userDetail.universityCard} />
            </div>
            <div className="text-right">
              <form
                className='mb-10 pt-8'
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button>Logout</Button>
              </form>
            </div>
          </div>
        </div>

        {booksBorrowed.length > 0 && (
          <BorrowedBookList 
          title='Borrowed Books' 
          books={booksBorrowed} 
          containerClassName="w-full lg:w-3/5"
          booksBorrowedEntries={booksBorrowedEntries}
          />
        )}
      </div>
    </>
  );
};

export default page;
