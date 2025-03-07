import { notFound } from "next/navigation";
import style from "./[id].module.css";
import { IReview } from "@/types";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";
import Image from "next/image";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const detailBook = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    detailBook;

  return (
    <div className="mb-2 flex flex-col gap-4">
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={200}
          height={80}
          alt={`도서 ${title} 표지`}
        />
      </div>
      <div className="mt-8">
        <div className="font-bold text-xl">{title}</div>
        <div className="mt-4 text-gray-800">{subTitle}</div>
        <div className="mt-4 text-gray-800">
          {author} | {publisher}
        </div>
        <div className="mt-4 bg-slate-50 p-4 leading-7 whitespace-pre-line">
          {description}
        </div>
      </div>
    </div>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: IReview[] = await response.json();
  // console.log(reviews);

  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
