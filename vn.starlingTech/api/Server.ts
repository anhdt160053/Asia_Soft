import settings from '@vn.starlingTech/config/settings'

export const BASE_URL = settings.FOR_DEV
  ? 'http://asiasoft.info:14569/TQTAPI/'
  : 'http://asiasoft.info:14569/TQTAPI/'

const VERSION = ''
export const API = {
  BASE_URL,
  SIGN_IN: 'sys/login',
  CHANGE_PASS: 'sys/changepass',
  GET_USER_INFO: 'Others/UserInfo',
  GET_REVENUE: 'dashboard/revenue',
  GET_REVENUE_PIE: 'dashboard/branch',
  GET_TOP_10: 'dashboard/stock',
  EXECUTE_COMMAND: 'common/excutecommand',
  GETVOUCHER: 'Others/GetVoucher',
  GET_ORDER_LIST: 'Others/SO1ListByUser',
  ADD_NEW_ORDER: 'Others/So1Insert', //'voucher/insert/so1',
  UPDATE_ORDER: 'voucher/update/so1',
  GET_INVOICE_LIST: 'Others/SO3List',
  ADD_NEW_INVOICE: 'Others/So3Insert', //'voucher/insert/so3',
  GET_LIST: 'list.php',
  GET_CONTACTS: 'contact.php',
  TOGGLE_NOTIFICATION: 'notification.php',
  FORGOT_PASS_EMAIL: 'Others/SendEmail',
  FORGOT_PASS_OTP: 'Others/ValidateCode',
  FORGOT_PASS_RESET: 'sys/changepass/forgot/',
}

export const SV_CONFIG = {
  COMPANY_ID: '001',
}

export const WEBVIEW_URL = {
  MAP: 'https://www.lemino.vn/appmobile/cua-hang.html',
  NOTIFICATION: 'https://www.lemino.vn/appmobile/thong-bao.html',
  ACCOUNT: 'https://www.lemino.vn/appmobile/tich-diem.html',
}

export const getApiUrl = (apiStr: string) => `${BASE_URL}${VERSION}${apiStr}`
export const getApiWebviewUrl = (apiStr: string) => BASE_URL + '/' + apiStr
