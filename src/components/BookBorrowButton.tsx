"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { bookBorrow } from "@/lib/actions/book";
import { useRouter } from "next/navigation";
interface Props {
  bookid: string | undefined;
  userid: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}
const BookBorrowButton = ({
  bookid,
  userid,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    setBorrowing(true);
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } else {
      try {
        const result = await bookBorrow({ bookId: bookid!, userId: userid });
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          });
          router.push(`/`);
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setBorrowing(false);
      }
    }
    setBorrowing(false);
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {" "}
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BookBorrowButton;
