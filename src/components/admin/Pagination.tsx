"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  hasNextPage: boolean;
}
const Pagination = ({ hasNextPage }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  function handleClick(type: "next" | "prev") {
    const params = new URLSearchParams(searchParams);
    const newPage = type === "next" ? page + 1 : Math.max(1, page - 1);

    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <>
      <Button
        disabled={page === 1}
        onClick={() => handleClick("prev")}
        className={cn(
          "min-h-10 font-semibold text-sm pagination-btn_light",
          page === 1 && "pointer-events-none opacity-50"
        )}
      >
        Pervious
      </Button>
      <Button className='bg-primary-admin text-white'>{page}</Button>
      <Button
        disabled={!hasNextPage}
        className=' min-h-10 font-semibold text-sm pagination-btn_light'
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </>
  );
};

export default Pagination;
