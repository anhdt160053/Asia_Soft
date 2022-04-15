import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native'
import AppCodePush from '@vn.starlingTech/components/AppCodePush'
import settings from '@vn.starlingTech/config/settings'
import NetworkStatus from '@vn.starlingTech/context/NetStatus'
import { merge } from 'lodash'
import React, { ReactNode } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import FlashMessage from 'react-native-flash-message'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  CustomLightTheme,
  handlerStatusBar,
  getAppTheme,
} from '../theme/theming'
import { useAppContext } from './AppContext'

import '../config/SentryConfig'
import '../config/ReactotronConfig'

const queryClient = new QueryClient()

type Props = {
  children: ReactNode
  onReady?: () => void
}

export default function (props: Props) {
  const { theme } = useAppContext()
  // const theme = 'light';
  const color = useColorScheme()
  const currentTheme = getAppTheme(settings.THEME, theme, color)
  // consoleLog(currentTheme, 'currentTheme');
  handlerStatusBar(currentTheme)

  const navigationTheme =
    currentTheme === CustomLightTheme
      ? merge(NavigationDefaultTheme, currentTheme)
      : merge(NavigationDarkTheme, currentTheme)

  function onNavigationReady() {
    RNBootSplash.hide({ fade: true })
  }

  return (
    <PaperProvider theme={currentTheme}>
      <SafeAreaProvider>
        <>
          {settings.NETWORK_STATUS && <NetworkStatus />}
          {settings.CODE_PUSH && <AppCodePush />}
          <NavigationContainer
            onReady={props?.onReady || onNavigationReady}
            theme={navigationTheme}
          >
            <QueryClientProvider client={queryClient}>
              {props.children}
            </QueryClientProvider>
          </NavigationContainer>
          <FlashMessage
            textProps={{ allowFontScaling: false }}
            position="top"
            statusBarHeight={StatusBar.currentHeight}
          />
        </>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
