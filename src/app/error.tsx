"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    console.error(error.message);
  }, [error]);

  return (
    <div>
      오류가 발생 했습니다{" "}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지 에서 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
