import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function setDataAttribute(
  element: HTMLElement,
  attribute: string,
  value: string
) {
  element.setAttribute(`data-${attribute}`, value);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
    : "http://localhost:3010";
}
