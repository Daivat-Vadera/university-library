import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import BookTableRow from "./BookTableRow";

const AllBookTable = async () => {
  const allBooks = await db.select().from(books);

  return (
    <section>
      <div className="bg-light-300 flex flex-row">
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-5/12">
          Book Title
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          Author
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          Genre
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          Date Created
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12">
          Action
        </div>
      </div>
      {allBooks.map((book) => {
        return <BookTableRow key={book.id} {...book} />;
      })}
    </section>
  );
};

export default AllBookTable;
