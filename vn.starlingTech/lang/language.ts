import AsyncStorage from '@react-native-async-storage/async-storage'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
// import {getLocales} from 'react-native-localize';
// import en from '../lang/en.json';
// import vi from '../lang/vi.json';
import { LanguageType } from '@vn.starlingTech/lang/type'

export type LanguageCode = 'vi' | 'en'

let langCode: LanguageCode = settings.LANGUAGE

export const getString = (lang?: LanguageCode): LanguageType => {
  const tmpLangCode = lang ? lang : langCode
  return tmpLangCode === 'en'
    ? require('@vn.starlingTech/lang/en.json')
    : require('@vn.starlingTech/lang/vi.json')
}

export const initLanguage = async (): Promise<LanguageType> => {
  let lang = await AsyncStorage.getItem(AppConstants.SESSION.LANGUAGE)
  // if (!lang) {
  //get device's lang
  // const locale = getLocales();
  // lang = locale[0].languageCode;
  // }
  // consoleLog(lang, 'lang---');
  lang = lang ? lang : 'en'

  langCode = lang as LanguageCode

  //default English (local) if lang(s) not available
  return lang === 'en' ? require('../lang/en.json') : require('../lang/vi.json')
}

export async function syncLanguage(pLanguage: LanguageCode = 'vi') {
  await AsyncStorage.setItem(AppConstants.SESSION.LANGUAGE, pLanguage)
}
