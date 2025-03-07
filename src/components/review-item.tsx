import { IReview } from "@/types";
import ReviewItemDelBtn from "./review-item-del-btn";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: IReview) {
  return (
    <div className="flex flex-col gap-1 text-slate-700 text-sm mb-4 pb-6 border-b-[1px] border-slate-100">
      <div className="font-bold pl-1">{author}</div>
      <div className="bg-slate-50 rounded p-3">{content}</div>
      <div className="flex gap-4 pl-1">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <button>
          <ReviewItemDelBtn reviewId={id} bookId={bookId} />
        </button>
      </div>
    </div>
  );
}
