import { CommenList } from "@/types/Region";

export default function mergePageList<T>(arr: CommenList<T>[]) {
  let a: T[] = [];
  arr.forEach(item => {
    a.push(...item.items);
  })
  return a;
}