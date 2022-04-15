import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { AppProcessingButton } from '@vn.starlingTech/components/AppButton'
import AppTextInput from '@vn.starlingTech/components/form/AppTextInput'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { showMessageSuccess } from '@vn.starlingTech/helpers/messageHelper'
import Container from 'app/components/Container'
import { StackParams } from 'app/navigation/params'
import React, { createRef, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useMutation } from 'react-query'

import { changePassword } from './api/api'

export default function ({
  navigation,
}: StackScreenProps<StackParams, 'ChangePass'>) {
  const { user } = useAppContext()

  const [currentPass, setCurrentPass] = useState<string>('')
  const [newPass, setNewPass] = useState<string>('')
  const [reNewPass, setReNewPass] = useState<string>('')

  const passwordRef: React.RefObject<any> = createRef()
  const rePasswordRef: React.RefObject<any> = createRef()

  const { mutate, isLoading } = useMutation(changePassword, {
    retry: 1,
    onSuccess: (data) => {
      if (data.status) {
        showMessageSuccess('Thay đổi mật khẩu thành công!')
        navigation.goBack()
      } else {
        Alert.alert('Lỗi', 'Mật khẩu hiện tại không chính xác!')
      }
    },
  })

  const onPress = () => {
    mutate({ user, currentPass, newPass })
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <AppBlock flex={1} style={styles.container}>
          <AppBlock>
            <AppTextInput
              required
              secureTextEntry
              value={currentPass}
              onChangeText={setCurrentPass}
              label="Mật khẩu hiện tại"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef && passwordRef.current.focus()}
            />
          </AppBlock>
          <AppBlock margin={[24, 0]}>
            <AppTextInput
              required
              secureTextEntry
              value={newPass}
              onChangeText={setNewPass}
              label="Mật khẩu mới"
              returnKeyType="next"
              refName={passwordRef}
              onSubmitEditing={() =>
                rePasswordRef && rePasswordRef.current.focus()
              }
            />
          </AppBlock>
          <AppTextInput
            requiredO
            refName={rePasswordRef}
            secureTextEntry
            value={reNewPass}
            onChangeText={setReNewPass}
            label="Nhập lại mật khẩu mới"
            match={newPass}
          />
          <AppBlock margin={[24, 0]}>
            <AppProcessingButton
              onPress={onPress}
              processing={isLoading}
              disabled={!currentPass || !newPass || reNewPass !== newPass}
              width={AppConstants.WIDTH - 32}
              height={50}
              primary
              block
              text="Thay đổi mật khẩu"
            />
          </AppBlock>
        </AppBlock>
      </KeyboardAwareScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
