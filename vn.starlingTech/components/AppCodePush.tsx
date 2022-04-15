import { getString } from '@vn.starlingTech/lang/language'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CodePush from 'react-native-code-push'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppText from './AppText'

const AppCodePush = () => {
  const [updateMessage, setUpdateMessage] = useState('')
  const [updating, setUpdating] = useState(true)
  const [highlight, setHighLight] = useState(false)

  useEffect(() => {
    const {
      title,
      mandatoryUpdateMessage,
      optionalUpdateMessage,
      optionalIgnoreButtonLabel,
      optionalInstallButtonLabel,
      mandatoryContinueButtonLabel,
    } = getString().codePush
    CodePush.sync(
      {
        updateDialog: {
          title,
          mandatoryUpdateMessage,
          optionalUpdateMessage,
          optionalIgnoreButtonLabel,
          optionalInstallButtonLabel,
          mandatoryContinueButtonLabel,
        },
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      () => {}, // Don't remove this function (github.com/Microsoft/react-native-code-push/issues/516)
    )
  }, [])

  // useEffect(() => {
  //   if (!updating) {
  //     setTimeout(() => setUpdateMessage(''), 2000);
  //   }
  // }, [updating]);

  function codePushStatusDidChange(syncStatus: number) {
    switch (syncStatus) {
      // case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      //   // setUpdateMessage('Checking for update');
      //   break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setUpdateMessage(getString().codePush.downloading)
        break
      // case CodePush.SyncStatus.AWAITING_USER_ACTION:
      //   // setUpdateMessage('Awaiting user action...');
      //   break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setUpdateMessage(getString().codePush.installing)
        break
      case CodePush.SyncStatus.UP_TO_DATE:
        // setUpdateMessage('Your app is up to date');
        setUpdating(false)
        break
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setUpdateMessage('Update cancelled by user.')
        setUpdating(false)
        break
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setUpdateMessage('Update installed and will be applied on restart.')
        setHighLight(true)
        setUpdating(false)
        break
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setUpdateMessage('Cannot install new update.')
        setUpdating(false)
        break
    }
  }

  const insets = useSafeAreaInsets()

  return (
    (updateMessage && (
      <View
        style={[
          styles.updating,
          highlight && styles.backgroundHighlight,
          { height: 44 + insets.top, paddingTop: insets.top },
        ]}
      >
        {updating && <ActivityIndicator animating color={Colors.white} />}
        <AppText style={styles.updatingTxt}>{updateMessage}</AppText>
      </View>
    )) ||
    null
  )
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
}

const styles = StyleSheet.create({
  backgroundHighlight: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  updating: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  updatingTxt: { color: 'white', marginLeft: 15, textAlign: 'center' },
})

export default CodePush(codePushOptions)(AppCodePush)
