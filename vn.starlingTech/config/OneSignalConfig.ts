import { Platform } from 'react-native'
import OneSignal, { DeviceState } from 'react-native-onesignal'

// const APP_ID = 'ec01e825-c7a7-4fc1-8b11-0e1ddfa6dd55';

type OneSignalType = {
  appId: string
  onSubscribed: (params: DeviceState) => void
}
export const initOneSignal = async ({ appId, onSubscribed }: OneSignalType) => {
  /* O N E S I G N A L   S E T U P */
  OneSignal.setAppId(appId)
  OneSignal.setLogLevel(6, 0)
  OneSignal.setRequiresUserPrivacyConsent(false)

  //Prompt for push on iOS
  if (Platform.OS === 'ios') {
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response)
    })
  }

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      )
      const notification = notificationReceivedEvent.getNotification()
      console.log('notification: ', notification)
      const data = notification.additionalData
      console.log('additionalData: ', data)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification)
    },
  )

  // OneSignal.setInAppMessageClickHandler((event) => {
  //   console.log('OneSignal IAM clicked:', event);
  // });
  // OneSignal.addEmailSubscriptionObserver((event) => {
  //   console.log('OneSignal: email subscription changed: ', event);
  // });
  // OneSignal.addSubscriptionObserver((event) => {
  //   console.log('OneSignal: subscription changed:', event);
  //   // this.setState({isSubscribed: event.to.isSubscribed});
  // });
  // OneSignal.addPermissionObserver((event) => {
  //   console.log('OneSignal: permission changed:', event);
  // });

  // const deviceState = await OneSignal.getDeviceState();
  // console.log('OneSignal: deviceState:', deviceState);
  // this.setState({
  //   isSubscribed: deviceState.isSubscribed,
  // });
  const deviceState = await OneSignal.getDeviceState()
  // consoleLog('OneSignal: deviceState:', deviceState);
  // if (deviceState.isSubscribed) {
  onSubscribed(deviceState)
  // }
}

type OpenedProps = {
  onOpened: () => void
}
export const openedHandler = ({ onOpened }: OpenedProps) => {
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification)
    onOpened()
    // navigation.navigate('TabNotification');
  })
}
