"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Filters from "@/components/Filters/Filters";
import NannyCard from "@/components/NannyCard/NannyCard";
import { getNannies } from "@/services/nannies";
import { NanniesCursor, NanniesFilter } from "@/types/nanny";
import css from "./NanniesList.module.css";

export default function NanniesList() {
  const [filter, setFilter] = useState<NanniesFilter>("name-asc");

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["nannies", filter],
    queryFn: ({ pageParam }) => getNannies(filter, pageParam),
    initialPageParam: undefined as NanniesCursor | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const nannies = data?.pages.flatMap((page) => page.nannies) ?? [];

return (
  <section className={css.section}>
    <Filters value={filter} onChange={setFilter} />

    {isPending && <p className={css.message}>Loading...</p>}

    {isError && (
      <p className={css.message}>Something went wrong. Please try again.</p>
    )}

    {!isPending && !isError && nannies.length === 0 && (
      <p className={css.message}>No nannies found.</p>
    )}

    {nannies.length > 0 && (
      <ul className={css.list}>
        {nannies.map((nanny) => (
          <li key={nanny.id}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>
    )}

    {hasNextPage && (
      <button
        type="button"
        className={css.loadMore}
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    )}
  </section>
);
}