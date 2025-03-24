import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { formatDate } from "@/utils/helper";
import { eq } from "drizzle-orm";
import React from "react";
import BookCover from "../BookCover";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import BookRequestRowStatus from "./BookRequestRowStatus";
import BookReceiptButton from "./BookReceiptButton";

const BookRequestTableRow = async (props: {
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
    <div className='flex flex-row items-center border-b border-light-300'>
      <div className=' py-4 px-2 w-3/12'>
        <div className='flex flex-row items-center'>
          <BookCover
            coverColor={bookDetail.bookPrimaryColor}
            coverImage={bookDetail.bookImage}
            className='max-w-9 h-11'
          />
          <Link href={`/admin/books/${bookDetail.id}`}>
            <h3 className='ml-2 text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans '>
              {bookDetail.bookTitle}
            </h3>
          </Link>
        </div>
      </div>
      <div className=' py-4 px-2 w-3/12'>
        <div className='user flex flex-row items-center'>
          <Avatar>
            <AvatarFallback>
              {getInitials(userDetail.fullName || "IN")}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col max-md:hidden pl-2'>
            <p className='font-semibold text-dark-200'>{userDetail.fullName}</p>
            <p className='text-xs text-light-500'>{userDetail.email}</p>
          </div>
        </div>
      </div>
      <div className='py-4 px-2 w-2/12'>
        <BookRequestRowStatus status={props.status} id={props.id} />

        <span className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans'></span>
      </div>
      <div className='py-4 px-2 w-2/12'>
        <span className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans'>
          {formatDate(new Date(props.borrowDate))}
        </span>
      </div>
      <div className=' py-4 px-2 w-2/12'>
        <span
          className={`${props.returnDate != null && new Date(props.dueDate) > new Date(props.returnDate) && "text-green-400"} ${props.returnDate != null && new Date(props.dueDate) < new Date(props.returnDate) && "text-red-400"} text-base font-semibold leading-5 font-ibm-plex-sans`}
        >
          {props.returnDate != null
            ? formatDate(new Date(props.returnDate))
            : "Not Returned"}
        </span>
      </div>
      <div className=' py-4 px-2 w-2/12'>
        <span className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans'>
          {formatDate(new Date(props.dueDate))}
        </span>
      </div>
      <div className=' py-4 px-2 w-2/12'>
        <BookReceiptButton bookDetail={bookDetail} borrowDetail={props} />
      </div>
    </div>
  );
};

export default BookRequestTableRow;
