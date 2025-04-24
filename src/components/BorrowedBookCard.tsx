"use client";
import { cn } from "@/lib/utils";
import { differenceInDays, parseISO } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookCover from "./BookCover";
import { FastAverageColor } from "fast-average-color";
import { formatDate } from "@/utils/helper";
import BorrowedBookCardReceiptButton from "./BorrowedBookCardReceiptButton";
interface props extends Book {
  booksBorrowedEntries: {
    id: string;
    status: "BORROWED" | "RETURNED" | "OVERDUE";
    createdAt: Date | null;
    userId: string;
    bookId: string;
    borrowDate: Date;
    dueDate: string;
    returnDate: string | null;
  }[];
}
const BorrowedBookCard = ({
  id,
  bookTitle,
  author,
  rating,
  genre,
  description,
  totalNoOfBooks,
  availableCopies,
  bookVideo,
  bookSummary,
  createdAt,
  hideBook,
  bookPrimaryColor,
  bookImage,
  booksBorrowedEntries,
}: props) => {
  // console.log(booksBorrowedEntries);
  const borrowedBook = booksBorrowedEntries.filter(
    (entry) => entry.bookId === id
  );

  const isLoanedBook = true;
  const [color, setColor] = useState("");
  const [lightenedColor, setLightenedColor] = useState("");
  // Function to lighten a HEX color
  const lightenColor = (hex: string, percent: number) => {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");

    // Convert HEX to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Lighten the RGB values
    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    // Convert RGB back to HEX
    const toHex = (value: number) =>
      Math.round(value).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();

    img.crossOrigin = "Anonymous"; // Handle CORS if needed
    img.src = "https://ik.imagekit.io/vjhclc3j3/" + bookImage;

    img.onload = () => {
      fac
        .getColorAsync(img)
        .then((result) => {
          const hexColor = result.hex;
          setColor(hexColor);

          // Lighten the color by 20% (you can adjust the percentage)
          const lighterColor = lightenColor(hexColor, 0.7);
          setLightenedColor(lighterColor);
        })
        .catch(console.error);
    };

    return () => {
      img.onload = null; // Cleanup
    };
  }, [bookImage]);
  const todaysDate = parseISO(new Date().toISOString());
  const endDate = parseISO(borrowedBook[0].dueDate);
  const difference = differenceInDays(endDate, todaysDate);
  console.log(difference);

  return (
    <div className='w-full sm:w-2/5 lg:w-[45%] xl:w-1/3 p-5 rounded-2xl bg-[linear-gradient(180deg,_#12141D_20%,_#12151F_100%)] shadow-[0_0px_70px_0px_rgba(0,0,0,0.2)]'>
      <div
        className='w-full py-6 rounded-2xl'
        style={{ backgroundColor: lightenedColor }}
      >
        <BookCover
          coverColor={bookPrimaryColor}
          coverImage={bookImage}
          className='mx-auto'
        />
      </div>
      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className='book-title'>{bookTitle}</p>
        <p className='book-genre'>{genre}</p>
      </div>
      {isLoanedBook && (
        <div className='mt-3 w-full'>
          <div className='book-loaned'>
            <p>
              <span className='inline-block align-bottom'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.5 18.75C3.09 18.75 2.75 18.41 2.75 18V7C2.75 2.59 4.09 1.25 8.5 1.25H15.5C19.91 1.25 21.25 2.59 21.25 7V17C21.25 17.16 21.25 17.31 21.24 17.47C21.21 17.88 20.84 18.2 20.44 18.17C20.03 18.14 19.71 17.78 19.74 17.37C19.75 17.25 19.75 17.12 19.75 17V7C19.75 3.43 19.08 2.75 15.5 2.75H8.5C4.92 2.75 4.25 3.43 4.25 7V18C4.25 18.41 3.91 18.75 3.5 18.75Z'
                    fill='#A5CFE7'
                  />
                  <path
                    d='M17 22.75H7C4.66 22.75 2.75 20.84 2.75 18.5V17.85C2.75 15.86 4.37 14.25 6.35 14.25H20.5C20.91 14.25 21.25 14.59 21.25 15V18.5C21.25 20.84 19.34 22.75 17 22.75ZM6.35 15.75C5.19 15.75 4.25 16.69 4.25 17.85V18.5C4.25 20.02 5.48 21.25 7 21.25H17C18.52 21.25 19.75 20.02 19.75 18.5V15.75H6.35Z'
                    fill='#A5CFE7'
                  />
                  <path
                    d='M16 7.75H8C7.59 7.75 7.25 7.41 7.25 7C7.25 6.59 7.59 6.25 8 6.25H16C16.41 6.25 16.75 6.59 16.75 7C16.75 7.41 16.41 7.75 16 7.75Z'
                    fill='#A5CFE7'
                  />
                  <path
                    d='M13 11.25H8C7.59 11.25 7.25 10.91 7.25 10.5C7.25 10.09 7.59 9.75 8 9.75H13C13.41 9.75 13.75 10.09 13.75 10.5C13.75 10.91 13.41 11.25 13 11.25Z'
                    fill='#A5CFE7'
                  />
                </svg>
              </span>
              <span className='text-light-100 ml-2'>
                Borrowed on {formatDate(borrowedBook[0].borrowDate)}
              </span>
            </p>
            <div className='flex flex-row justify-between mt-3 w-full'>
              {difference < 0 && (
                <p className='text-[#FF6C6F]'>
                  <span className='inline-block align-bottom mr-3'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z'
                        fill='#FF6C6F'
                      />
                      <path
                        d='M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z'
                        fill='#FF6C6F'
                      />
                      <path
                        d='M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z'
                        fill='#FF6C6F'
                      />
                    </svg>
                  </span>
                  Overdue Return
                </p>
              )}
              {difference >= 0 && (
                <p className='text-light-100'>
                  <span className='inline-block align-bottom mr-3'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5.0625 2.25V3.9375M12.9375 2.25V3.9375M2.25 14.0625V5.625C2.25 5.17745 2.42779 4.74823 2.74426 4.43176C3.06072 4.11529 3.48995 3.9375 3.9375 3.9375H14.0625C14.5101 3.9375 14.9393 4.11529 15.2557 4.43176C15.5722 4.74823 15.75 5.17745 15.75 5.625V14.0625M2.25 14.0625C2.25 14.5101 2.42779 14.9393 2.74426 15.2557C3.06072 15.5722 3.48995 15.75 3.9375 15.75H14.0625C14.5101 15.75 14.9393 15.5722 15.2557 15.2557C15.5722 14.9393 15.75 14.5101 15.75 14.0625M2.25 14.0625V8.4375C2.25 7.98995 2.42779 7.56073 2.74426 7.24426C3.06072 6.92779 3.48995 6.75 3.9375 6.75H14.0625C14.5101 6.75 14.9393 6.92779 15.2557 7.24426C15.5722 7.56073 15.75 7.98995 15.75 8.4375V14.0625'
                        stroke='#E7C9A5'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </span>
                  {difference} Day(s) left to due
                </p>
              )}

              <BorrowedBookCardReceiptButton
                bookDetail={{
                  bookTitle: bookTitle,
                  id: id,
                  author: author,
                  genre: genre,
                  rating: rating,
                  bookImage: bookImage,
                  bookPrimaryColor: bookPrimaryColor,
                  description: description,
                  totalNoOfBooks: totalNoOfBooks,
                  availableCopies: availableCopies,
                  bookVideo: bookVideo,
                  bookSummary: bookSummary,
                  createdAt: createdAt,
                  hideBook: hideBook,
                }}
                borrowDetail={{
                  id: borrowedBook[0].id,
                  status: borrowedBook[0].status,
                  createdAt: borrowedBook[0].createdAt,
                  userId: borrowedBook[0].userId,
                  bookId: borrowedBook[0].bookId,
                  borrowDate: borrowedBook[0].borrowDate,
                  dueDate: borrowedBook[0].dueDate,
                  returnDate: borrowedBook[0].returnDate,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBookCard;
