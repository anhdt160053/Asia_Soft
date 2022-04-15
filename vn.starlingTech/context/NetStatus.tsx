import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AppStyles from '../components/AppStyles'
import AppText from '../components/AppText'

let unsubscribe: any
let offline = false

export default () => {
  const [insets] = useState(useSafeAreaInsets())

  const [processing, setProcessing] = useState(false)
  const [networkMsg, setNetworkMsg] = useState('')

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener((netState) => {
      handlerStatus(netState)
    })
    return () => unsubscribe && unsubscribe()
  }, [])

  if (!networkMsg) {
    return null
  }

  const checkConnection = async () => {
    setProcessing(true)
    const netState = await NetInfo.fetch()
    handlerStatus(netState)
  }

  function handlerStatus(netState: NetInfoState) {
    offline =
      netState.type === 'none' ||
      !netState.isConnected ||
      netState.isInternetReachable === false
    setNetworkMsg(offline ? getString().errorInternet : '')
    setProcessing(false)
  }

  const { colors } = useAppTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          borderBottomColor: colors.border,
          paddingTop: insets.top || 6,
          ...(insets.top && { marginBottom: -insets.top + 16 }),
        },
      ]}
      onPress={checkConnection}
    >
      {processing ? (
        <ActivityIndicator size={20} />
      ) : (
        <AppText center style={styles.errMsg}>
          <Ionicons name="ios-reload" size={14} />
          {networkMsg}
        </AppText>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    zIndex: 999,
    ...AppStyles.bottomBordered,
  },
  errMsg: { color: 'red', fontSize: 14 },
})
