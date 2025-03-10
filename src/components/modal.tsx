"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        //모델의 배경 클릭 -> 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className="mx-auto w-[80%] p-4 mt-5 rounded border-0 items-center"
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
