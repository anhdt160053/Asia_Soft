import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppButton from '@vn.starlingTech/components/AppButton'
import AppText from '@vn.starlingTech/components/AppText'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

type Props = {
  last?: boolean
  noConfirm?: boolean
  onConfirmRemove?: () => void
  onChangedQuantity?: (quantity: number) => void
  quantity: number
}

let timer: any = null

export default function (props: Props) {
  const { colors } = useAppTheme()

  const [quantity, setQuantity] = useState({
    num: props.quantity || 0,
    sync: false,
  })

  const onMinus = () => {
    const newQuantity = quantity.num - 1
    if (newQuantity > 0) {
      onChangeQuantity(newQuantity)
    } else {
      if (props.noConfirm) {
        onChangeQuantity(0)
        return
      }
      confirmRemove()
    }
  }
  const onPlus = () => {
    const newQuantity = Number(quantity.num) + 1
    onChangeQuantity(newQuantity)
  }

  const confirmRemove = () => {
    props.onConfirmRemove && props.onConfirmRemove()
  }

  const onChangeQuantity = (val: string | number) => {
    setQuantity({ num: Number(val), sync: true })
  }

  const onEndEditing = () => {
    consoleLog('onEndEditing')
  }

  useEffect(() => {
    setQuantity({ num: props.quantity, sync: false })
  }, [props.quantity])

  useEffect(() => {
    clearTimeout(timer)
    if (quantity.sync) {
      timer = setTimeout(() => {
        // consoleLog('onChangedQuantity');
        props.onChangedQuantity && props.onChangedQuantity(quantity.num)
      }, 500)
    }
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity])

  return (
    <AppBlock style={styles.rowQuantity}>
      <AppText light>Số lượng:</AppText>
      <AppBlock style={[styles.quantityInput, { borderColor: colors.border }]}>
        <AppButton onPress={onMinus} radius={20} default style={styles.btn}>
          <Icon name="minus" style={styles.icon} color={colors.text} />
        </AppButton>
        <TextInput
          allowFontScaling={false}
          style={[styles.input, { color: colors.text }]}
          value={quantity.num.toString()}
          onChangeText={onChangeQuantity}
          returnKeyType="done"
          keyboardType="number-pad"
          onEndEditing={onEndEditing}
        />
        <AppButton onPress={onPlus} radius={20} default style={styles.btn}>
          <Icon name="plus" style={styles.icon} color={colors.text} />
        </AppButton>
      </AppBlock>
    </AppBlock>
  )
}
const styles = StyleSheet.create({
  btn: { height: 32, width: 34 },
  icon: { fontSize: 20 },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: 'center',
    width: 100,
  },
  quantityInput: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 32,
    marginLeft: 8,
    maxWidth: 120,
  },
  rowQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
})
