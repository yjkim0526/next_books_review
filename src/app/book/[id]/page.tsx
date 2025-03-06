import { notFound } from "next/navigation";
import style from "./[id].module.css";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);

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
    <div>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt="" />
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
