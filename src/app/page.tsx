import BbookItem from "@/components/book-item";
import style from "./page.module.css";
import Searchbar from "@/components/searchbar";
//import { AllBooks, RecommendedBooks } from "@/action/booksAction";
import { IBook } from "@/types";
import { Suspense } from "react";
import { delay } from "@/util/delay";
import LoadingPage from "@/components/loading-page";

async function AllBooks() {
  // await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div className="p-2 text-[1rem] ">오류가 발생 했습니다.</div>;
  }
  const allBooks: IBook[] = await response.json();
  return (
    <div>
      {allBooks.length > 0 ? (
        allBooks.map((book) => <BbookItem key={book.id} {...book} />)
      ) : (
        <span className="p-2 text-[1rem] "> No data ...</span>
      )}
    </div>
  );
}

async function RecommendedBooks() {
  // await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div className="p-2 text-[1rem] ">오류가 발생 했습니다.</div>;
  }
  const ramdomBooks: IBook[] = await response.json();
  return (
    <div>
      {ramdomBooks.length > 0 ? (
        ramdomBooks.map((book) => <BbookItem key={book.id} {...book} />)
      ) : (
        <span className="p-2 text-[1rem] ">오류가 발생 했습니다...</span>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Searchbar />
      </Suspense>

      <div className={style.book_container}>
        <section>
          <h3 className="font-bold pb-2">추천 하는 도서</h3>
          <Suspense fallback={<LoadingPage />}>
            <RecommendedBooks />
          </Suspense>
        </section>
        <section>
          <h3 className="font-bold pb-2 pt-2">전체 도서</h3>
          <Suspense fallback={<LoadingPage />}>
            <AllBooks />
          </Suspense>
        </section>
      </div>
    </>
  );
}
