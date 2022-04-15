import React from 'react'
import { Image, ImageProps, StyleSheet } from 'react-native'
import FastImage, { FastImageProps, Source } from 'react-native-fast-image'

import AppBlock from './AppBlock'

interface FastImgType extends FastImageProps {
  uri: string
  source?: Source | number
}

type Props = {
  radius?: number
  width?: number
  height?: number
} & (FastImgType | ({ source: number } & ImageProps))

export default function AppImage(props: Props) {
  const { width, height } = props

  const style = [
    (width && { width }) || undefined,
    (height && { height }) || undefined,
  ]

  if ('uri' in props) {
    return (
      <AppBlock style={[styles.imgBg, style, props.style]}>
        <FastImage
          {...props}
          style={[styles.image, style, props.style]}
          source={{
            uri: props.uri,
            priority: FastImage.priority.normal,
          }}
        />
      </AppBlock>
    )
  }
  return (
    <Image
      {...props}
      source={props.source}
      style={[styles.image, style, props.style]}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
  imgBg: {
    backgroundColor: '#f0f0f0',
  },
})
