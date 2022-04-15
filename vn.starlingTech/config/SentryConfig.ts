import * as Sentry from '@sentry/react-native'
import settings from '@vn.starlingTech/config/settings'
if (settings.SENTRY) {
  Sentry.init({
    dsn: settings.SENTRY_DNS,
  })
}
