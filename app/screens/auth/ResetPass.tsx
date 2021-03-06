import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { AppProcessingButton } from '@vn.starlingTech/components/AppButton'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import AppTextInput from '@vn.starlingTech/components/form/AppTextInput'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { showMessageSuccess } from '@vn.starlingTech/helpers/messageHelper'
import { AuthParams } from 'app/navigation/params'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Animated, Alert } from 'react-native'
import { useMutation } from 'react-query'

import { resetPass } from './api/api'

const LOGO_HEIGHT = 66

export default ({
  route,
  navigation,
}: StackScreenProps<AuthParams, 'ResetPass'>) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(LOGO_HEIGHT)).current
  const marginTopAnim = useRef(new Animated.Value(-150)).current

  const [newPass, setNewPass] = useState<string>('')
  const [reNewPass, setReNewPass] = useState<string>('')

  const rePasswordRef: React.RefObject<any> = createRef()

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

  const { mutate, isLoading } = useMutation(resetPass, {
    retry: 1,
    onSuccess: (data) => {
      if (data.status) {
        showMessageSuccess('Thay ?????i m???t kh???u th??nh c??ng!')
        navigation.navigate('SignIn')
      } else {
        Alert.alert('L???i', 'Kh??ng th??? reset m???t kh???u')
      }
    },
    onError: (error) => {
      const { title, message } = handlerApiResponseError(error)
      Alert.alert(title, message)
    },
  })

  const onPress = () => {
    mutate({ password: newPass, token: route.params.token })
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={AppStyles.fill}>
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
        <AppText center>?????i m???t kh???u m???i</AppText>
        <AppBlock margin={[24, 0]}>
          <AppTextInput
            required
            secureTextEntry
            value={newPass}
            onChangeText={setNewPass}
            label="M???t kh???u m???i"
            returnKeyType="next"
            onSubmitEditing={() =>
              rePasswordRef && rePasswordRef.current.focus()
            }
          />
        </AppBlock>
        <AppTextInput
          required
          refName={rePasswordRef}
          secureTextEntry
          value={reNewPass}
          onChangeText={setReNewPass}
          label="Nh???p l???i m???t kh???u m???i"
          match={newPass}
        />
        <AppBlock margin={[24, 0]}>
          <AppProcessingButton
            onPress={onPress}
            processing={isLoading}
            disabled={!newPass || reNewPass !== newPass}
            width={AppConstants.WIDTH - 32}
            height={50}
            primary
            block
            text="Reset m???t kh???u"
          />
        </AppBlock>
      </AppBlock>
    </KeyboardAwareScrollView>
  )
}

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
})
