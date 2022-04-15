import { AppThemeType } from '@vn.starlingTech/context/AppContext'
import { LanguageCode } from '@vn.starlingTech/lang/language'

const FOR_DEV = false
const CODE_PUSH = !FOR_DEV && true

const REACTOTRON_ENABLE = FOR_DEV

const LANGUAGE: LanguageCode = 'vi'
const THEME: AppThemeType = 'light'
const SENTRY = !FOR_DEV

export default {
  FOR_DEV,
  REACTOTRON_ENABLE,
  CODE_PUSH,
  logSQL: false,
  logAPI: false,
  logAPIHeader: false,
  logAdMob: false,
  timeoutTryAgain: 1000, // time delay after click try again
  numPerPage: 50,
  QUERY_RETRY: 2,
  INTERVAL: 0,
  LANGUAGE,
  versionDev: '1.0.6',
  THEME,
  NETWORK_STATUS: false,
  SENTRY,
  SENTRY_DNS:
    'https://436fba6cd411467992396735e211db5a@o1007874.ingest.sentry.io/6163482',
}
