import { ui, defaultLang } from './ui';

export function useTranslations(lang: string) {
    return function t(key: string) {
        const anyUi = ui as any;
        return (anyUi[lang] && anyUi[lang][key]) ?? (anyUi[defaultLang] && anyUi[defaultLang][key]) ?? key;
    }
}