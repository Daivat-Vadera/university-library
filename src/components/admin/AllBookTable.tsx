import BookTableRow from "./BookTableRow";
import { getBooks } from "@/lib/admin/actions/book";
import Pagination from "./Pagination";

const AllBookTable = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const allBooks = await getBooks({ page });

  return (
    <>
      <section>
        <div className='bg-light-300 flex flex-row'>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-5/12'>
            Book Title
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Author
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Genre
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Date Created
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12'>
            Action
          </div>
        </div>
        {allBooks.data.map((book: Book) => {
          return <BookTableRow key={book.id} {...book} />;
        })}
      </section>
      <div className='mt-5 w-full flex flex-row justify-end gap-3'>
        <Pagination hasNextPage={allBooks.metaData?.hasNextPage!} />
      </div>
    </>
  );
};

export default AllBookTable;
