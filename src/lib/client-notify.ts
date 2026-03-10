'use client';

import { toast } from 'sonner';

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
}

export function notifyInfo(message: string, description?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, description ?? '');
  }
  toast.info(message, { description });
}

export function notifySuccess(message: string, description?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, description ?? '');
  }
  toast.success(message, { description });
}

export function notifyError(error: unknown, fallbackMessage: string, description?: string): string {
  const message = getErrorMessage(error, fallbackMessage);
  console.error(message, error);
  toast.error(message, { description });
  return message;
}
