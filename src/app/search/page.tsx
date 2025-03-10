import BbookItem from "@/components/book-item";
import LoadingPage from "@/components/loading-page";
import Searchbar from "@/components/searchbar";
import { IBook } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  // await delay(1500); // 1.5초 동안 지연 (테스트)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return (
      <div>
        <Suspense fallback={<LoadingPage />}>
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  // 동적 메타 데이터
  const { q } = await searchParams;
  return {
    title: `${q} : 책 검색 `,
    description: `${q}의 책 검색 결과 `,
    openGraph: {
      title: `${q} : 책 검색 `,
      description: `${q}의 책 검색 결과 `,
      images: ["/book_icon.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
  //searchParams: { q?: string };
}) {
  console.log(">> searchParams -----", searchParams);
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={<LoadingPage />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
