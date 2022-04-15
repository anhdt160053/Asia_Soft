import { ColorSchemeName, StatusBar, Platform } from 'react-native'
import {
  useTheme,
  configureFonts,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper'
import { Fonts, Theme } from 'react-native-paper/lib/typescript/types'

import { AppThemeType } from '../context/AppContext'
import dark from './dark'
import light from './light'
import { AppTheme } from './type'

export const sizes = {
  font: 14,
  radius: 6,
  padding: 16,

  //font size
  title: 20,
  headline: 24,
  subheading: 16,
  paragraph: 14,
  caption: 12,
}

const initFont: Fonts = {
  regular: {
    fontFamily: 'Roboto-Regular',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  light: {
    fontFamily: 'Roboto-Light',
    fontWeight: '400',
  },
  thin: {
    fontFamily: 'Roboto-Thin',
    fontWeight: '300',
  },
}

const fontConfig = {
  ios: initFont,
  android: initFont,
}

export const CustomLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...light,
  },
  fonts: configureFonts(fontConfig),
}

export const CustomDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...dark,
  },
  fonts: configureFonts(fontConfig),
}

export function getAppTheme(
  fixedTheme: AppThemeType,
  theme: AppThemeType | undefined,
  color: ColorSchemeName,
) {
  if (fixedTheme !== 'auto') {
    switch (fixedTheme) {
      case 'light':
        return CustomLightTheme
      case 'dark':
        return CustomDarkTheme
    }
  }
  if (!theme || theme === 'auto') {
    switch (color) {
      case 'dark':
        return CustomDarkTheme
      case 'light':
        return CustomLightTheme
    }
  }
  return theme === 'light' ? CustomLightTheme : CustomDarkTheme
}

export function handlerStatusBar(currentTheme: Theme) {
  if (currentTheme === CustomLightTheme) {
    StatusBar.setBarStyle('dark-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF')
    }
  } else {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000000')
    }
    // StatusBar.setBarStyle('light-content');
  }
}

export const useAppTheme = () => {
  return useTheme() as AppTheme
}

export const useAppColors = () => {
  const { colors } = useTheme() as AppTheme
  return colors
}
