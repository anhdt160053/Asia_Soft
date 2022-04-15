import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import ConfirmationCodeInput from '@vn.starlingTech/components/form/ConfirmCodeInput'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { showAlertMessage } from '@vn.starlingTech/helpers/messageHelper'
import light from '@vn.starlingTech/theme/light'
import { AuthParams } from 'app/navigation/params'
import React, { useEffect, useRef } from 'react'
import { Keyboard, StyleSheet, ScrollView, Animated } from 'react-native'
import { useMutation } from 'react-query'

import { confirmCode } from './api/api'

const LOGO_HEIGHT = 66

export default ({ route, navigation }: StackScreenProps<AuthParams, 'OTP'>) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(LOGO_HEIGHT)).current
  const marginTopAnim = useRef(new Animated.Value(-250)).current

  const keyboardWillShow = (event: any) => {
    Animated.parallel([
      Animated.spring(heightAnim, {
        toValue: 0.6 * LOGO_HEIGHT,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.7,
        duration: event.duration,
        useNativeDriver: false,
      }),
      Animated.timing(marginTopAnim, {
        toValue: -350,
        duration: event.duration,
        useNativeDriver: false,
      }),
    ]).start()
  }
  const keyboardWillHide = (event: any) => {
    Animated.parallel([
      Animated.spring(heightAnim, {
        toValue: LOGO_HEIGHT,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: event.duration,
        useNativeDriver: false,
      }),
      Animated.timing(marginTopAnim, {
        toValue: -250,
        duration: event.duration,
        useNativeDriver: false,
      }),
    ]).start()
  }

  useEffect(() => {
    const listener = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const listener2 = Keyboard.addListener('keyboardWillHide', keyboardWillHide)
    return () => {
      listener.remove()
      listener2.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate } = useMutation(confirmCode, {
    retry: settings.QUERY_RETRY,
    onSuccess: (data) => {
      if (data && data.Table) {
        navigation.navigate('ResetPass', { token: data.Table[0].token })
      }
    },
    onError: (error: any) => {
      const { title, message } = handlerApiResponseError(error)
      showAlertMessage({ title, message })
    },
  })

  const onCodeChanged = (_code: string) => {
    // consoleLog(code, 'code');
  }

  const onFulfill = (code: string) => {
    // consoleLog(code, 'onFulfill');
    mutate({ code, username: route.params?.username || 'test01' })
  }

  return (
    <ScrollView contentContainerStyle={AppStyles.fill}>
      <AppBlock style={styles.container}>
        <Animated.Image
          source={require('assets/logo.png')}
          style={[
            styles.logo,
            {
              transform: [{ scale: scaleAnim }],
              height: heightAnim,
              marginTop: marginTopAnim,
            },
          ]}
          resizeMode="contain"
        />
        <AppBlock margin={[24, 0, 0]}>
          <AppText center>
            Một mã xác nhận đã được gửi tới email của bạn
          </AppText>
        </AppBlock>
        <AppBlock margin={[24, 0]}>
          <ConfirmationCodeInput
            codeLength={8}
            onCodeChange={onCodeChanged}
            onFulfill={onFulfill}
            codeInputStyle={styles.otp}
          />
        </AppBlock>
      </AppBlock>
    </ScrollView>
  )
}

const WIDTH = (AppConstants.WIDTH - 54) / 9

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 29,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 240,
  },
  otp: {
    borderColor: light.inputBorder,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 'bold',
    height: WIDTH,
    width: WIDTH,
  },
})
