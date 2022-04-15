import AppNetworking from '@vn.starlingTech/api/AppNetworking'
import { API } from '@vn.starlingTech/api/Server'
import { UserType } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { DateRangeType } from 'app/components/FilterComponent'
import moment from 'moment'

import {
  RespType_PieRevenue,
  RespType_Revenue,
  RespType_TopStock,
} from './type'

export function getRevenue(
  user: UserType,
  dateRange: DateRangeType,
): Promise<RespType_Revenue[]> {
  const appNetwork = new AppNetworking()

  const params = {
    username: user.username,
    ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
    ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
  }
  consoleLog(params, 'pr')
  appNetwork.init({
    user,
    url: API.EXECUTE_COMMAND,
    params: {
      command: 'Report08',
      params,
    },
  })
  return appNetwork.postToServer()
}

export function getPieRevenue(
  user: UserType,
  dateRange: DateRangeType,
): Promise<RespType_PieRevenue[]> {
  const appNetwork = new AppNetworking()

  const params = {
    username: user.username,
    ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
    ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
  }
  consoleLog(params, 'pr')
  appNetwork.init({
    user,
    url: API.EXECUTE_COMMAND,
    params: {
      command: 'Report10',
      params,
    },
  })
  return appNetwork.postToServer()
}

export function getTop10(
  user: UserType,
  dateRange: DateRangeType,
  type: 'DT' | 'SL',
): Promise<RespType_TopStock[]> {
  const appNetwork = new AppNetworking()
  appNetwork.init({
    user,
    url: API.EXECUTE_COMMAND,
    params: {
      command: 'Report09',
      params: {
        username: user.username,
        ngay1: dateRange.dateFrom,
        ngay2: dateRange.dateTo,
        BySlDt: type, // SL: Theo số lượng, DT: Theo doanh thu
      },
    },
  })
  return appNetwork.postToServer()
}
