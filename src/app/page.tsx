import BbookItem from "@/components/book-item";
import style from "./page.module.css";
import Searchbar from "@/components/searchbar";
//import { AllBooks, RecommendedBooks } from "@/action/booksAction";
import { IBook } from "@/types";
import { Suspense } from "react";

export const dynamic = "";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정

async function AllBooks() {
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

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading …</div>}>
        <Searchbar />
      </Suspense>

      <div className={style.book_container}>
        <section>
          <h3 className="font-bold pb-2">추천 하는 도서</h3>
          <RecommendedBooks />
        </section>
        <section>
          <h3 className="font-bold pb-2 pt-2">전체 도서</h3>
          <AllBooks />
        </section>
      </div>
    </>
  );
}
