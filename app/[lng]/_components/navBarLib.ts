import type { Translation, ModelNames } from "@/app/i18n/dictionaries"

export function isActiveLink({
  href,
  path,
  pathname
}: {
  href: string
  path: string
  pathname: string
}) {
  return path === '' ? pathname === href : pathname.startsWith(href)
}

export function navLinkLabel({
  dict,
  label
}: {
  dict: Translation
  label: string
}) {
  return dict[label as keyof ModelNames].plural ||
    dict[label as keyof Translation] as string
}
