// import { isFunction } from 'lodash';
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { getString } from '@vn.starlingTech/lang/language'
import light from '@vn.starlingTech/theme/light'
import { Alert, ViewStyle } from 'react-native'
import { showMessage, hideMessage, Position } from 'react-native-flash-message'

// import {getLang} from '../language';

export function hideAllMessage() {
  hideMessage()
}

export function showMessageError(message?: string) {
  Alert.alert(getString().errorTitle, message || getString().error)
}
export function showMessageSuccess(
  message: string,
  autoHide = true,
  position: Position = 'top',
) {
  showMessage({ message, type: 'success', position, autoHide })
}

export function showFlashMessageError(
  message?: string,
  autoHide: boolean = true,
  position: Position = 'top',
) {
  showMessage({
    message: message || getString().error,
    type: 'danger',
    position,
    autoHide,
  })
}
export function showFlashMessageSuccess(message: string, autoHide = true) {
  showMessage({ message, type: 'success', position: 'top', autoHide })
}

type AlertMessageTypes = {
  title?: string
  message: string
  onPress?: () => void
  positiveTitle?: string
  positiveOnPress?: (...params: any) => void
  negativeTitle?: string
  negativeOnPress?: (...params: any) => void
  cancelable?: boolean
}

// let alertMessageOnShowing = false;

export function showAlertMessage(props: AlertMessageTypes) {
  const {
    title,
    message,
    onPress,
    positiveTitle: pPositiveTitle,
    positiveOnPress,
    negativeTitle: pNegativeTitle,
    negativeOnPress,
    cancelable = false,
  } = props
  const positiveTitle = pPositiveTitle || getString().ok
  let buttonOptions = [{ text: positiveTitle, onPress: positiveOnPress }]
  if (onPress) {
    buttonOptions = [{ text: positiveTitle, onPress }]
  } else if (positiveOnPress || negativeOnPress) {
    const negativeTitle = pNegativeTitle || getString().cancel
    buttonOptions = [
      {
        text: negativeTitle,
        onPress: negativeOnPress,
      },
      {
        text: positiveTitle,
        onPress: positiveOnPress,
      },
    ]
  } else {
    buttonOptions = [{ text: positiveTitle, onPress: positiveOnPress }]
  }
  Alert.alert(title || getString().errorTitle, message, buttonOptions, {
    cancelable,
  })
  // alertMessageOnShowing = true;
}

type ShowNotificationType = {
  title?: string
  message?: string
  onPress: () => void
  style?: ViewStyle
}
export function showNotification(props: ShowNotificationType) {
  const { title, message } = props
  showMessage({
    message: title || getString().alert,
    description: message || '',
    duration: 5000,
    titleStyle: { fontFamily: 'Roboto-Regular' },
    textStyle: { fontFamily: 'Roboto-Light' },
    backgroundColor: light.primary,
    style: {
      top: 10,
      left: 10,
      marginTop: 0,
      borderRadius: 12,
      width: AppConstants.SCREEN_WIDTH - 20,
      paddingTop: 0,
      paddingBottom: 12,
      ...props.style,
    },
    onPress: props.onPress,
  })
  // alertMessageOnShowing = true;
}
