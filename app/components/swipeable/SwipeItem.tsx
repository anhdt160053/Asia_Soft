import AppBlock from '@vn.starlingTech/components/AppBlock'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  type: 'left' | 'right'
  dragX: Animated.AnimatedInterpolation
  opacity: Animated.Value
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default function ({ type, dragX, opacity }: Props) {
  const { colors } = useAppTheme()

  const inputRange = type === 'left' ? [0, 400] : [-400, 0]
  const outputRange = type === 'left' ? [0.5, 1] : [1, 0.5]
  const scale = dragX.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  })
  return (
    <Animated.View
      style={[styles.removeItem, { backgroundColor: colors.danger, opacity }]}
    >
      <AppBlock
        row
        center
        style={
          type === 'left'
            ? styles.removeContainerLeft
            : styles.removeContainerRight
        }
      >
        <AnimatedIcon
          name="delete-outline"
          color="#FFF"
          size={24}
          style={{ transform: [{ scale }] }}
        />
        <Animated.Text
          style={[
            styles.removeTxt,
            type === 'left' ? styles.removeTxtLeft : styles.removeTxtRight,
            {
              transform: [{ scale }],
            },
          ]}
        >
          Xoá
        </Animated.Text>
      </AppBlock>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  removeContainerLeft: {
    flexDirection: 'row-reverse',
    marginRight: 'auto',
  },
  removeContainerRight: {
    marginLeft: 'auto',
  },
  removeItem: {
    flexDirection: 'row',
    width: '100%',
  },
  removeTxt: {
    color: '#FFF',
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeTxtLeft: {
    marginLeft: 50,
    marginRight: 8,
  },
  removeTxtRight: {
    marginLeft: 8,
    marginRight: 50,
  },
})
