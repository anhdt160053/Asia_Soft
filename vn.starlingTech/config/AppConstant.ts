import { Dimensions, Platform } from 'react-native'
// import {isTablet} from 'react-native-device-info';

// const forTablet = isTablet();

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const UI_WIDTH = 375

export function appSize(size: number) {
  return (windowWidth * size) / UI_WIDTH
}

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const AppConstants = {
  UI_WIDTH,
  WIDTH: windowWidth,
  HEIGHT: windowHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  IS_IOS: Platform.OS === 'ios',
  SMALL_DEVICE: windowWidth <= 375,
  LIST_SIZE: 12,
  SESSION: {
    LANGUAGE: 'SESSION_language',
    TOKEN: 'SESSION_token',
    USER: 'SESSION_user',
  },
}

export default AppConstants
