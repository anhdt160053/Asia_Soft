import { useAppTheme, sizes } from '@vn.starlingTech/theme/theming'
import React, { ReactNode } from 'react'
import { StyleSheet, TextProps, StyleProp, TextStyle } from 'react-native'
import {
  Text,
  Title,
  Paragraph,
  Headline,
  Subheading,
} from 'react-native-paper'
import { Fonts } from 'react-native-paper/lib/typescript/types'

type TextProp = {
  size?: number
  title?: boolean | null
  subheading?: boolean
  headline?: boolean
  paragraph?: boolean
  bold?: boolean
  regular?: boolean
  light?: boolean
  thin?: boolean
  children: string | number | ReactNode
  numberOfLines?: number
  note?: boolean
  center?: boolean
  right?: boolean
  primary?: boolean
  white?: boolean
  black?: boolean
  height?: number
  spacing?: number
  color?: string
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
} & TextProps

function getFontFamily(fonts: Fonts, style?: StyleProp<TextStyle>) {
  const { fontWeight } = StyleSheet.flatten(style || {})
  switch (fontWeight) {
    case '100':
    case '200':
      return fonts.thin.fontFamily
    case '300':
      return fonts.light.fontFamily
    case '500':
    case '700':
    case '900':
      return fonts.medium.fontFamily
    default:
      return fonts.regular.fontFamily
  }
}

export default function (props: TextProp) {
  const { colors, fonts } = useAppTheme()

  const {
    size,
    primary,
    white,
    black,
    title,
    paragraph,
    note,
    center,
    right,
    bold,
    regular,
    light,
    thin,
    height,
    style,
    color,
    spacing,
    transform,
  } = props

  const fontFamily = getFontFamily(fonts, style)

  const textStyle: StyleProp<TextStyle> = [
    styles.text,
    { color: colors.text },
    { fontFamily },
    white && styles.white,
    black && styles.black,
    primary && { color: colors.primary },
    title && styles.title,
    paragraph && styles.paragraph,
    note && { color: colors.placeholder },
    center && styles.center,
    right && styles.right,
    bold && { fontFamily: fonts.medium.fontFamily },
    regular && { fontFamily: fonts.regular.fontFamily },
    light && { fontFamily: fonts.light.fontFamily },
    thin && { fontFamily: fonts.thin.fontFamily },
    (height && { lineHeight: height }) || undefined,
    (color && { color }) || undefined,
    (spacing && { letterSpacing: spacing }) || undefined,
    (transform && { textTransform: transform }) || undefined,
    (size && { fontSize: size }) || undefined,
    style,
  ]

  if (props.subheading) {
    return (
      <Subheading allowFontScaling={false} {...props} style={textStyle}>
        {props.children}
      </Subheading>
    )
  }
  if (props.headline) {
    return (
      <Headline allowFontScaling={false} {...props} style={textStyle}>
        {props.children}
      </Headline>
    )
  }
  if (props.paragraph) {
    return (
      <Paragraph {...props} style={textStyle}>
        {props.children}
      </Paragraph>
    )
  }

  if (title) {
    return (
      <Title allowFontScaling={false} {...props} style={textStyle}>
        {props.children}
      </Title>
    )
  }
  return (
    <Text allowFontScaling={false} {...props} style={textStyle}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  black: {
    color: 'black',
  },
  center: {
    textAlign: 'center',
  },
  paragraph: {
    fontSize: sizes.paragraph,
  },
  right: {
    textAlign: 'right',
  },
  text: {
    fontSize: sizes.font,
  },
  title: {
    fontSize: sizes.title,
  },
  white: {
    color: 'white',
  },
})
