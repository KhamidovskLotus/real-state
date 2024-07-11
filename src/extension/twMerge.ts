import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  cacheSize: 0,
  prefix: 'tw-',
  separator: '_',
})