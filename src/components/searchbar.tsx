"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  // const q = router.query.q (Page Router )
  const q = searchParams.get("q");

  useEffect(() => {
    setSearchInput(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSubmit = () => {
    if (q === searchInput) return;
    console.log(">> Searchbar onSubmit --- :", searchInput);
    router.push(`/search?q=${searchInput}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex w-full m-auto gap-1 mb-5">
      <input
        className="p-2 border border-slate-200 rounded w-full"
        placeholder="검색어를 입력하세요"
        value={searchInput}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onSubmit}
        className="p-2 bg-blue-500 text-white rounded w-16 cursor-pointer"
      >
        검색
      </button>
    </div>
  );
}
