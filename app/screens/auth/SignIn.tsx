import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { AppProcessingButton } from '@vn.starlingTech/components/AppButton'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import AppTextInput from '@vn.starlingTech/components/form/AppTextInput'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { getString } from '@vn.starlingTech/lang/language'
import { AuthParams } from 'app/navigation/params'
import AccountIcon from 'assets/svg/Account'
import PasswordIcon from 'assets/svg/PasswordIcon'
import React, { createRef, useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native'
import * as Keychain from 'react-native-keychain'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useLogin, useUserInfo } from './api/api'

const LOGO_HEIGHT = 66

export default ({ navigation }: StackScreenProps<AuthParams, 'SignIn'>) => {

  const { signIn } = useAppContext()

  const [processing, setProcessing] = useState(false)

  const passwordRef: React.RefObject<any> = createRef()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(LOGO_HEIGHT)).current
  const marginTopAnim = useRef(new Animated.Value(0)).current

  // const height = useSharedValue(200);
  // const marginTop = useSharedValue(-150);

  const [username, setUsername] = useState(settings.FOR_DEV ? 'test' : undefined)
  const [password, setPassword] = useState(settings.FOR_DEV ? '1' : undefined)

  // const logoStyle = useAnimatedStyle(() => {
  //   return {
  //     height: height.value,
  //     marginTop: marginTop.value,
  //   };
  // });

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
    // height.value = withTiming(50, {
    //   duration: event.duration + 300,
    //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    // });
    // marginTop.value = withTiming(-200, {
    //   duration: event.duration,
    //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    // });
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
        toValue: 0,
        duration: event.duration,
        useNativeDriver: false,
      }),
    ]).start()
    // height.value = withTiming(150, {
    //   duration: event.duration + 300,
    //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    // });
    // marginTop.value = withTiming(-150, {
    //   duration: event.duration,
    //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    // });
  }

  useEffect(() => {
    Orientation.lockToPortrait() //this will lock the view to Portrait
    ;(async () => {
      const credentials = await Keychain.getGenericPassword()
      if (credentials) {
        // consoleLog(
        //   'Credentials successfully loaded for user ' + credentials.username,
        // );
        setUsername(credentials.username)
        setPassword(credentials.password)
      }
    })()

    const listener = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const listener2 = Keyboard.addListener('keyboardWillHide', keyboardWillHide)
    return () => {
      listener.remove()
      listener2.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const useUserInfoMutation = useUserInfo({
    onSuccess: (user) => {
      if (username && password) {
        Keychain.setGenericPassword(username, password)
        signIn(user)
      }
    },
    onError: () => {
      setProcessing(false)
    },
  })

  const useLoginMutation = useLogin({
    onSuccess: (user) => {
      // signIn(user);
      useUserInfoMutation.mutate(user)
    },
    onError: () => {
      setProcessing(false)
    },
  })

  const onPressLogin = () => {
    if (username && password) {
      Keyboard.dismiss()
      setProcessing(true)
      useLoginMutation.mutate({ username, password })
    }
  }

  return (
    <SafeAreaView style={AppStyles.fill}>
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
          <AppBlock margin={[24, 0]}>
            <AppTextInput
              autoCapitalize="none"
              required
              value={username}
              onChangeText={setUsername}
              label="Tài khoản"
              returnKeyType="next"
              returnKeyLabel="Tiếp"
              onSubmitEditing={() => {
                passwordRef && passwordRef?.current.focus()
              }}
              leftIcon={<AccountIcon />}
              blurOnSubmit={false}
            />
          </AppBlock>

          <AppTextInput
            autoCapitalize="none"
            refName={passwordRef}
            secureTextEntry
            required
            value={password}
            onChangeText={setPassword}
            label="Mật khẩu"
            returnKeyType="done"
            returnKeyLabel="Đăng nhập"
            onSubmitEditing={onPressLogin}
            leftIcon={<PasswordIcon />}
            style={styles.mt24}
          />

          <AppBlock style={styles.btn}>
            <AppProcessingButton
              disabled={!username || !password}
              processing={processing}
              radius={10}
              primary
              width={AppConstants.WIDTH - 29 * 2}
              text={getString().signIn}
              onPress={onPressLogin}
            />
          </AppBlock>
          <Pressable
            disabled={processing}
            style={styles.forgotPass}
            onPress={() => navigation.navigate('ForgotPass')}
          >
            <AppText note>{getString().forgotPass}?</AppText>
          </Pressable>
        </AppBlock>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btn: { alignSelf: 'center', marginHorizontal: 30, marginVertical: 30 },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 29,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginRight: 6,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 240,
  },
  mt24: { marginTop: 24 },
})
