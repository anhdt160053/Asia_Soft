import RippleTouchable from '@starling-tech/ripple-touchable'
import { isUndefined } from 'lodash'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import AppText from './AppText'

type ButtonsProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  block?: boolean
  processing?: boolean
  disabled?: boolean
  radius?: number
  primary?: boolean
  default?: boolean
  width?: number
  text?: string
  textColor?: string
  textDisabledColor?: string
  textStyle?: TextStyle
  disabledStyle?: ViewStyle
  background?: string
  rippleColor?: string
  rippleOpacity?: number
  rippleDuration?: number
  rippleSize?: number
  rippleContainerBorderRadius?: number
  rippleCentered?: boolean
  rippleSequential?: boolean
  rippleFades?: boolean
}

function AppButton(props: ButtonsProps) {
  const theme = useTheme()

  const style: StyleProp<ViewStyle | TextStyle> = [
    styles.button,
    (props.block && styles.block) || styles.normal,
    props.primary && { backgroundColor: theme.colors.primary },
    props.default && { width: undefined, height: undefined },
    (props?.radius && { borderRadius: props.radius }) || undefined,
    (props.background && { backgroundColor: props.background }) || undefined,
    props.style,
    props.disabled && {
      backgroundColor: '#e0e0e0',
      ...props.disabledStyle,
    },
  ]

  return (
    <RippleTouchable
      {...props}
      rippleContainerBorderRadius={props.radius}
      // borderRadius={props.radius}
      onPress={props.onPress ? props.onPress : undefined}
      style={style}
    >
      {props.children || (
        <AppText
          style={{
            ...styles.btnText,
            ...props.textStyle,
            ...(props.textColor && { color: props.textColor }),
            ...(props.disabled && styles.btnTextDisabled),
            ...(props.disabled &&
              props.textDisabledColor && { color: props.textDisabledColor }),
          }}
        >
          {props.text || ''}
        </AppText>
      )}
    </RippleTouchable>
  )
}

type LoadingButtonsProps = {
  width: number
  height?: number
  forceDisableLoading?: number
  confirm?: boolean
} & ButtonsProps

export function AppProcessingButton(props: LoadingButtonsProps) {
  const theme = useTheme()
  const borderRadius = props.radius !== undefined ? props.radius : 10

  const widthAnim = useRef(new Animated.Value(props.width)).current
  const radiusAnim = useRef(new Animated.Value(props.radius || 0)).current

  const [isLoading, setIsLoading] = useState(false)

  const { processing, height } = props

  // consoleLog('AppProcessingButton renderBtn:', props);

  useEffect(() => {
    if (!processing || props.forceDisableLoading) {
      Animated.parallel([
        Animated.timing(widthAnim, {
          toValue: props.width,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(radiusAnim, {
          toValue: borderRadius,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start()
      setIsLoading(false)
    }
    if (props?.confirm && processing) {
      Animated.parallel([
        Animated.timing(widthAnim, {
          toValue: height ? height : Platform.OS === 'ios' ? 60 : 50,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(radiusAnim, {
          toValue: 99,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start()
      setIsLoading(true)
    }
  }, [
    borderRadius,
    processing,
    props.width,
    radiusAnim,
    widthAnim,
    props.forceDisableLoading,
    props?.confirm,
    height,
  ])

  const onPress = () => {
    if (props.onPress) {
      if (!props?.confirm) {
        setIsLoading(true)
        Animated.parallel([
          Animated.timing(widthAnim, {
            toValue: height ? height : Platform.OS === 'ios' ? 60 : 50,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(radiusAnim, {
            toValue: 99,
            duration: 400,
            useNativeDriver: false,
          }),
        ]).start(props.onPress)
      } else {
        props.onPress()
      }
    }
  }

  const buttonBlock = props.block && styles.block
  const buttonStyle = buttonBlock || styles.normal
  const primaryStyle = props.primary && {
    backgroundColor: theme.colors.primary,
  }
  const defaultStyle = props.default && { width: undefined, height: undefined }
  const disabledStyle = props.disabled && {
    backgroundColor: '#e0e0e0',
  }
  const children = isLoading ? (
    <ActivityIndicator animating color={props.textColor || '#FFF'} />
  ) : (
    props.children || (
      <AppText
        style={[
          styles.btnText,
          props.textStyle,
          (props.textColor && { color: props.textColor }) || undefined,
          props.disabled && styles.btnTextDisabled,
        ]}
      >
        {props.text || ''}
      </AppText>
    )
  )
  return (
    <Animated.View
      style={[
        {
          width: widthAnim,
          borderRadius: radiusAnim,
        },
        styles.animated,
      ]}
    >
      <RippleTouchable
        rippleContainerBorderRadius={props.radius}
        disabled={props.disabled || props.processing || false}
        onPress={onPress}
        style={[
          styles.button,
          buttonStyle,
          primaryStyle,
          defaultStyle,
          props.style,
          props.disabledStyle,
          (height && { height }) || undefined,
          (props.background && { backgroundColor: props.background }) ||
            undefined,
          { width: props.width, borderRadius: props.radius },
          disabledStyle,
        ]}
      >
        {children}
      </RippleTouchable>
    </Animated.View>
  )
}

export function RippleButton(props: ButtonsProps) {
  const theme = useTheme()
  const buttonBlock = props.block && styles.block
  const buttonStyle = buttonBlock || styles.normal
  const radiusStyle = !isUndefined(props.radius) && {
    borderRadius: props.radius,
  }
  const primaryStyle = props.primary && {
    backgroundColor: theme.colors.primary,
  }
  const defaultStyle = props.default && { width: undefined, height: undefined }
  const disabledStyle = props.disabled && {
    backgroundColor: '#e0e0e0',
    color: '#000',
    ...props.disabledStyle,
  }
  return (
    <RippleTouchable
      {...props}
      rippleContainerBorderRadius={props.radius}
      onPress={props.onPress ? props.onPress : undefined}
      style={[
        buttonStyle,
        primaryStyle,
        radiusStyle,
        defaultStyle,
        props.style,
        disabledStyle,
      ]}
    >
      {props.children || (
        <AppText
          style={{
            ...styles.btnText,
            ...props.textStyle,
            ...(props.textColor && { color: props.textColor }),
            ...((props.background && { backgroundColor: props.background }) ||
              undefined),
            ...(props.disabled && styles.btnTextDisabled),
            ...(props.disabled &&
              props.textDisabledColor && { color: props.textDisabledColor }),
          }}
        >
          {props.text || ''}
        </AppText>
      )}
    </RippleTouchable>
  )
}

export default AppButton

const styles = StyleSheet.create({
  animated: {
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  block: {
    // flex: 1,
    width: '100%',
  },
  btnText: { color: '#FFF', fontSize: 18 },
  btnTextDisabled: { color: '#666' },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'white',
    // borderRadius: 10,
    height: Platform.OS === 'ios' ? 54 : 50,
    justifyContent: 'center',
    maxWidth: 600,
  },
  normal: {
    width: 237,
  },
})
