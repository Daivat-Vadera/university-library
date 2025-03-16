import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { formatDate } from "@/utils/helper";
import { eq } from "drizzle-orm";
import React from "react";

import Link from "next/link";

import { getInitials } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


const BorrowRequestItem = async (props: {
  id: string;
  status: "BORROWED" | "RETURNED" | "OVERDUE" | null;
  createdAt: Date | null;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
}) => {
  const [bookDetail] = await db
    .select()
    .from(books)
    .where(eq(books.id, props.bookId))
    .limit(1);
  const [userDetail] = await db
    .select()
    .from(users)
    .where(eq(users.id, props.userId))
    .limit(1);

  return (
    <div className='flex flex-row items-start bg-light-300 rounded-md'>
      <div className=' py-4 px-2 w-2/12'>
        <div className='flex flex-row items-center justify-center'>
          <BookCover
            coverColor={bookDetail.bookPrimaryColor}
            coverImage={bookDetail.bookImage}
            className='max-w-14 h-20'
          />
        </div>
      </div>
      <div className=' py-4 px-2 w-9/12'>
        <div className=''>
          <div>
            <Link href={`/admin/books/${bookDetail.id}`}>
              <h3 className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans '>
                {bookDetail.bookTitle}
              </h3>
            </Link>
            <div className='flex gap-2 items-center text-sm text-[#64748B] leading-6'>
              <span>By {bookDetail.author}</span>
              <span>
                <svg
                  width='4'
                  height='5'
                  viewBox='0 0 4 5'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='2' cy='2.5' r='2' fill='#8C8E98' />
                </svg>
              </span>
              <span>{bookDetail.genre}</span>
            </div>
          </div>
          <div className='flex flex-row items-center mt-2 gap-3'>
            <div className='flex flex-row items-center'>
              <Avatar className='h-6 w-6'>
                <AvatarFallback className='text-xs'>
                  {getInitials(userDetail.fullName || "IN")}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col max-md:hidden pl-2'>
                <p className='text-xs text-dark-200 leading-5'>
                  {userDetail.fullName}
                </p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 2V5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M16 2V5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M3.5 9.08997H20.5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.6947 13.7H15.7037'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.6947 16.7H15.7037'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M11.9955 13.7H12.0045'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M11.9955 16.7H12.0045'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M8.29431 13.7H8.30329'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M8.29431 16.7H8.30329'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </span>
              <span className='text-dark-400 text-sm leading-5 font-ibm-plex-sans'>
                {formatDate(new Date(props.borrowDate))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/12 pt-4'>
        <span className="bg-white rounded-lg p-2 inline-block cursor-pointer">
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z'
              stroke='#292D32'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z'
              stroke='#292D32'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default BorrowRequestItem;
