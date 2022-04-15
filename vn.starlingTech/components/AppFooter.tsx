import AppBlock from '@vn.starlingTech/components/AppBlock'
import React, { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  style?: ViewStyle
  shadow?: boolean
  height?: number
}
export default function (props: Props) {
  const insets = useSafeAreaInsets()

  const { height = 60 } = props

  return (
    <>
      <AppBlock
        style={{
          height: insets.bottom + height,
        }}
      />
      <AppBlock
        shadow={props.shadow}
        style={[
          styles.container,
          props.style,
          (insets.bottom && { paddingBottom: insets.bottom }) || undefined,
          insets.bottom > 0 && styles.noTop,
        ]}
      >
        {props.children}
      </AppBlock>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: 12,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
  },
  noTop: {
    marginTop: 0,
  },
})
