import { FUNCTION_ID } from 'app/types'

export interface LoginResponse {
  loginstatus: boolean
  isAdmin: boolean
  isGrand: boolean
  token: string
}

// Generated by https://quicktype.io

export interface ResponseUser {
  ma_cty: string
  ma_nvns: string
  ho_ten: string
  base64: string
  FunctionId: FUNCTION_ID[]
}

export interface ResponseConfirmCode {
  Table: [{ token: string }]
}

export interface ResponseResetPass {
  status: boolean
}
