import React from "react";
import BookCover from "../BookCover";
import { formatDate } from "@/utils/helper";
import BookRowAction from "./BookRowAction";
interface Props extends Book {
  createdAt: Date | null;
}
const BookTableRow = (props: Props) => {
  return (
    <div className="flex flex-row items-center border-b border-light-300">
      <div className=" py-4 px-2 w-5/12">
        <div className="flex flex-row items-center">
          <BookCover
            coverColor={props.bookPrimaryColor}
            coverImage={props.bookImage}
            className="w-9 h-11"
          />
          <h3 className="ml-2 text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans ">
            {props.bookTitle}
          </h3>
        </div>
      </div>
      <div className="py-4 px-2 w-2/12">
        <h4 className="text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans">
          {props.author}
        </h4>
      </div>
      <div className="py-4 px-2 w-2/12">
        <span className="text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans">
          {props.genre}
        </span>
      </div>
      <div className="py-4 px-2 w-2/12">{formatDate(props.createdAt)}</div>
      <div className=" py-4 px-2 w-1/12">
        <BookRowAction bookId={props.id} />
      </div>
    </div>
  );
};

export default BookTableRow;
