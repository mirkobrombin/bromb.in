import { ui, defaultLang } from './ui';

export function useTranslations(lang: string) {
    return function t(key: string) {
        // try requested lang, then default, then return the key as last resort
        // (keeps runtime safe when keys are missing)
        // use any to avoid strict TS index issues
        const anyUi = ui as any;
        return (anyUi[lang] && anyUi[lang][key]) ?? (anyUi[defaultLang] && anyUi[defaultLang][key]) ?? key;
    }
}