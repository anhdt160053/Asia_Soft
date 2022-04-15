import messaging from '@react-native-firebase/messaging'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { showNotification } from '@vn.starlingTech/helpers/messageHelper'
import { ViewStyle } from 'react-native'

// Register background handler
export function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
    consoleLog(remoteMessage, 'setBackgroundMessageHandler')
  })
}

export async function requestUserPermission() {
  if (AppConstants.IS_IOS) {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (!enabled) {
      return false
    } else {
      console.log('Authorization status:', authStatus)
    }
  }
  return true
}

export async function getFcmToken() {
  // if (AppConstants.IS_IOS) {
  //   await messaging().registerDeviceForRemoteMessages();
  // }
  return messaging().getToken()
}

export function onForegroundMessage(onPress: () => void, style?: ViewStyle) {
  return messaging().onMessage(async (remoteMessage) => {
    consoleLog(remoteMessage.notification, 'onForegroundMessage')
    if (remoteMessage.notification) {
      const { title, body } = remoteMessage.notification
      showNotification({
        title,
        message: body,
        onPress,
        style,
      })
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    }
  })
}

//on background mode
export function onNotificationOpenedApp(onPress: () => void) {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp((remoteMessage) => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage.notification,
    // );
    consoleLog(remoteMessage.notification, 'onNotificationOpenedApp')
    onPress()
  })
}

//on quit mode
export function getInitialNotification(onTapped: () => void) {
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage.notification,
        // );
        consoleLog(remoteMessage.notification, 'getInitialNotification')
        onTapped()
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    })
}
