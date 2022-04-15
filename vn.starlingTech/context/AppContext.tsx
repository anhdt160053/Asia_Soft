import { FUNCTION_ID } from 'app/types'
import React, { useContext } from 'react'

export type UserType = {
  id?: string | number
  username: string
  ma_cty: string
  name: string
  avatar: string
  functionIds: FUNCTION_ID[]
  token: string
  isAdmin: boolean
  ma_nvns: string
}

export type AppThemeType = 'auto' | 'light' | 'dark'

export type SettingType = {
  status: number
}

export type AppContextType = {
  token: string
  user?: UserType
  theme?: AppThemeType
  notification: number
  setting?: SettingType
  dispatchTheme?: (_t: AppThemeType) => void
  dispatchSetting: (_t: SettingType) => void
  signIn: (_user: UserType) => void
  signOut: () => void
}

const initialContext: AppContextType = {
  token: '',
  user: {
    id: '',
    name: '',
    username: '',
    ma_cty: '',
    functionIds: [],
    avatar: '',
    token: '',
    isAdmin: false,
    ma_nvns: '',
  },
  notification: 0,
  // dispatchTokenExpired: () => {},
  dispatchSetting: (_t: SettingType) => {},
  signIn: () => {},
  signOut: () => {},
}

export const AppContext = React.createContext<AppContextType>(initialContext)

export const useAppContext = () => useContext(AppContext)
