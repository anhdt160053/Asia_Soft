import { UserType } from '@vn.starlingTech/context/AppContext'

export enum FUNCTION_ID {
  TONG_QUAN = '01',
  BAO_CAO_XUAT_HANG = '02',
  BAO_CAO_CONG_NO = '03',
  BAO_CAO_TON_KHO = '04',
  DANH_MUC_KH = '05',
  BAO_CAO_DOANH_THU = '06',
}

export interface ApiParams {
  user: UserType
}

export enum LOOK_UP_TYPES {
  VAT_TU = 'VT',
  NHOM_VAT_TU = 'NHVT',
  KHACH_HANG = 'KH',
  NHOM_KHACH_HANG = 'NHKH',
  PHAN_LOAI_KH = 'PLKH',
  NHAN_VIEN_KINH_DOANH = 'NVKD',
  KHO = 'KHO',
}
