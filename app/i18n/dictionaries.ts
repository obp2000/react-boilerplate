import enTranslation from './locales/en/translation.json'
import ruTranslation from './locales/ru/translation.json'

export type Translation = typeof enTranslation | typeof ruTranslation
export type Dict = Record<string, () => Promise<Translation>>
export type ModelNames = Pick<Translation, 'customers' | 'products' | 'orders'>

const dictionaries: Dict = {
  en: () => import('./locales/en/translation.json').then((module) => module.default),
  ru: () => import('./locales/ru/translation.json').then((module) => module.default),
}

export async function getDictionary(lng: string) {
  return dictionaries[lng]()
}
