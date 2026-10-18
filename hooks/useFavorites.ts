"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { NannyWithId } from "@/types/nanny";

const FAVORITES_EVENT = "favorites-change";

function subscribe(callback: () => void) {
  window.addEventListener(FAVORITES_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(FAVORITES_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useFavorites() {
  const { user } = useAuth();
  const storageKey = user ? `favorites:${user.uid}` : null;

  const saved = useSyncExternalStore(
    subscribe,
    () => (storageKey ? localStorage.getItem(storageKey) : null),
    () => null,
  );

  const favorites = useMemo<NannyWithId[]>(() => {
    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }, [saved]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (nanny: NannyWithId) => {
      if (!storageKey) return;

      const next = favorites.some((item) => item.id === nanny.id)
        ? favorites.filter((item) => item.id !== nanny.id)
        : [...favorites, nanny];

      localStorage.setItem(storageKey, JSON.stringify(next));
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    },
    [favorites, storageKey],
  );

  return { favorites, isFavorite, toggleFavorite };
}