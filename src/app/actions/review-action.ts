"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  // console.log(bookId, content, author);

  if (!bookId || !content || !author) {
    // return;
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }),
    });
    if (!resposne.ok) {
      throw new Error(resposne.statusText);
    }

    // revalidatePath(`/book/${bookId}`); // 경로를 재검증 (다시 생성)
    revalidateTag(`review-${bookId}`); // 경로를 재검증 (해당 태그가 있는 곳만 캐시 삭제 하고 재검증증)
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패 했습니다 : ${err}`,
    };
  }
}
