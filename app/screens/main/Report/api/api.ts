import AppNetworking from '@vn.starlingTech/api/AppNetworking'
import { API } from '@vn.starlingTech/api/Server'
import { UserType } from '@vn.starlingTech/context/AppContext'

import {
  ResponseBranch,
  ResponseCustomerList,
  ResponseDetailDebt,
  ResponseDetailInventory,
  ResponseDetailStockOut,
  ResponseReportDebt,
  ResponseReportInventory,
  ResponseReportRevenue,
  ResponseReportStockOut,
} from './type'
// import {LoginResponse} from './type';

export const reportKeys = {
  all: ['report'] as const,
  revenue: () => [...reportKeys.all, 'revenue'] as const,
  inventory: (s: string) => [...reportKeys.all, 'inventory'] as const,
  detailInventory: () => [...reportKeys.all, 'detailInventory'] as const,
  debt: () => [...reportKeys.all, 'debt'] as const,
  detailDebt: () => [...reportKeys.all, 'detailDebt'] as const,
  stockOut: () => [...reportKeys.all, 'stockOut'] as const,
  detailStockOutInvoice: () =>
    [...reportKeys.all, 'detailStockOutInvoice'] as const,
  customer: () => [...reportKeys.all, 'customer'] as const,
  lookUp: (type: string) => [...reportKeys.all, 'lookUp', type] as const,
}

type ParamsRevenue = {
  user: UserType
  ngay1: string
  ngay2: string
  ma_dl: string
}

type ParamsCustomer = {
  user: UserType
  ma_kh: string
}

type ParamsInventory = {
  user: UserType
  ngay1: string
  ngay2: string
  ma_vt: string
  ma_nhvt: string
  ma_kho: string
}

type ParamsDetailStockOut = {
  ma_cty: string
  user: UserType
  stt_rec: string
}

type ParamsDebt = {
  user: UserType
  ngay1: string
  ngay2: string
  ma_kh: string
  ma_nhkh: string
  ma_plkh1: string
  ma_plkh2: string
  ma_plkh3: string
  ma_nvkd: string
}

type ParamsStockOut = {
  user: UserType
  ngay1: string
  ngay2: string
  ma_ct: string
  trang_thai: string
  ma_kh: string
  ma_nhkh: string
  ma_kho: string
  ma_nvkd: string
}

export function getReportRevenue({
  user,
  ngay1,
  ngay2,
  ma_dl,
}: // dateFrom,
// dateTo,
// branchId,
ParamsRevenue): Promise<ResponseReportRevenue[]> {
  const appNetworking = new AppNetworking()

  // let branchesStr = '';
  // branchIds?.forEach(item => {
  //   branchesStr += item + ',';
  // });
  // branchesStr = branchesStr.substring(0, branchesStr.length - 1);
  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report02',
      params: {
        username: user.username,
        ngay1,
        ngay2,
        ma_dl,
        // ngay1: moment(dateFrom).format('YYYY/MM/DD'),
        // ngay2: moment(dateTo).format('YYYY/MM/DD'),
        // ma_dl: branchId,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getCustomerList({
  user,
  ma_kh,
}: ParamsCustomer): Promise<ResponseCustomerList[]> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'GetCustomers',
      params: {
        username: user.username,
        ma_kh,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getReportInventory({
  user,
  // dateTo,
  // branchId,
  ngay1,
  ngay2,
  ma_vt,
  ma_nhvt,
  ma_kho,
}: // }: Params): Promise<ResponseReportRevenue[]> {
ParamsInventory): Promise<ResponseReportInventory[]> {
  const appNetworking = new AppNetworking()

  // let branchesStr = '';
  // branchIds?.forEach(item => {
  //   branchesStr += item + ',';
  // });
  // branchesStr = branchesStr.substring(0, branchesStr.length - 1);

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report04',
      params: {
        username: user.username,
        // ngay: dateTo,
        // ma_dl: branchId,
        ngay1,
        ngay2,
        ma_vt,
        ma_nhvt,
        ma_kho,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getReportDebt({
  user,
  ngay1,
  ngay2,
  ma_kh,
  ma_nhkh,
  ma_plkh1,
  ma_plkh2,
  ma_plkh3,
  ma_nvkd,
}: ParamsDebt): Promise<ResponseReportDebt[]> {
  const appNetworking = new AppNetworking()

  // let branchesStr = '';
  // branchIds?.forEach(item => {
  //   branchesStr += item + ',';
  // });
  // branchesStr = branchesStr.substring(0, branchesStr.length - 1);

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report06',
      params: {
        username: user.username,
        ngay1,
        ngay2,
        ma_kh,
        ma_nhkh,
        ma_plkh1,
        ma_plkh2,
        ma_plkh3,
        ma_nvkd,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getReportStockOut({
  user,
  ngay1,
  ngay2,
  ma_ct,
  trang_thai,
  ma_kh,
  ma_nhkh,
  ma_kho,
  ma_nvkd,
}: ParamsStockOut): Promise<ResponseReportStockOut[]> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report03',
      params: {
        username: user.username,
        ngay1,
        ngay2,
        ma_ct,
        trang_thai,
        ma_kh,
        ma_nhkh,
        ma_kho,
        ma_nvkd,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getDetailInventory({
  user,
  ngay1,
  ngay2,
  ma_vt,
  ma_nhvt,
  ma_kho,
}: ParamsInventory): Promise<ResponseDetailInventory[]> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report05',
      params: {
        username: user.username,
        ngay1,
        ngay2,
        ma_vt,
        ma_nhvt,
        ma_kho,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getDetailStockOutInvoice({
  ma_cty,
  user,
  stt_rec,
}: ParamsDetailStockOut): Promise<ResponseDetailStockOut> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.GETVOUCHER,
    user,
    params: {
      // command: 'Report05',
      ma_cty,
      username: user.username,
      stt_rec,
      // params:
      //   ma_cty,
      //   username: user.username,
      //   stt_rec,
      // ,
    },
  })
  return appNetworking.postToServer()
}

export function getDetailDebt({
  user,
  ngay1,
  ngay2,
  ma_kh,
  ma_nhkh,
  ma_plkh1,
  ma_plkh2,
  ma_plkh3,
  ma_nvkd,
}: ParamsDebt): Promise<ResponseDetailDebt[]> {
  const appNetworking = new AppNetworking()

  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'Report07',
      params: {
        username: user.username,
        ngay1,
        ngay2,
        ma_kh,
        ma_nhkh,
        ma_plkh1,
        ma_plkh2,
        ma_plkh3,
        ma_nvkd,
      },
    },
  })
  return appNetworking.postToServer()
}

export function getListBranches(user: UserType): Promise<ResponseBranch[]> {
  const appNetworking = new AppNetworking()
  appNetworking.init({
    url: API.EXECUTE_COMMAND,
    user,
    params: {
      command: 'GetInfoAllCus',
      params: {
        username: user.username,
      },
    },
  })
  return appNetworking.postToServer()
}
