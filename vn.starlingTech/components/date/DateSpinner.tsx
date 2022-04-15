import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Modal from 'react-native-modal'

import AppBlock from '../AppBlock'

type Props = {
  forceVisible: number
  date: string | null
  mode?: 'date' | 'time' | 'datetime'
  minDate?: string
  maxDate?: string
  display?: 'spinner' | 'default' | 'clock' | 'calendar'
  dateChanged: (_date: string) => void
  onCancel?: () => void
}

export default (props: Props) => {
  const { colors } = useAppTheme()

  const [visible, setVisible] = useState(false)

  const [selectedDate, setSelectedDate] = useState(
    moment(props.date).isValid() ? moment(props.date).toDate() : new Date(),
  )

  // const onChange = (event: any, pSelectedDate?: Date) => {
  //   consoleLog(pSelectedDate, 'pSelectedDate');
  //   const currentDate = pSelectedDate || selectedDate;
  //   setSelectedDate(currentDate);
  // };

  const onFinish = () => {
    props.dateChanged(moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
    setVisible(false)
  }

  useEffect(() => {
    if (props.forceVisible) {
      setVisible(true)
    }
  }, [props.forceVisible])

  const onCancel = () => {
    setVisible(false)
    props.onCancel && props.onCancel()
  }

  return (
    <Modal
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      coverScreen
      isVisible={visible}
      hasBackdrop
      hideModalContentWhileAnimating
      deviceHeight={AppConstants.HEIGHT}
      deviceWidth={AppConstants.WIDTH}
      onBackdropPress={onCancel}
      useNativeDriver
      style={AppStyles.noMargin}
    >
      <AppBlock style={styles.iosPicker}>
        <AppBlock style={styles.iosActions}>
          <Pressable style={styles.iosBtn} onPress={onCancel}>
            <AppText style={styles.iosBtnTxt}>{getString().cancel}</AppText>
          </Pressable>
          <Pressable style={styles.iosBtn} onPress={onFinish}>
            <AppText style={{ ...styles.iosBtnTxt, color: colors.primary }}>
              {getString().ok}
            </AppText>
          </Pressable>
        </AppBlock>
        <DatePicker
          date={selectedDate}
          onDateChange={setSelectedDate}
          mode={props.mode || 'datetime'}
          textColor="#000"
          minimumDate={
            props.minDate !== undefined && moment(props.minDate).isValid()
              ? moment(props.minDate).toDate()
              : undefined
          }
        />
      </AppBlock>
    </Modal>
  )
}

const styles = StyleSheet.create({
  iosActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 500,
    width: AppConstants.SCREEN_WIDTH,
    ...AppStyles.bottomBordered,
  },
  iosBtn: { paddingHorizontal: 15, paddingVertical: 15 },
  iosBtnTxt: { color: 'red', fontSize: 18 },
  iosPicker: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
    justifyContent: 'center',
    width: 500,
  },
})
