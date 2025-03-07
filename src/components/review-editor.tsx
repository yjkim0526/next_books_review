"use client";

import { createReviewAction } from "@/app/actions/review-action";
import { useActionState, useEffect } from "react";

export function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <div className="mt-10 mb-10 w-[100%]">
      {/* <form action={createReviewAction}> */}
      <form action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          className="w-full h-20 border border-slate-300 rounded p-2 text-sm text-slate-500"
          name="content"
          placeholder="리뷰 내용"
          required
        />
        <div className="pt-1 flex gap-1 justify-end">
          <input
            disabled={isPending}
            className="border  border-slate-300 rounded p-2 text-sm text-slate-500"
            name="author"
            placeholder="작성자"
            required
          />
          <button
            disabled={isPending}
            className=" w-28 bg-slate-500 text-white p-2 rounded cursor-pointer"
            type="submit"
          >
            <span className="text-sm ">{isPending ? "..." : "리뷰등록"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
