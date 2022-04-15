import AppNetworking from '@vn.starlingTech/api/AppNetworking'
import { API } from '@vn.starlingTech/api/Server'
import { UserType } from '@vn.starlingTech/context/AppContext'

import { ResponseConfig } from './type'

export function checkToken(user: UserType) {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    user,
    url: API.EXECUTE_COMMAND,
    showErrorType: 'ALERT',
    params: {
      command: 'CheckToken',
      params: {
        ma_cty: user.ma_cty,
        username: user.username, // Kết quả trả về: 0 còn hạn, 1 hết hạn
      },
    },
  })
  return appNetworking.postToServer()
}

type RegTokenParams = {
  user: UserType
  pushToken: string
}
export function regPushToken({
  user,
  pushToken,
}: RegTokenParams): Promise<{ status: boolean }> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    user,
    url: API.EXECUTE_COMMAND,
    showErrorType: 'ALERT',
    params: {
      command: 'InsPushToken',
      params: {
        ma_cty: user.ma_cty,
        username: user?.username || '',
        push_token: pushToken,
      },
    },
  })
  return appNetworking.postToServer()
}

type Params = {
  user: UserType
  currentPass: string
  newPass: string
}

export function changePassword({
  user,
  currentPass,
  newPass,
}: Params): Promise<{ status: boolean }> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    user,
    url: API.CHANGE_PASS + `/${currentPass}/${newPass}/${newPass}`,
    showErrorType: 'ALERT',
  })
  return appNetworking.getFromServer()
}

export function getConfig({
  user,
}: {
  user?: UserType
}): Promise<[ResponseConfig]> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    user,
    url: API.EXECUTE_COMMAND,
    showErrorType: 'ALERT',
    params: {
      command: 'Getsetup',
      params: {
        ma_cty: user?.ma_cty,
        username: user?.username || '',
      },
    },
  })
  return appNetworking.postToServer()
}
