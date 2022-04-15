import AppStyles from '@vn.starlingTech/components/AppStyles'
import SwipeItem from 'app/components/swipeable/SwipeItem'
import React, { ReactNode, useRef } from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

interface Props {
  swipeEnabled?: boolean
  children?: ReactNode
  onDelete: () => void
  style?: ViewStyle | undefined
  itemHeight: number
  refName: any
}

export default function (props: Props) {
  const height = useRef(new Animated.Value(props.itemHeight)).current
  const borderRadius = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current

  const animatedDelete = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start(() => {
      props.onDelete()
    })
  }

  const animatedUndo = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: props.itemHeight,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(borderRadius, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const onBegan = () => {
    Animated.timing(borderRadius, {
      toValue: 12,
      duration: 350,
      useNativeDriver: false,
    }).start()
  }

  const renderLeftAction = (
    progress: any,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    return <SwipeItem opacity={opacity} type="left" dragX={dragX} />
  }
  const renderRightAction = (
    progress: any,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    return <SwipeItem opacity={opacity} type="right" dragX={dragX} />
  }

  return (
    <Swipeable
      enabled={props.swipeEnabled}
      renderLeftActions={renderLeftAction}
      renderRightActions={renderRightAction}
      onBegan={onBegan}
      onSwipeableOpen={animatedDelete}
      onSwipeableClose={animatedUndo}
      ref={props.refName}
    >
      <Animated.View
        style={[
          styles.container,
          props.style,
          {
            height,
            borderRadius,
          },
        ]}
      >
        {props.children}
      </Animated.View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    ...AppStyles.bottomBordered,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
})
