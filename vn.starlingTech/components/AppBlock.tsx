import { sizes, useAppTheme } from '@vn.starlingTech/theme/theming'
import React, { ReactNode } from 'react'
import { StyleSheet, StyleProp, ViewProps, View, ViewStyle } from 'react-native'

import {
  handleMargin,
  handleBorder,
  handlePadding,
} from '../helpers/utilHelper'

interface Props extends ViewProps {
  children?: ReactNode
  center?: boolean
  middle?: boolean
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  margin?: boolean | number | number[]
  padding?: boolean | number | number[]
  shadow?: boolean
  row?: boolean
  column?: boolean
  space?: 'between' | 'around' | 'evenly'
  border?: boolean | number | number[]
  flex?: number | boolean
  background?: string
}

export default function (props: Props) {
  const { colors } = useAppTheme()
  const {
    margin,
    padding,
    center,
    middle,
    top,
    bottom,
    left,
    right,
    shadow,
    row,
    column,
    space,
    border,
    flex,
    style,
    background,
  } = props

  const viewStyle: StyleProp<ViewStyle> = [
    margin
      ? typeof margin !== 'boolean'
        ? handleMargin(margin)
        : styles.margin
      : undefined,
    padding
      ? typeof padding !== 'boolean'
        ? handlePadding(padding)
        : styles.padding
      : undefined,
    border
      ? typeof border !== 'boolean'
        ? handleBorder(border, colors.border)
        : styles.border
      : undefined,
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    left && styles.left,
    right && styles.right,
    bottom && styles.bottom,
    shadow && styles.shadow,
    row && styles.row,
    column && styles.column,
    space && { justifyContent: `space-${space}` },
    flex ? (typeof flex === 'number' ? { flex } : { flex: 1 }) : undefined,
    (background && { backgroundColor: background }) || undefined,
    style,
  ]
  delete props.margin
  delete props.padding
  delete props.border
  return (
    <View {...props} style={viewStyle}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  column: { flexDirection: 'column' },
  left: {
    justifyContent: 'flex-start',
  },
  margin: {
    margin: sizes.padding,
  },
  middle: {
    justifyContent: 'center',
  },
  padding: {
    padding: sizes.padding,
  },
  right: {
    justifyContent: 'flex-end',
  },
  row: { flexDirection: 'row' },
  shadow: {
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
  },
  top: {
    justifyContent: 'flex-start',
  },
})
