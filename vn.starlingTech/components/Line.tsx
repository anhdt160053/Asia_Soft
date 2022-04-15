import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

type Props = { style?: ViewStyle }

export default function Line({ style }: Props) {
  const { colors } = useAppTheme()
  return (
    <View style={[styles.line, style, { backgroundColor: colors.border }]} />
  )
}

const styles = StyleSheet.create({
  line: { flex: 1, height: StyleSheet.hairlineWidth },
})
