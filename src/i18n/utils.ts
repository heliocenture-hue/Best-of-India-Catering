import en from './en.json';
import fr from './fr.json';
import { CONFIG } from '../config';

export type Language = 'fr' | 'en';

export function getTranslations(lang: Language) {
  const raw = lang === 'en' ? en : fr;
  const str = JSON.stringify(raw);

  // Replace placeholders with config values
  const replaced = str
    .replace(/\{SERVICE_AREA_EN\}/g, CONFIG.SERVICE_AREA_EN)
    .replace(/\{SERVICE_AREA_FR\}/g, CONFIG.SERVICE_AREA_FR)
    .replace(/\{REPLY_TIME_EN\}/g, CONFIG.REPLY_TIME_EN)
    .replace(/\{REPLY_TIME_FR\}/g, CONFIG.REPLY_TIME_FR)
    .replace(/\{PHONE_DISPLAY\}/g, CONFIG.PHONE_DISPLAY);

  return JSON.parse(replaced) as typeof en;
}
