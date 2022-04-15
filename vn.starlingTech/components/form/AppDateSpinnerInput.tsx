import AppButton from '@vn.starlingTech/components/AppButton'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import moment from 'moment'
import React, { ReactNode, useEffect, useState } from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AppBlock from '../AppBlock'
import AppText from '../AppText'
import AppSpinnerDatePicker from '../date/DateSpinner'
import FormStyles from './FormStyles'
import { AppInputLabel } from './container/AppInputContainer'

type InputDateItemProps = {
  mode: 'date' | 'time' | 'datetime'
  onChanged: (_date: string) => void
  required?: boolean
  minDate?: any
  maxDate?: any
  disabled?: boolean
  validate?: boolean
  date: string | undefined
  label?: string
  radius?: number
  placeholder?: string
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  rightIcon?: false | ReactNode
  errorMsg?: string
  format?: string
}
export default function (props: InputDateItemProps) {
  const { colors } = useAppTheme()

  const [visible, setVisible] = useState(0)
  const [error, setError] = useState(false)

  const [date, setDate] = useState(props.date)

  // consoleLog(date, 'date-x');

  const showChooseDate = () => {
    setVisible(moment().unix())
  }

  const onDateChanged = (_date: string) => {
    setDate(_date)
    props.onChanged(_date)
  }

  useEffect(() => {
    if (props.errorMsg !== undefined) {
      setError(true)
    } else {
      setError(false)
    }
  }, [props.errorMsg])

  useEffect(() => {
    setDate(props.date)
  }, [props.date])

  useEffect(() => {
    if (props.validate && props.required) {
      setError(props.date === '')
    }
  }, [props.required, props.date, props.validate])

  return (
    <AppBlock>
      {props.label ? (
        <AppInputLabel
          label={props.label}
          required={props.required}
          labelStyle={props.labelStyle}
        />
      ) : null}
      <AppButton
        disabled={props.disabled}
        block
        radius={props.radius || 0}
        onPress={showChooseDate}
        style={[error && styles.error, FormStyles.inputView, props.style]}
      >
        <AppText
          style={[
            {
              color: date ? colors.text : colors.placeholder,
            },
            styles.dateTxt,
          ]}
        >
          {date && moment(date).isValid()
            ? moment(date).format(props.format || 'HH:mm DD/MM/YYYY')
            : props.placeholder || getString().date.chooseDate}
        </AppText>
        {props.rightIcon !== false
          ? props.rightIcon || (
              <Ionicons
                name="ios-calendar-outline"
                size={20}
                style={styles.mr8}
              />
            )
          : null}
      </AppButton>
      {error ? (
        <AppText style={[styles.errorTxt, { color: colors.danger }]}>
          {props.errorMsg || getString().date.pleaseChooseDate}
        </AppText>
      ) : null}
      <AppSpinnerDatePicker
        date={date || ''}
        mode={props.mode}
        forceVisible={visible}
        dateChanged={onDateChanged}
        minDate={props.minDate}
      />
    </AppBlock>
  )
}

const styles = StyleSheet.create({
  dateTxt: {
    paddingLeft: 16,
    textAlign: 'left',
    width: '100%',
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorTxt: { fontSize: 12, margin: 10 },
  mr8: { marginRight: 8 },
})
