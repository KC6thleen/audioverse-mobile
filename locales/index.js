import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import I18n from 'i18n-js'

import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import ja from './ja.json'
import ru from './ru.json'
import zh from './zh.json'

const translations = {
  de,
  en,
  es,
  fr,
  ja,
  ru,
  zh
}

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false }

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
    fallback

  // update layout direction
  I18nManager.forceRTL(isRTL)

  // set i18n-js config
  I18n.translations = translations
  I18n.locale = languageTag
}

setI18nConfig()

export default I18n
