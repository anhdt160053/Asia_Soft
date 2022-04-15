import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { AppProcessingButton } from '@vn.starlingTech/components/AppButton'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import AppTextInput from '@vn.starlingTech/components/form/AppTextInput'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { AuthParams } from 'app/navigation/params'
import AccountIcon from 'assets/svg/Account'
import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, ScrollView, Animated } from 'react-native'
import { useMutation } from 'react-query'

import { forgotPass } from './api/api'

const LOGO_HEIGHT = 66

export default ({ navigation }: StackScreenProps<AuthParams, 'ForgotPass'>) => {
  const [processing, setProcessing] = useState(false)

  const scaleAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(LOGO_HEIGHT)).current
  const marginTopAnim = useRef(new Animated.Value(-150)).current

  const [username, setUsername] = useState<string>()

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
        toValue: -250,
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
        toValue: -150,
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

  const { mutate } = useMutation(forgotPass, {
    retry: settings.QUERY_RETRY,
    onSuccess: (data) => {
      // consoleLog(data, 'data');
      // setProcessing(false);
      if (data && username) {
        navigation.navigate('OTP', { username })
      }
      setProcessing(false)
    },
    onError: () => {
      setProcessing(false)
    },
  })

  const onPress = () => {
    if (username) {
      Keyboard.dismiss()
      setProcessing(true)
      mutate({ username })
    }
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
        <AppText center>Vui lòng nhập tên tài khoản của bạn</AppText>
        <AppBlock margin={[24, 0]}>
          <AppTextInput
            autoCapitalize="none"
            required
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
            returnKeyLabel="Tiếp"
            leftIcon={<AccountIcon />}
            blurOnSubmit={false}
          />
        </AppBlock>

        <AppBlock style={styles.btn}>
          <AppProcessingButton
            disabled={!username}
            processing={processing}
            radius={10}
            primary
            width={AppConstants.WIDTH - 29 * 2}
            text="Tiếp tục"
            onPress={onPress}
          />
        </AppBlock>
        {/* <Pressable
          disabled={processing}
          style={styles.forgotPass}
          onPress={() => navigation.navigate('OTP')}>
          <AppText note>Bạn đã nhận được mã?</AppText>
        </Pressable> */}
      </AppBlock>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn: { alignSelf: 'center', marginHorizontal: 30, marginVertical: 30 },

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
})
