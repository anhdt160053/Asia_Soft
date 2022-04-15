import { NavigatorScreenParams } from '@react-navigation/native'
import {
  ResponseCustomerList,
  ResponseReportDebt,
  ResponseReportInventory,
  ResponseReportStockOut,
} from 'app/screens/main/Report/api/type'

export type AuthParams = {
  SignIn: undefined
  ForgotPass: undefined
  OTP: { username: string }
  ResetPass: { token: string }
}

export type DrawerStackParams = {
  Main: NavigatorScreenParams<StackParams>
}
export type StackParams = {
  Home: { timing: number } | undefined
  AgencyList: { timing: number } | undefined
  OrderList: { timing: number } | undefined
  OrderNew: { newInvoice?: boolean } | undefined
  ProductDetail: { id: string; newInvoice?: boolean }
  Cart: { newInvoice?: boolean } | undefined
  CartInfo: { singleOrder: boolean; discount: number }
  CartSuccess: undefined
  InvoiceList: { timing: number } | undefined
  ReportRevenue: undefined
  ReportInventory:
    | { maVT?: string; maKho?: string; maNhomVT?: string }
    | undefined
  InventoryDetail: {
    item: ResponseReportInventory
    dateRange: {
      dateFrom: string
      dateTo: string
    }
  }
  ReportDebt:
    | {
        maKH?: string
        maNhomKH?: string
        maPLKH1?: string
        maPLKH2?: string
        maPLKH3?: string
        maNVKD?: string
      }
    | undefined
  DebtDetail: {
    item: ResponseReportDebt
    dateRange: {
      dateFrom: string
      dateTo: string
    }
  }
  ChangePass: undefined
  NewSingleInvoice: undefined
  Branch: {
    screen:
      | 'ReportRevenue'
      | 'ReportInventory'
      | 'ReportDebt'
      | 'ReportStockOut'
    branchList: Branch[]
  }
  FilterScreenInventory:
    | { maVT?: string; maNhomVT?: string; maKho?: string }
    | undefined
  FilterScreenDebt:
    | {
        maKH?: string
        maNhomKH?: string
        maPLKH1?: string
        maPLKH2?: string
        maPLKH3?: string
        maNVKD?: string
      }
    | undefined
  FilterScreenStockOut:
    | {
        docs?: string
        status?: string
        maKH?: string
        maNhomKH?: string
        maNVKD?: string
        maKho?: string
      }
    | undefined
  FilterScreenCustomer: { maKH?: string } | undefined
  ReportStockOut:
    | {
        docs?: string
        status?: string
        maKH?: string
        maNhomKH?: string
        maNVKD?: string
        maKho?: string
      }
    | undefined
  StockOutInvoiceDetail: {
    item: ResponseReportStockOut
    dateRange: {
      dateFrom: string
      dateTo: string
    }
  }
  CustomerList: undefined
  CustomerDetail: { item: ResponseCustomerList }
}

export type Branch = {
  name: string
  id: string
}
