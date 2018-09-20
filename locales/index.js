import ReactNative, { AsyncStorage } from 'react-native'
import I18n from 'react-native-i18n'

import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import ja from './ja.json'
import ru from './ru.json'
import zh from './zh.json'

I18n.fallbacks = true

I18n.translations = {
  de,
  en,
  es,
  fr,
  ja,
  ru,
  zh
}

I18n.defaultSeparator = '/'

export default I18n
