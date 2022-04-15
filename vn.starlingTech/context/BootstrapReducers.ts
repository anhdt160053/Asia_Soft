import { UserType, AppThemeType } from '@vn.starlingTech/context/AppContext'
import { isNumber } from 'lodash'

export interface BootstrapState {
  isLoading: boolean
  notification: number
  user?: UserType
  token: string
  tokenExpired: boolean
  theme?: AppThemeType
}

export type BootstrapActionTypes =
  | 'NO_TOKEN'
  | 'RESTORE_TOKEN'
  | 'NOTIFICATION_BADGE'
  | 'SIGN_IN'
  | 'SIGN_OUT'
  | 'DATA_LOADED'
  | 'TOKEN_EXPIRED'
  | 'THEME'

export interface BootstrapActions {
  type: BootstrapActionTypes
  data?: {
    user?: UserType
    notification?: number
    theme?: AppThemeType
    token?: string
  }
}

export function bootstrapReducer(
  prevState: BootstrapState,
  { type, data }: BootstrapActions,
): BootstrapState {
  switch (type) {
    case 'NO_TOKEN':
      return {
        ...prevState,
        token: '',
        isLoading: false,
      }
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: data?.token || '',
        isLoading: false,
      }
    case 'NOTIFICATION_BADGE':
      return {
        ...prevState,
        notification: isNumber(data) ? data : 0,
      }
    case 'SIGN_IN':
      return {
        ...prevState,
        isLoading: false,
        token: data?.user?.token || '',
        user: data?.user,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        user: undefined,
        isLoading: false,
        tokenExpired: false,
      }
    case 'DATA_LOADED':
      return {
        ...prevState,
        isLoading: false,
        tokenExpired: false,
      }
    case 'TOKEN_EXPIRED':
      return {
        ...prevState,
        tokenExpired: true,
      }
    case 'THEME':
      return {
        ...prevState,
        theme: data?.theme || 'auto',
      }
    default:
      return prevState
  }
}
