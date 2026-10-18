"use client";

import { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import Filters from "@/components/Filters/Filters";
import Modal from "@/components/Modal/Modal";
import NannyCard from "@/components/NannyCard/NannyCard";
import { useFavorites } from "@/hooks/useFavorites";
import { getNannies } from "@/services/nannies";
import { NanniesCursor, NanniesFilter, NannyWithId } from "@/types/nanny";
import css from "./NanniesList.module.css";

export default function NanniesList() {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState<NanniesFilter>("name-asc");
  const [isWarningOpen, setIsWarningOpen] = useState(false);

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

  const closeWarning = useCallback(() => setIsWarningOpen(false), []);

  const handleToggleFavorite = (nanny: NannyWithId) => {
    if (!user) {
      setIsWarningOpen(true);
      return;
    }

    toggleFavorite(nanny);
  };

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
              <NannyCard
                nanny={nanny}
                isFavorite={isFavorite(nanny.id)}
                onToggleFavorite={handleToggleFavorite}
              />
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

      {isWarningOpen && (
        <Modal onClose={closeWarning}>
          <h2 className={css.warningTitle}>Authorization required</h2>
          <p className={css.warningText}>
            This feature is available only to authorized users. Please log in
            or register to add nannies to your favorites.
          </p>
        </Modal>
      )}
    </section>
  );
}