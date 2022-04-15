import { useActionSheet } from '@expo/react-native-action-sheet'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppButton from '@vn.starlingTech/components/AppButton'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import AppConstants, { appSize } from '@vn.starlingTech/config/AppConstant'
import light from '@vn.starlingTech/theme/light'
import { DATE_FORMAT, getDate, getDateRangeStr } from 'app/helper/TimeHelper'
import { LOOK_UP_TYPES } from 'app/types'
import CalendarIconTQT from 'assets/svg/CalendarIconTQT'
import CustomerIconTQT from 'assets/svg/CustomerIconTQT'
import FilterIconTQT from 'assets/svg/FilterIconTQT'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Modal from 'react-native-modal'

import PickerModalComponent from './Lookup/PickerModalComponent'

export type DateRangeType = { dateFrom: string; dateTo: string }

type Props = {
  dateRange: DateRangeType
  setDateRange: (params: DateRangeType) => void
  filter?: boolean
  filterSize?: number
  onPressFilter?: () => void
  customerFilter?: true | undefined
  maKH?: string
  setMaKH?: (t: string) => void
}

export default (props: Props) => {
  const { dateRange } = props

  const { showActionSheetWithOptions } = useActionSheet()

  const [cusDateFrom, setCusDateFrom] = useState(
    moment(dateRange.dateFrom).toDate(),
  )
  const [cusDateTo, setCusDateTo] = useState(moment(dateRange.dateTo).toDate())
  const [focusDateFrom, setFocusDateFrom] = useState(true)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (
      moment(cusDateFrom).endOf('year').format(DATE_FORMAT) !==
      moment(cusDateTo).endOf('year').format(DATE_FORMAT)
    ) {
      setCusDateTo(moment(cusDateFrom).endOf('year').toDate())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cusDateFrom])

  const hideModal = () => {
    setShowModal(false)
  }

  const onSubmit = () => {
    props.setDateRange({
      dateFrom: moment(cusDateFrom).format(DATE_FORMAT),
      dateTo: moment(cusDateTo).format(DATE_FORMAT),
    })
    hideModal()
  }

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex > -1 && buttonIndex < 8) {
          let dateFrom = dateRange.dateFrom
          let dateTo = dateRange.dateTo
          switch (buttonIndex) {
            case 0:
              dateFrom = getDate(-7)
              dateTo = getDate()
              break
            case 1:
              dateFrom = getDate(-1)
              dateTo = getDate(-1)
              break
            case 2:
              dateFrom = getDate()
              dateTo = getDate()
              break
            case 3:
              dateFrom = moment().startOf('isoWeek').format('YYYY-MM-DD')
              dateTo = moment().endOf('isoWeek').format('YYYY-MM-DD')
              break
            case 4:
              dateFrom = moment()
                .add(-1, 'week')
                .startOf('isoWeek')
                .format('YYYY-MM-DD')
              dateTo = moment()
                .add(-1, 'week')
                .endOf('isoWeek')
                .format('YYYY-MM-DD')
              break
            case 5:
              dateFrom = moment().startOf('months').format('YYYY-MM-DD')
              dateTo = moment().endOf('months').format('YYYY-MM-DD')
              break
            case 6:
              dateFrom = moment()
                .add(-1, 'month')
                .startOf('months')
                .format('YYYY-MM-DD')
              dateTo = moment()
                .add(-1, 'month')
                .endOf('months')
                .format('YYYY-MM-DD')
              break
            case 7:
              setShowModal(true)
              break
          }
          props.setDateRange({ dateFrom, dateTo })
        }
      },
    )
  }

  return (
    <>
      <AppBlock style={styles.container}>
        <Pressable onPress={openActionSheet}>
          <View style={styles.rowDateRange}>
            <CalendarIconTQT width={appSize(18)} />
            <AppText light style={styles.ml8}>
              {getDateRangeStr(dateRange)}
            </AppText>
          </View>
        </Pressable>

        {props.customerFilter ? (
          <PickerModalComponent
            selected={props.maKH}
            onSelected={props.setMaKH}
            lookUpType={LOOK_UP_TYPES.KHACH_HANG}
            title="Mã khách hàng"
            renderSelectView={() => (
              <AppBlock style={styles.rowLocation}>
                <CustomerIconTQT width={appSize(18)} />
                <AppText light style={styles.ml8}>
                  {props.maKH || 'Khách hàng'}
                </AppText>
              </AppBlock>
            )}
          />
        ) : null}

        {props.filter ? (
          <Pressable onPress={props.onPressFilter}>
            <View style={styles.rowLocation}>
              <AppText light style={styles.mr8}>
                Bộ lọc
              </AppText>
              <FilterIconTQT width={appSize(18)} />
              {props.filterSize && props.filterSize > 0 ? (
                <AppBlock style={styles.badge}>
                  <AppText center color="#FFF" size={10}>
                    {props.filterSize}
                  </AppText>
                </AppBlock>
              ) : null}
            </View>
          </Pressable>
        ) : null}
      </AppBlock>
      <Modal
        animationIn="fadeInDown"
        animationOut="fadeOutDown"
        coverScreen
        isVisible={showModal}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        deviceWidth={AppConstants.WIDTH}
        style={AppStyles.noMargin}
      >
        <View style={styles.modalContent}>
          <AppText center primary>
            Tuỳ chọn khoảng thời gian
          </AppText>
          <View style={styles.rowDateInput}>
            <Pressable
              onPress={() => setFocusDateFrom(true)}
              style={[
                styles.dateInput,
                focusDateFrom && styles.dateInputActive,
              ]}
            >
              <AppText>{moment(cusDateFrom).format('DD/MM/YYYY')}</AppText>
            </Pressable>
            <AppText>tới</AppText>
            <Pressable
              onPress={() => setFocusDateFrom(false)}
              style={[
                styles.dateInput,
                !focusDateFrom && styles.dateInputActive,
              ]}
            >
              <AppText>{moment(cusDateTo).format('DD/MM/YYYY')}</AppText>
            </Pressable>
          </View>
          <View style={styles.center}>
            {focusDateFrom ? (
              <DatePicker
                date={cusDateFrom}
                onDateChange={setCusDateFrom}
                mode="date"
              />
            ) : (
              <DatePicker
                minimumDate={cusDateFrom}
                maximumDate={moment(cusDateFrom).endOf('year').toDate()}
                date={cusDateTo}
                mode="date"
                onDateChange={setCusDateTo}
              />
            )}
          </View>
          <View style={styles.rowBtn}>
            <AppButton
              radius={10}
              onPress={hideModal}
              text="Huỷ"
              textColor={light.icon}
              style={styles.btn}
            />
            <AppButton
              radius={10}
              disabled={cusDateTo < cusDateFrom}
              onPress={onSubmit}
              text="Đồng ý"
              primary
              style={[styles.btn, styles.btnPrimary]}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const BUTTONS = [
  '7 ngày qua',
  'Hôm qua',
  'Hôm nay',
  'Tuần này',
  'Tuần trước',
  'Tháng này',
  'Tháng trước',
  'Tuỳ chọn thời gian',
  'Huỷ',
]

const styles = StyleSheet.create({
  badge: {
    backgroundColor: light.danger,
    borderRadius: appSize(100),
    height: appSize(16),
    position: 'absolute',
    right: appSize(9),
    top: appSize(3),
    width: appSize(16),
  },
  btn: {
    backgroundColor: '#FFF',
    borderColor: light.icon,
    borderWidth: 1,
    height: 45,
    marginHorizontal: 8,
    width: 150,
  },
  btnPrimary: {
    backgroundColor: light.primary,
    borderColor: light.primary,
  },
  center: { alignItems: 'center' },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...AppStyles.bottomBordered,
    paddingBottom: 3,
    paddingTop: 6,
  },
  dateInput: {
    backgroundColor: '#eee',
    borderColor: '#e3e3e3',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    marginHorizontal: 8,
    paddingLeft: 16,
  },
  dateInputActive: {
    backgroundColor: '#FFF',
    borderColor: light.primary,
  },
  ml8: { marginLeft: 8 },
  modalContent: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    height: 400,
    justifyContent: 'space-between',
    padding: 16,
    width: '96%',
  },
  mr8: { marginRight: 8 },
  rowBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  rowDateInput: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 12,
    paddingTop: 8,
  },
  rowDateRange: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  rowLocation: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 16,
    paddingVertical: 10,
  },
})
