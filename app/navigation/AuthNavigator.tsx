import { createStackNavigator } from '@react-navigation/stack'
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types'
import ForgotPass from 'app/screens/auth/ForgotPass'
import OTP from 'app/screens/auth/OTP'
import ResetPass from 'app/screens/auth/ResetPass'
import SignIn from 'app/screens/auth/SignIn'
import React from 'react'
import { Platform } from 'react-native'

import { AuthParams } from './params'

const AuthStack = createStackNavigator<AuthParams>()

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={DetailHeaderOptions}>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
      <AuthStack.Screen name="ForgotPass" component={ForgotPass} />
      <AuthStack.Screen name="OTP" component={OTP} />
      <AuthStack.Screen name="ResetPass" component={ResetPass} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator

const AppHeaderOptions: StackHeaderOptions = {
  // headerTintColor: colors.primary,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    // fontFamily: 'UTM Avo',
    fontWeight: '400',
    textTransform: 'uppercase',
    marginHorizontal: 16,
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: () => null,
  // headerLeft: () => <HeaderLeft />,
  //   headerRight: () => <HeaderRight />,
}

const DetailHeaderOptions: StackHeaderOptions = {
  ...AppHeaderOptions,
  headerTitle: '',
  //   headerLeft: () => <HeaderBack />,
  //   headerRight: () => <HeaderRight stack />,
}
