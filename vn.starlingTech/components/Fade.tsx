import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import AppStyles from './AppStyles'

export default function Fade({ visible }: { visible: boolean }) {
  return (
    (visible && (
      <View style={AppStyles.fade}>
        <ActivityIndicator color="#FFF" />
      </View>
    )) ||
    null
  )
}
