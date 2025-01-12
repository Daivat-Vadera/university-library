import BookCard from "./BookCard";

interface props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">Popular books</h2>
      <ul className="book-list">
        {books.map((book) => {
          return <BookCard key={book.title} {...book} />;
        })}
      </ul>
    </section>
  );
};

export default BookList;
