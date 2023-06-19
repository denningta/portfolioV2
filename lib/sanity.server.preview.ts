import { draftMode } from 'next/headers'

export function getPreviewToken(): string | null | undefined {
  return (draftMode() as { token?: string | null })?.token
}
