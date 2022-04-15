export interface ResponseReportRevenue {
  ma_cty: string
  ma_vt: string
  ten_vt: string
  so_luong: number
  tien: number
  loai: string
}

export interface ResponseCustomerList {
  ma_kh: string
  ten_kh: string
  dia_chi: string
  tel: string
  ma_nvkd: string
  ma_nhkh: string
  ten_nhkh: string
}

export interface ResponseReportInventory {
  ma_vt: string
  ten_vt: string
  dvt: string
  so_luong: number
  ma_kho: string
  ma_nhvt: string
  bold: string
  stt: number
  type: string
}

export interface ResponseReportDebt {
  ma_kh: string
  ten_kh: string
  du_no: number
  du_co: number
  ps_no: number
  ps_co: number
  du_no_ck: any
  du_co_ck: any
  ma_plkh1: string
  ma_plkh2: string
  ma_plkh3: string
  ten_plkh1: string
  ten_plkh2: string
  ten_plkh3: string
  sort: string
  khach_hang: number
  cap: number
  has_sysmsg: number
  bold: number
  Type: string
  ten_nhkh: string
}

export interface ResponseReportStockOut {
  ma_cty: string
  stt_rec: string
  ngay_ct: string
  so_ct: string
  ma_kh: string
  ten_kh: string
  ten_nvkd: string
  tt: number | null
  bold: number
  Type: string
}

export interface ResponseDetailInventory {
  stt_rec: string
  stt_rec0: string
  fsort: string
  bold: number
  has_sysmsg: string
  ngay_ct: string
  so_ct: string
  dien_giai: string
  sl_nhap: number
  sl_xuat: number
  ton: number
}

export type detailInvoice = {
  ma_vt: string
  ten_vt: string
  dvt: string
  so_luong: number
  gia2: number
  tien2: number
  ma_kho: string
}

export interface ResponseDetailStockOut {
  ma_cty: string
  stt_rec: string
  ngay_ct: string
  so_ct: string
  ma_kh: string
  ten_kh: string
  ma_nvkd: string
  ten_nvkd: string
  dien_giai: string
  tong_tien_hang: string
  tien_ck: string
  tien_thue: string
  tien_thanh_toan: string
  chi_tiet: detailInvoice[]
}

export interface ResponseDetailDebt {
  ma_ct: string
  ngay_ct: any
  stt_rec: string
  ngay_lct: any
  so_ct: string
  nguoi_gd: string
  dien_giai: string
  tk_du: string
  ps_no: number
  ps_co: number
  fsort: number
  has_sysmsg: number
  bold: number
}

export interface ResponseLookUp {
  MA_VT: string
  TEN_VT: string
}

export interface pickerVT {
  Id: number
  Name: string
  Value: string
}

export interface pickerKho {
  Id: number
  Name: string
  Value: string
  // Address: string
  // Tel: string
}

export interface ResponseBranch {
  ma_dl: string
  ten_dl: string
  so_cccd: string
  ngay_cap_cccd: string
  dia_chi: string
  tel: string
  email: string
  ngung_hoat_dong: boolean
}
