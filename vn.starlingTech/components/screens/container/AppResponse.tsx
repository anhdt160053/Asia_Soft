import AppButton from '@vn.starlingTech/components/AppButton'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import { isUndefined } from 'lodash'
import React, { ReactElement, useEffect, useRef } from 'react'
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

export type PlaceholderType = 'news'

type ProcessingType = {
  color?: string
  size?: 'small' | 'large'
}

export function OnProcessing(props: ProcessingType) {
  const { colors } = useAppTheme()
  return (
    <View style={styles.center}>
      <ActivityIndicator color={props.color || colors.text} animating />
    </View>
  )
}

type ResponseErrorType = {
  message: string
  tryAgain?: () => void
}
export function OnErrorContainer(props: ResponseErrorType) {
  return (
    <View style={styles.error}>
      {props.message && (
        <AppText note center>
          {props.message}
        </AppText>
      )}
      {props.tryAgain && (
        <AppButton onPress={props.tryAgain} style={AppStyles.buttonTryAgain}>
          <AppText>{getString().tryAgain}</AppText>
        </AppButton>
      )}
    </View>
  )
}

type ResponseContainerType = {
  isLoading: boolean
  isFetchingData: boolean
  success: boolean
  page?: number
  hasCached?: boolean
  message?: string | null
  tryAgain?: () => void
  type?: PlaceholderType
  children?: ReactElement
  color?: string
}

export function ResponseContainer(props: ResponseContainerType) {
  const { colors } = useAppTheme()
  const animRef = useRef(new Animated.Value(0)).current
  // consoleLog(props.processing, 'processing');

  useEffect(() => {
    // consoleLog(props.message, 'message');
    if (props.message && props.hasCached && (!props.page || props.page === 1)) {
      Animated.timing(animRef, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      // consoleLog('hide');
      Animated.timing(animRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  }, [animRef, props.hasCached, props.message, props.page])

  let view = props.children
  if (!props.hasCached && props.isLoading) {
    view = <OnProcessing color={props.color} />
  }

  if (props.message) {
    if (!props.hasCached && (isUndefined(props.page) || props.page === 1)) {
      view = (
        <OnErrorContainer message={props.message} tryAgain={props.tryAgain} />
      )
    }
  }

  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <>
      <AnimatedTouch
        activeOpacity={0.7}
        onPress={props.tryAgain}
        style={[
          {
            height: animRef,
          },
          styles.animatedError,
        ]}
      >
        {props.message ? (
          <AppText numberOfLines={1} center style={styles.textError}>
            <Ionicons name="ios-reload" size={14} />
            {props.message}
          </AppText>
        ) : null}
      </AnimatedTouch>
      {props.isFetchingData ? (
        <View style={styles.mv12}>
          <ActivityIndicator
            size="small"
            color={props.color || colors.text}
            animating
          />
        </View>
      ) : null}
      <View style={AppStyles.fill}>{view}</View>
    </>
  )
}

type FlatListContainerType = {
  message?: string | null
  tryAgain?: () => void
}
export function FlatListResponseContainer(props: FlatListContainerType) {
  if (props.message) {
    // consoleLog(props.message, 'message?');
    return (
      <OnErrorContainer message={props.message} tryAgain={props.tryAgain} />
    )
  }
  return null
}

const styles = StyleSheet.create({
  animatedError: { backgroundColor: '#000', justifyContent: 'center' },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  error: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  mv12: { marginVertical: 12 },
  textError: {
    color: '#FFF',
  },
})
