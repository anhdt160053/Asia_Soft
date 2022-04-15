import { getString } from '@vn.starlingTech/lang/language'
import { Alert, Platform } from 'react-native'
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions'

import { showAlertMessage } from './messageHelper'

export async function hasCameraPermission() {
  let hasPermission = false

  const permission = Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  })
  if (permission) {
    await check(permission)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            )
            hasPermission = false
            break
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            )
            hasPermission = (await request(permission)) === 'granted'
            break
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible')
            hasPermission = false
            break
          case RESULTS.GRANTED:
            console.log('The permission is granted')
            hasPermission = true
            break
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore')
            hasPermission = false
            break
        }
      })
      .catch((error) => {
        Alert.alert(error + '')
      })
  }
  if (!hasPermission) {
    showAlertMessage({
      message: getString().noPermission.camera,
      title: getString().camera,
      positiveTitle: getString().openSetting,
      positiveOnPress: openSettings,
    })
  }
  return hasPermission
}

export async function hasPhotoPermission() {
  let hasPermission = false
  const permission = Platform.select({
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  })
  if (permission) {
    await check(permission)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            )
            break
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            )
            hasPermission = (await request(permission)) === 'granted'
            break
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible')
            break
          case RESULTS.GRANTED:
            console.log('The permission is granted')
            hasPermission = true
            break
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore')
            break
        }
      })
      .catch((error) => {
        Alert.alert(error + '')
      })
  }
  if (!hasPermission) {
    showAlertMessage({
      message: getString().noPermission.photoLibrary,
      title: getString().photoLibrary,
      positiveTitle: getString().openSetting,
      positiveOnPress: openSettings,
    })
  }
  return hasPermission
}
