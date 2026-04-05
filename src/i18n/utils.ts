import { ui, defaultLang } from './ui';

type Language = keyof typeof ui;
type TranslationKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: Language | string) {
    return function t(key: TranslationKey | string): string {
        const safeKey = key as TranslationKey;
        const safeLang = lang as Language;
        
        return ui[safeLang]?.[safeKey] ?? ui[defaultLang][safeKey] ?? key;
    }
}