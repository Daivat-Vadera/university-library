"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import BookReceipt from "../receipt/BookReceipt";
interface Props {
  bookDetail: {
    bookTitle: string;
    id: string;
    author: string;
    genre: string;
    rating: number;
    bookImage: string;
    bookPrimaryColor: string;
    description: string;
    totalNoOfBooks: number;
    availableCopies: number;
    bookVideo: string;
    bookSummary: string;
    createdAt: Date | null;
    hideBook: boolean;
  };
  borrowDetail: {
    id: string;
    status: "BORROWED" | "RETURNED" | "OVERDUE" | null;
    createdAt: Date | null;
    userId: string;
    bookId: string;
    borrowDate: Date;
    dueDate: string;
    returnDate: string | null;
  };
}
const BorrowRequestItemReceiptButton = ({
  bookDetail,
  borrowDetail,
}: Props) => {
  const receiptData = {
    receiptId: borrowDetail.id,
    dateIssued: new Date(bookDetail.createdAt!).toLocaleDateString(),
    bookTitle: bookDetail.bookTitle,
    bookAuthor: bookDetail.author,
    bookGenre: bookDetail.genre,
    borrowDate: new Date(borrowDetail.borrowDate).toLocaleDateString(),
    dueDate: borrowDetail.dueDate,
    duration: "7 Days",
  };
  return (
    <PDFDownloadLink
      document={<BookReceipt {...receiptData} />}
      fileName={`receipt-${receiptData.receiptId}.pdf`}
      className='inline'
    >
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
    </PDFDownloadLink>
  );
};

export default BorrowRequestItemReceiptButton;
