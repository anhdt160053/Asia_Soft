import AppText from '@vn.starlingTech/components/AppText'
import React from 'react'
import { TextStyle, View, StyleProp } from 'react-native'

import FormStyles from '../FormStyles'

type AppInputLabelProps = {
  required?: boolean
  label: string
  labelStyle?: StyleProp<TextStyle>
  inline?: boolean
}

export function AppInputLabel({
  label,
  required,
  labelStyle,
  inline,
}: AppInputLabelProps) {
  return (
    <View style={[FormStyles.labelContainer, inline && FormStyles.inlineLabel]}>
      <AppText style={labelStyle}>{label}</AppText>
      {required ? <AppText style={FormStyles.colorRed}>{' *'}</AppText> : null}
    </View>
  )
}
