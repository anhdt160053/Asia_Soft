import { DateRangeType } from 'app/components/FilterComponent'
import { isString } from 'lodash'
import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const getDate = (days: number | string = 0, format = DATE_FORMAT) => {
  if (isString(days)) {
    return moment(days).format(format)
  }
  return moment().add(days, 'days').format(format)
}

export const getDateRangeStr = (dateRange: DateRangeType) => {
  const { dateFrom, dateTo } = dateRange
  if (dateTo === getDate()) {
    if (dateFrom === getDate(-7) && dateTo === getDate()) {
      return '7 ngày qua'
    }
  }
  if (dateFrom === dateTo && dateFrom === getDate(-1)) {
    return 'Hôm qua'
  }
  if (dateFrom === dateTo && dateFrom === getDate()) {
    return 'Hôm nay'
  }
  if (
    dateFrom === moment().startOf('isoWeek').format(DATE_FORMAT) &&
    dateTo === moment().endOf('isoWeek').format(DATE_FORMAT)
  ) {
    return 'Tuần này'
  }
  if (
    dateFrom ===
      moment().add(-1, 'week').startOf('isoWeek').format(DATE_FORMAT) &&
    dateTo === moment().add(-1, 'week').endOf('isoWeek').format(DATE_FORMAT)
  ) {
    return 'Tuần trước'
  }
  if (
    dateFrom === moment().startOf('month').format(DATE_FORMAT) &&
    dateTo === moment().endOf('month').format(DATE_FORMAT)
  ) {
    return 'Tháng này'
  }
  if (
    dateFrom ===
      moment().add(-1, 'month').startOf('month').format(DATE_FORMAT) &&
    dateTo === moment().add(-1, 'month').endOf('month').format(DATE_FORMAT)
  ) {
    return 'Tháng trước'
  }
  return (
    moment(dateFrom).format('DD/MM/YYYY') +
    ' - ' +
    moment(dateTo).format('DD/MM/YYYY')
  )
}
