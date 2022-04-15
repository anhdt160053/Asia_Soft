import { ApiParams, LOOK_UP_TYPES } from 'app/types'

export interface API_Lookup_Params extends ApiParams {
  type: LOOK_UP_TYPES
}

export interface RespType_Lookup {
  name: string
  code: string
  dia_chi?: string
  tel?: string
}
