"use client";

import { useEffect, useRef, useState } from "react";
import { NanniesFilter } from "@/types/nanny";
import css from "./Filters.module.css";

const OPTIONS: { value: NanniesFilter; label: string }[] = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-low", label: "Less than 10$" },
  { value: "price-high", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not-popular", label: "Not popular" },
  { value: "all", label: "Show all" },
];

interface FiltersProps {
  value: NanniesFilter;
  onChange: (value: NanniesFilter) => void;
}

export default function Filters({ value, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = OPTIONS.find((option) => option.value === value)?.label;

  const handleSelect = (next: NanniesFilter) => {
    onChange(next);
    setIsOpen(false);
  };

  return (
    <div className={css.root} ref={rootRef}>
      <span id="filters-label" className={css.label}>
        Filters
      </span>
      <button
        type="button"
        className={css.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-labelledby="filters-label"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentLabel}
        <svg width="20" height="20" aria-hidden="true">
          <use href="/sprite.svg#icon-chevron" />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.list}>
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`${css.option} ${option.value === value ? css.optionActive : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}