import AsyncStorage from '@react-native-async-storage/async-storage'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import {
  AppContext,
  SettingType,
  UserType,
} from '@vn.starlingTech/context/AppContext'
import AppProvider from '@vn.starlingTech/context/AppProvider'
import {
  bootstrapReducer,
  BootstrapState,
} from '@vn.starlingTech/context/BootstrapReducers'
import AppNavigator from 'app/navigation/AppNavigator'
import React, { useState } from 'react'
import { LogBox } from 'react-native'

import 'moment/locale/vi'

if (__DEV__) {
  LogBox.ignoreLogs(['The native module for Flipper'])
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


const initialState: BootstrapState = {
  isLoading: true,
  notification: 0,
  tokenExpired: false,
  token: '',
}

function App() {
  const [state, dispatch] = React.useReducer(bootstrapReducer, initialState)
  const [setting, setSetting] = useState<SettingType>()

  async function signIn(user: UserType) {
    if (user) {
      await AsyncStorage.setItem(
        AppConstants.SESSION.USER,
        JSON.stringify({ username: user.username, token: user.token }),
      )
      dispatch({ type: 'SIGN_IN', data: { user } })
    }
  }

  function signOut() {
    AsyncStorage.removeItem(AppConstants.SESSION.USER)
    dispatch({ type: 'NO_TOKEN' })
  }

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        notification: 0,
        token: state.token,
        setting,
        dispatchSetting: setSetting,
        signIn,
        signOut,
      }}
    >
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </AppContext.Provider>
  )
}
export default App
