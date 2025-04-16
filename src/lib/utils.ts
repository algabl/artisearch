import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function merges class names together, removing duplicates and ensuring that
 * the final string is a valid class name.
 * @param inputs - Class names to be merged.
 * @returns A single string containing all unique class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
