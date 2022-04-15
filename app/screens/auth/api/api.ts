import AppNetworking from '@vn.starlingTech/api/AppNetworking'
import { API } from '@vn.starlingTech/api/Server'
import { UserType } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import {
  showFlashMessageError,
  showMessageSuccess,
} from '@vn.starlingTech/helpers/messageHelper'
import { Alert } from 'react-native'
import { useMutation } from 'react-query'

import {
  LoginResponse,
  ResponseConfirmCode,
  ResponseResetPass,
  ResponseUser,
} from './type'

type LoginParams = {
  username: string
  password: string
}

function onLogin({ username, password }: LoginParams): Promise<LoginResponse> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.SIGN_IN + `/${username}/${password}`,
    showErrorType: 'ALERT',
    forceNoMessage: true,
  })
  return appNetworking.getFromServer()
}

function getUserInfo(user: UserType): Promise<ResponseUser> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.GET_USER_INFO,
    // showErrorType: 'ALERT',
    forceNoMessage: true,
    user,
    params: {
      username: user.username,
    },
  })
  return appNetworking.postToServer()
}

type UseUserParams = {
  onSuccess: (user: UserType) => void
  onError?: () => void
  onSilentError?: () => void
}

export const useUserInfo = (props: UseUserParams) => {
  return useMutation((user: UserType) => getUserInfo(user), {
    onSuccess: (data, params) => {
      if (data) {
        const tmpUser: UserType = {
          username: params.username,
          token: params.token,
          id: data.ma_nvns,
          name: data.ho_ten,
          ma_cty: data.ma_cty,
          avatar: data.base64,
          functionIds: data.FunctionId,
          isAdmin: params.isAdmin,
          ma_nvns: data.ma_nvns
        }
        props.onSuccess(tmpUser)
      } else if (props.onError) {
        Alert.alert(
          'Lỗi',
          'Không thể lấy thông tin người dùng.\nCó thể hệ thống đang được cập nhật',
        )
        props.onError()
      } else if (props.onSilentError) {
        props.onSilentError()
      }
    },
    onError: (error: any) => {
      if (props.onError) {
        Alert.alert('Lỗi', error.message)
        props.onError()
      } else if (props.onSilentError) {
        props.onSilentError()
      }
    },
  })
}

type UseLoginParams = {
  onSuccess: (user: UserType) => void
  onError: () => void
}
export const useLogin = (props: UseLoginParams) => {
  return useMutation((params: LoginParams) => onLogin(params), {
    onSuccess: (data, params) => {
      if (data.loginstatus && data.token) {
        const tmpUser: UserType = {
          username: params.username,
          token: data.token,
          isAdmin: data.isAdmin,
        }
        props.onSuccess(tmpUser)
      } else {
        Alert.alert('Lỗi', 'Tài khoản hoặc mật khẩu không hợp lệ')
        props.onError()
      }
    },
    onError: (error: any) => {
      Alert.alert('Lỗi đăng nhập', error.message)
      props.onError()
    },
  })
}

type AvatarUserParams = {
  user: UserType
  image: string
}

function updateUserAvatar({
  user,
  image,
}: AvatarUserParams): Promise<ResponseUser[]> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'UpdInfoUser',
      params: {
        username: user.username,
        image,
      },
    },
  })
  return appNetworking.postToServer()
}

export const useUpdateUserAvatar = () => {
  return useMutation(
    ({ user, image }: AvatarUserParams) => updateUserAvatar({ user, image }),
    {
      onSuccess: () => {
        showMessageSuccess('Đã cập nhật ảnh đại diện')
      },
      onError: () => {
        showFlashMessageError('Không thể cập nhật ảnh đại diện')
      },
    },
  )
}

type ForgotPassParams = {
  username: string
}

export function forgotPass({
  username,
}: ForgotPassParams): Promise<ResponseUser[]> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.FORGOT_PASS_EMAIL,
    showErrorType: 'ALERT',
    forceNoMessage: true,
    params: {
      username,
    },
  })
  return appNetworking.postToServer()
}

type ConfirmCodeParams = {
  username: string
  code: string
}
export function confirmCode({
  code,
  username,
}: ConfirmCodeParams): Promise<ResponseConfirmCode> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.FORGOT_PASS_OTP,
    showErrorType: 'ALERT',
    forceNoMessage: true,
    params: {
      code,
      username,
    },
  })
  return appNetworking.postToServer()
}

type ResetPassParams = {
  password: string
  token: string
}
export function resetPass({
  password,
  token,
}: ResetPassParams): Promise<ResponseResetPass> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.FORGOT_PASS_RESET + `${password}/${password}`,
    // showErrorType: 'ALERT',
    forceNoMessage: true,
    header: {
      token,
    },
  })
  return appNetworking.getFromServer()
}
