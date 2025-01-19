import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  const convertToStartLocaleDate = (date: Date) => {
  const localOffset = new Date().getTimezoneOffset();
  const localOffsetMillis = 60 * 1000 * localOffset;
  const localMidnight = new Date(date.getTime() + localOffsetMillis);
  return localMidnight;
}

export  const convertToLocaleDateNumber = (date: Date) => {
  const localOffset = new Date().getTimezoneOffset();
  const localOffsetMillis = 60 * 1000 * localOffset;
  const localMidnight = new Date(date.getTime() + localOffsetMillis);
  return localMidnight.getMilliseconds();
}
