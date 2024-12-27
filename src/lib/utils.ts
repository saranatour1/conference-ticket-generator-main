import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const processFile = (file: File | null, componentMounted:Ref<boolean>) => {
  return new Promise<string | null>((resolve, reject) => {
    if (!file) {
      resolve(null)
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!componentMounted.value) {
        reject("component unmounted")
        return;
      }
      resolve(reader.result as string);
    }
    reader.onerror = (error) => {
      reject(error)
    }
  });
}