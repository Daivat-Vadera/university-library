import BookCard from "./BookCard";
import BorrowedBookCard from "./BorrowedBookCard";

interface props {
  title: string;
  books: Book[];
  containerClassName?: string;
  booksBorrowedEntries:  {
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

const BorrowedBookList = ({ title, books, containerClassName,booksBorrowedEntries }: props) => {
  return (
    <section className={containerClassName}>
      <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>
      <ul className='book-list'>
        {books.map((book,index) => {
          return <BorrowedBookCard key={book.id} {...book} booksBorrowedEntries={booksBorrowedEntries} />;
        })}
      </ul>
    </section>
  );
};

export default BorrowedBookList;
