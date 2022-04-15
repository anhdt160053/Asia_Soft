import { UserType } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { getString } from '@vn.starlingTech/lang/language'
import axios from 'axios'
import { isEmpty, isString, isUndefined } from 'lodash'
import { Alert } from 'react-native'

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '../helpers/messageHelper'
import { getApiUrl } from './Server'
import { ApiResponseTypes } from './type'

type ErrMsgType = 'MANUAL' | 'FLASH' | 'ALERT'

export type ApiRequestTypes = {
  header?: any
  params?: any
  user?: UserType
  showErrorType?: ErrMsgType
  autoErrMessage?: boolean
  forceNoMessage?: boolean
} & ({ url: string; plainUrl?: string } | { url?: string; plainUrl: string })

type ServerHeaderType = {
  'Content-Type': string
  'Application-Authorization'?: string
  // 'X-AUTH-TOKEN'?: string;
  Accept?: string
}

export default class AppNetworking {
  url: string = ''
  plainUrl?: string
  header: ServerHeaderType = {
    'Content-Type': 'application/json',
    // Accept: '*/*',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'multipart/form-data;',
  }
  params: Record<string, unknown> | string | undefined
  apiKey: string | undefined
  showErrMsgType: ErrMsgType = 'MANUAL'
  autoErrMessage: boolean = true
  forceNoMessage: boolean = false

  init(props: ApiRequestTypes) {
    const {
      url,
      header,
      params,
      showErrorType,
      autoErrMessage,
      user,
      forceNoMessage,
    } = props

    this.forceNoMessage = forceNoMessage || false

    if (isString(props.plainUrl) && !isEmpty(props.plainUrl)) {
      this.url = props.plainUrl
    } else {
      this.url = url ? getApiUrl(url) : ''
    }

    this.header = { ...this.header, ...header }
    this.autoErrMessage = autoErrMessage !== undefined ? autoErrMessage : true
    this.showErrMsgType = showErrorType || 'MANUAL'
    this.params = params

    if (user) {
      this.header = {
        ...this.header,
        // ...{Authorization: 'Bearer ' + token},
        ...{
          token: user.token,
          username: user.username,
          companyId: user.ma_cty,
        },
      }
    }

    axios.defaults.headers = this.header
  }

  // async deleteData() {
  //   const data = {
  //     url: this.plainUrl ? this.plainUrl : this.url ? getApiUrl(this.url) : '',
  //     params: this.params,
  //     header: this.header,
  //   };

  //   return deleteOnServer(data).then(() => {
  //     // return this.handlerResponse(responseData);
  //   });
  // }

  // async putToServer() {
  //   const data = {
  //     url: this.plainUrl ? this.plainUrl : this.url ? getApiUrl(this.url) : '',
  //     params: this.params,
  //     header: this.header,
  //   };

  //   return putToServer(data).then(() => {
  //     // return this.handlerResponse(responseData);
  //   });
  // }

  async postToServer() {
    let params = this.params

    if (this.header['Content-Type'] === 'application/x-www-form-urlencoded') {
      params = JSON.stringify(params)
    }

    //set timeout 10s
    axios.defaults.timeout = 10000

    return axios
      .post(this.url, params)
      .then(({ data }) => {
        return this.handlerResponse(data)
      })
      .catch((error) => {
        if (!this.forceNoMessage) {
          // consoleLog(error, 'postToServer Error')
          // Alert.alert(
          //   'Lỗi',
          //   'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
          // );
        }
        // consoleLog(error, 'postToServer Error')
        throw new Error(error)
      })
    // consoleLog(data, 'postToServer data');
    // return this.handlerResponse(data);
  }

  async getFromServer() {
    // consoleLog(this.header, 'header');
    // consoleLog(this.params, 'params');
    axios.defaults.timeout = 10000
    return axios
      .get(this.url, {
        // params: this.params,
        data: JSON.stringify(this.params),
      })
      .then(({ data }) => {
        return this.handlerResponse(data)
      })
      .catch((error) => {
        if (!this.forceNoMessage) {
          // consoleLog(error, 'postToServer Error')
          Alert.alert(
            'Lỗi',
            'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
          )
        }
        throw new Error(error)
        // return error;
      })
    // consoleLog(data, 'getFromServer');
    // return this.handlerResponse(data);
  }

  async fetchFromServer() {
    const myHeaders = new Headers()
    myHeaders.append('companyid', '001')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      keyph: "  ngay_ct between '20210101' and '20211231'",
      keyct: 'DL001',
    })

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    return fetch(
      'http://asiasoft.info:14569/Lumos/Others/SO1List',
      requestOptions,
    )
  }

  handlerResponse = (responseData: ApiResponseTypes) => {
    const response = responseData
    const { status, data, Message } = responseData
    //TODO: handler response data if need
    if (status) {
      if (status.code === 200) {
        // const {code} = data;
        // consoleLog(code, 'code');
        if (status.message) {
          if (data === false) {
            consoleLog(response, 'error')
            showFlashMessageError(status.message)
            return false
          } else {
            showFlashMessageSuccess(status.message)
          }
        }
        return data
      } else {
        this.responseHasError(status.message, `Lỗi ${status}`)
      }
    } else {
      this.responseHasError(Message || 'Đã có lỗi xảy ra', 'Lỗi')
    }
    return response.data
  }

  responseHasError = (message: string, title: string) => {
    switch (this.showErrMsgType) {
      case 'ALERT':
        Alert.alert(
          title || getString().errorTitle,
          message || getString().error,
        )
        break
      case 'FLASH':
        showFlashMessageError(message)
        break
    }
  }
}

export function handlerApiResponseError(error: any) {
  consoleLog(error, 'error')
  const { response, message: errorMsg } = error

  const title = getString().errorTitle
  const message = errorMsg || getString().errorResponse

  if (isUndefined(response)) {
    // consoleLog('undefined response');
    return {
      title,
      message,
    }
  }
  const { status } = response

  if (status >= 500) {
    return {
      title,
      message: status + ' - ' + getString().errorResponse,
    }
  }

  if (status === 401) {
    return { title: 'Lỗi 401', message }
  }

  if (status >= 400) {
    return { title, message: status + getString().errorNetwork }
  }
  return { title, message }
}
