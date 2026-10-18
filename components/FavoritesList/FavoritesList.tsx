"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Filters from "@/components/Filters/Filters";
import NannyCard from "@/components/NannyCard/NannyCard";
import { useFavorites } from "@/hooks/useFavorites";
import { PAGE_SIZE, PRICE_LIMIT } from "@/services/nannies";
import { NanniesFilter, NannyWithId } from "@/types/nanny";
import css from "../NanniesList/NanniesList.module.css";

function applyFilter(items: NannyWithId[], filter: NanniesFilter) {
  switch (filter) {
    case "name-asc":
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    case "price-low":
      return items
        .filter((item) => item.price_per_hour < PRICE_LIMIT)
        .sort((a, b) => a.price_per_hour - b.price_per_hour);
    case "price-high":
      return items
        .filter((item) => item.price_per_hour > PRICE_LIMIT)
        .sort((a, b) => a.price_per_hour - b.price_per_hour);
    case "popular":
      return [...items].sort((a, b) => b.rating - a.rating);
    case "not-popular":
      return [...items].sort((a, b) => a.rating - b.rating);
    default:
      return items;
  }
}

export default function FavoritesList() {
  const { favorites, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState<NanniesFilter>("name-asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => applyFilter(favorites, filter),
    [favorites, filter],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleFilterChange = (value: NanniesFilter) => {
    setFilter(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className={css.section}>
      <Filters value={filter} onChange={handleFilterChange} />

      {favorites.length === 0 && (
        <p className={css.message}>
          You have no favorite nannies yet. <Link href="/nannies">Find one</Link>
        </p>
      )}

      {favorites.length > 0 && filtered.length === 0 && (
        <p className={css.message}>No nannies found.</p>
      )}

      {visible.length > 0 && (
        <ul className={css.list}>
          {visible.map((nanny) => (
            <li key={nanny.id}>
              <NannyCard
                nanny={nanny}
                isFavorite
                onToggleFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
        >
          Load more
        </button>
      )}
    </section>
  );
}