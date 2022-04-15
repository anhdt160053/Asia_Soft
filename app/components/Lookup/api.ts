import AppNetworking from '@vn.starlingTech/api/AppNetworking'
import { API } from '@vn.starlingTech/api/Server'
import { useQuery } from 'react-query'

import { API_Lookup_Params, RespType_Lookup } from './types'

const keys = {
  lookUp: (type: string) => ['list', 'lookUp', type] as const,
}

export function getLookUp({
  user,
  type,
}: API_Lookup_Params): Promise<RespType_Lookup[]> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Lookup',
      params: {
        ma_cty: user.ma_cty,
        loai: type,
        username: user.username,
      },
    },
  })
  return appNetworking.postToServer()
}

export function useLookup({ user, type }: API_Lookup_Params) {
  return useQuery([keys.lookUp(type), type], () => getLookUp(user, type))
}
