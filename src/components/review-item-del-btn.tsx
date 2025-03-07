"use client";

import { deleteReviewAction } from "@/app/actions/delete-review-action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDelBtn({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        "..."
      ) : (
        <div
          className="border border-slate-200 rounded px-1"
          onClick={() => formRef.current?.requestSubmit()}
        >
          삭제
        </div>
      )}
    </form>
  );
}
