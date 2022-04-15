import { useAppTheme } from '@vn.starlingTech/theme/theming'
import { size } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'
import {
  TextStyle,
  KeyboardTypeOptions,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { numberFormat } from '../../helpers/numberHelper'
import AppStyles from '../AppStyles'
import AppText from '../AppText'
import FormStyles from './FormStyles'
import { AppInputLabel } from './container/AppInputContainer'

interface AppInputRegularProps extends TextInputProps {
  refName?: any
  required?: boolean
  validate?: (_str: string) => { error: boolean; message: string }
  error?: string
  label?: string
  errorColor?: string
  containerStyle?: StyleProp<TextStyle>
  inputStyle?: StyleProp<ViewStyle>
  inputTextStyle?: StyleProp<TextStyle>
  inline?: boolean
  labelStyle?: TextStyle
  numberFormat?: boolean
  leftIcon?: ReactElement
  iconColor?: string
  noBorder?: boolean
  helpTxtStyle?: TextStyle
  runValidate?: number
  noHelper?: boolean
  iconShowPass?: ReactElement
  iconHidePass?: ReactElement
  suffix?: ReactElement
  inputType?: 'phone' | 'email' | 'name'
  match?: string
  matchMessage?: string
  onChangeText?: (text: string) => void
}

export default function (props: AppInputRegularProps) {
  const { colors } = useAppTheme()

  const { required, containerStyle, label, errorColor, editable } = props
  const [value, setValue] = useState(props.value)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(
    !props.secureTextEntry || false,
  )

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (props.runValidate) {
      setError(!value)
      setErrorMessage(!value ? 'Vui lòng nhập nội dung' : '')
    }
  }, [props.runValidate, value])

  useEffect(() => {
    if (props.error) {
      setError(true)
      setErrorMessage(props.error)
    }
  }, [props.error])

  const onChangeText = (text: string) => {
    setValue(text)
    if (required) {
      const hasError = !text
      setError(hasError)
      setErrorMessage(hasError ? 'Vui lòng nhập giá trị' : '')
      if (hasError) {
        // return;
      }
    }

    if (text && props.inputType === 'phone' && required) {
      const hasError = size(text) !== 10 || text.substr(0, 1) !== '0'
      setError(hasError)
      setErrorMessage(hasError ? 'Số điện thoại không hợp lệ' : '')
    }

    if (props.validate !== undefined) {
      const validate = props.validate(text)
      const hasError = validate.error
      setError(validate.error)
      setErrorMessage(hasError ? validate.message : '')
      if (validate.error) {
        // return;
      }
    }

    if (props.match) {
      const hasError = text !== props.match
      setError(hasError)
      setErrorMessage(
        hasError ? props?.matchMessage || 'Mật khẩu nhập lại không hợp lệ' : '',
      )
    }

    props.onChangeText &&
      props.onChangeText(props.numberFormat ? text.replace(/\./g, '') : text)
  }

  let keyboardType: KeyboardTypeOptions = props.keyboardType || 'default'
  if (!props?.keyboardType) {
    switch (props?.inputType) {
      case 'phone':
        keyboardType = 'phone-pad'
        break
      case 'email':
        keyboardType = 'email-address'
        break
    }
  }

  const disabled = editable !== undefined && !editable

  return (
    <View
      style={[
        FormStyles.item,
        props.inline && FormStyles.inline,
        containerStyle,
      ]}
    >
      {label ? (
        <AppInputLabel
          labelStyle={props.labelStyle}
          inline={props.inline}
          label={label}
          required={required}
        />
      ) : null}
      <View>
        <View
          style={[
            FormStyles.inputView,
            disabled && FormStyles.disabled,
            props.inline && FormStyles.itemInputInLine,
            props.inputStyle,
            error && FormStyles.inputError,
            props.noBorder && AppStyles.noBorder,
          ]}
        >
          {props.leftIcon}
          <TextInput
            ref={props.refName}
            {...props}
            allowFontScaling={false}
            editable={editable}
            keyboardType={keyboardType}
            returnKeyType={props.returnKeyType}
            secureTextEntry={!showPassword}
            autoCapitalize={props.autoCapitalize}
            value={
              (props.numberFormat &&
                value &&
                numberFormat(value.replace(/\./g, ''), '.')) ||
              value
            }
            style={[
              FormStyles.input,
              { color: colors.text },
              props.inputTextStyle,
            ]}
            placeholderTextColor={
              props.placeholderTextColor || colors.placeholder
            }
            onChangeText={onChangeText}
            maxLength={props.inputType === 'phone' ? 10 : props.maxLength}
          />
          {props.suffix}
          {props.secureTextEntry ? (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={FormStyles.eye}
            >
              {props.iconShowPass && props.iconHidePass ? (
                showPassword ? (
                  props.iconHidePass
                ) : (
                  props.iconShowPass
                )
              ) : (
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={props.iconColor || colors.icon}
                />
              )}
            </TouchableOpacity>
          ) : value && !disabled ? (
            <TouchableOpacity
              onPress={() => onChangeText('')}
              style={styles.w25}
            >
              <Ionicons name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
          ) : null}
        </View>
        {!props.noHelper && errorMessage ? (
          <AppText
            style={{
              ...FormStyles.helperTxt,
              ...props.helpTxtStyle,
              color: errorColor || colors.danger,
            }}
          >
            {errorMessage}
          </AppText>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  w25: { width: 25 },
})
