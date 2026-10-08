import { ref, query, orderByKey, limitToFirst, startAfter, get } from "firebase/database";
import { db } from "@/lib/api/firebase";
import { Nanny } from "@/types/nanny";

export type NannyWithId = Nanny & { id: string };

export async function getNannies(lastKey?: string): Promise<NannyWithId[]> {
  const nanniesRef = ref(db, "babysitters");

  const nanniesQuery = lastKey
    ? query(nanniesRef, orderByKey(), startAfter(lastKey), limitToFirst(3))
    : query(nanniesRef, orderByKey(), limitToFirst(3));

  const snapshot = await get(nanniesQuery);

  const nannies: NannyWithId[] = [];
  snapshot.forEach((child) => {
    nannies.push({ id: child.key as string, ...child.val() });
  });

  return nannies;
}