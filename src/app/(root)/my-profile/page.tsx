import React from "react";
import { signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const page = () => {
  return (
    <>
      <form
        className="mb-10"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList title=" Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default page;
