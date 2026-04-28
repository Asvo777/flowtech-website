import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import en from './en.json'
import fr from './fr.json'

type Locale = 'en' | 'fr'
type Dictionary = typeof fr

type I18nContextValue = {
  locale: Locale
  t: Dictionary
  toggleLocale: () => void
}

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr,
}

const STORAGE_KEY = 'flowtech-locale'

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'fr' ? saved : 'fr'
  })

  const toggleLocale = () => {
    setLocale((current) => {
      const next: Locale = current === 'fr' ? 'en' : 'fr'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      toggleLocale,
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }
  return context
}
