import type { IBook } from "@/types";
import Link from "next/link";

export default function BbookItem(book: IBook) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="flex gap-4 px-5 py-3 border border-gray-100"
    >
      <img src={book.coverImgUrl} className="w-20" alt="img" />
      <div className="text-[1rem]">
        <div className="mb-2 font-bold">{book.title}</div>
        <div className="text-slate-500">{book.subTitle}</div>
        <br />
        <div className="text-slate-500 text-[0.9rem]">
          {book.author} | {book.publisher}
        </div>
      </div>
    </Link>
  );
}
