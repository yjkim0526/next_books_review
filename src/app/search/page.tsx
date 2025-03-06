import BbookItem from "@/components/book-item";
import Searchbar from "@/components/searchbar";
import { IBook } from "@/types";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return (
      <div>
        <Suspense fallback={<div>Loading …</div>}>
          <Searchbar />
        </Suspense>

        <div>에러 발생...</div>
      </div>
    );
  }
  const searchBooks: IBook[] = await response.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BbookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
