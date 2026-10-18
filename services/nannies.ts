import {
  endBefore,
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  orderByKey,
  query,
  QueryConstraint,
  ref,
  startAfter,
} from "firebase/database";
import { db } from "@/lib/api/firebase";
import {
  NanniesCursor,
  NanniesFilter,
  Nanny,
  NannyWithId,
} from "@/types/nanny";

export const PAGE_SIZE = 3;
const PRICE_LIMIT = 10;

type SortField = "name" | "price_per_hour" | "rating";

const FILTERS: Record<
  NanniesFilter,
  { field: SortField | null; isDesc: boolean }
> = {
  "name-asc": { field: "name", isDesc: false },
  "name-desc": { field: "name", isDesc: true },
  "price-low": { field: "price_per_hour", isDesc: false },
  "price-high": { field: "price_per_hour", isDesc: false },
  popular: { field: "rating", isDesc: true },
  "not-popular": { field: "rating", isDesc: false },
  all: { field: null, isDesc: false },
};

export async function getNannies(
  filter: NanniesFilter,
  cursor?: NanniesCursor,
) {
  const { field, isDesc } = FILTERS[filter];
  const take = PAGE_SIZE + 1;

  const constraints: QueryConstraint[] = [
    field ? orderByChild(field) : orderByKey(),
  ];

  if (filter === "price-low") {
    constraints.push(endBefore(PRICE_LIMIT));
  }

  if (cursor) {
    if (!field) {
      constraints.push(startAfter(cursor.key));
    } else if (isDesc) {
      constraints.push(endBefore(cursor.value, cursor.key));
    } else {
      constraints.push(startAfter(cursor.value, cursor.key));
    }
  } else if (filter === "price-high") {
    constraints.push(startAfter(PRICE_LIMIT));
  }

  constraints.push(isDesc ? limitToLast(take) : limitToFirst(take));

  const snapshot = await get(query(ref(db, "babysitters"), ...constraints));
  const items: NannyWithId[] = [];

  snapshot.forEach((child) => {
    items.push({ id: child.key as string, ...(child.val() as Nanny) });
  });

  if (isDesc) {
    items.reverse();
  }

  const nannies = items.slice(0, PAGE_SIZE);
  const last = nannies[nannies.length - 1];

  const nextCursor: NanniesCursor | undefined =
    items.length > PAGE_SIZE && last
      ? { value: field ? last[field] : null, key: last.id }
      : undefined;

  return { nannies, nextCursor };
}