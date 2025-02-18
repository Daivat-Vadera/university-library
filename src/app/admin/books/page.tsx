import { Button } from "@/components/ui/button";
import Link from "next/link";
import AllBookTable from "@/components/admin/AllBookTable";
const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="font-semibold text-xl">All Books</h2>
        <Button asChild className="bg-primary-admin">
          <Link className="text-white" href={"/admin/books/new"}>
            + Add a New Book
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <AllBookTable />
      </div>
    </section>
  );
};

export default Page;
