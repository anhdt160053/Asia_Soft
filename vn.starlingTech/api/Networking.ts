import axios from 'axios'
import { clone, isUndefined, isEqual } from 'lodash'

export interface ApiResponseTypes {
  data: any
  success: boolean
  message: string | undefined
  title?: string
  total?: number
}

export const initialResponse: ApiResponseTypes = {
  data: null,
  success: false,
  message: undefined,
}

type NetworkingProps = {
  url: string
  params?: any
  header?: any
}

export const deleteOnServer = async ({ url, header }: NetworkingProps) => {
  // consoleLog(url, params);
  // let apiParams = params;
  if (header) {
    axios.defaults.headers = header
    // if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
    //   console.info(params);
    //   apiParams = qs.stringify(params);
    // }
  }
  return axios
    .delete(url)
    .then((response) => {
      //handle response
      const apiResponse = clone(initialResponse)
      apiResponse.data = response.data
      apiResponse.status = 1
      // consoleLog('here?');
      return { data: apiResponse }
      // return response;
    })
    .catch((error) => handlerError(error))
}

export const putToServer = async ({ url, params, header }: NetworkingProps) => {
  // consoleLog(url, params);
  let apiParams = params
  if (header) {
    axios.defaults.headers = header
    if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
      console.info(params)
      apiParams = JSON.stringify(params)
    }
  }
  return axios
    .put(url, apiParams)
    .then((response) => {
      return handlerResponse(response.data)
    })
    .catch((error) => handlerError(error))
}

export const postToServer = async ({
  url,
  params,
  header,
}: NetworkingProps) => {
  // consoleLog(url, params);
  let apiParams = params
  if (header) {
    axios.defaults.headers = header
    if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
      console.info(params)
      apiParams = JSON.stringify(params)
    }
  }
  axios.defaults.timeout = 5000
  axios.defaults.timeoutErrorMessage = 'Timeout!'

  return axios
    .post(url, apiParams)
    .then((response) => {
      return handlerResponse(response.data)
    })
    .catch((error) => handlerError(error))
}

export const getFromServer = async ({
  url,
  params,
  header,
}: NetworkingProps) => {
  if (header) {
    axios.defaults.headers = header
  }
  const apiParams = { params: params || null }
  return axios
    .get(url, apiParams)
    .then((response) => {
      //handle response
      return handlerResponse(response.data)
    })
    .catch((error) => handlerError(error))
}

function handlerResponse({ success, message, messageTitle, data, total }: any) {
  const apiResponse = clone(initialResponse)
  // consoleLog(data, total);
  if (success) {
    apiResponse.status = 1
    apiResponse.data = data
    apiResponse.message = message
    apiResponse.total = Number(total) || 0
  } else {
    apiResponse.status = -99
    apiResponse.error = true
    apiResponse.message = message
    apiResponse.messageTitle = messageTitle
  }
  return { data: apiResponse }
}

async function handlerError(error: any) {
  // consoleLog(error, 'error');
  const { response } = error
  const apiResponse = clone(initialResponse)
  if (isUndefined(response)) {
    // consoleLog('undefined response');
    return responseNetworkError()
  }
  // consoleLog(response, 'error response');
  const { status, data } = response
  if (isUndefined(status)) {
    apiResponse.error = true
    return { data: apiResponse }
  } else if (!isUndefined(data)) {
    if (status >= 500) {
      return responseServerError(status, data)
    }
    if (status >= 400) {
      apiResponse.status = status
      apiResponse.error = true
      return { data: apiResponse }
    }
    apiResponse.error = true
    const message = data.message
    apiResponse.message = message
    return { data: apiResponse }
  }
  return responseNetworkError()
}

function responseNetworkError(message?: string) {
  const apiResponse = clone(initialResponse)
  apiResponse.error = true
  apiResponse.networkError = true
  apiResponse.message = message
  // consoleLog(apiResponse, 'responseNetworkError');
  return { data: apiResponse }
}

function responseServerError(status?: number, data?: any) {
  const apiResponse = clone(initialResponse)
  apiResponse.error = true
  if (status) {
    apiResponse.status = status
  }
  if (data) {
    apiResponse.data = data
  }
  return { data: apiResponse }
}

export const isSuccessResponse = (status?: number, successStatus: number = 1) =>
  isEqual(status, successStatus)
