import { ref, query, orderByKey, limitToFirst, startAfter, get } from "firebase/database";
import { db } from "@/lib/api/firebase";
import { Nanny } from "@/types/nanny";

export type NannyWithId = Nanny & { id: string };

export async function getNannies(lastKey?: string): Promise<NannyWithId[]> {
  // 1. Створи ref на вузол з нянями (як він у тебе називається в Data?)
  // 2. Збери query: orderByKey() і limitToFirst(3);
  //    якщо lastKey передали, додай ще startAfter(lastKey)
  // 3. Виконай запит через get(...)
  // 4. Пройди snapshot.forEach(...) і склади масив { id: child.key, ...child.val() }
  // 5. Поверни масив
}