import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { useAppContext, UserType } from '@vn.starlingTech/context/AppContext'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import AuthNavigator from 'app/navigation/AuthNavigator'
import MainNavigator from 'app/navigation/MainNavigator'
import { useUserInfo } from 'app/screens/auth/api/api'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import 'moment/locale/vi'

function AppNavigator() {
  const { colors } = useAppTheme()
  const { signIn, token } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  // consoleLog(token, 'token');

  const { mutate } = useUserInfo({
    onSuccess: (user) => {
      signIn(user)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    },
    onSilentError: () => {
      setIsLoading(false)
    },
  })

  useEffect(() => {
    // handleOneSignal();
    const bootstrapAsync = async () => {
      const userSession = await AsyncStorage.getItem(AppConstants.SESSION.USER)
      if (!userSession) {
        setIsLoading(false)
        return
      }

      const user: UserType = JSON.parse(userSession)
      if (user) {
        //get userInfo
        const tmpUser = {
          username: user.username,
          token: user.token,
        } as UserType
        mutate(tmpUser)
      }
    }
    bootstrapAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!token && isLoading) {
    return (
      <AppBlock style={styles.loading}>
        <ActivityIndicator color={colors.text} animating />
      </AppBlock>
    )
  }

  return token ? (
    <ActionSheetProvider>
      <MainNavigator />
    </ActionSheetProvider>
  ) : (
    <AuthNavigator />
  )
}
export default AppNavigator

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
  },
})
