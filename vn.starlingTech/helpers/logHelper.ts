import Reactotron from 'reactotron-react-native'

import settings from '../config/settings'

function logThis(...str: any) {
  if (settings.REACTOTRON_ENABLE) {
    Reactotron.log(str)
  } else {
    console.log(' --------- --------------- -------------- ----------')
    console.log(...str)
    console.log(' --------- --------------- -------------- ----------')
  }
}

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 *
 * @memberof AppComponent
 */
export const consoleLog = (...str1: any) => {
  // console.log(settings.FOR_DEV, 'logEnabled');
  if (settings.FOR_DEV) {
    logThis(...str1)
  }
}
