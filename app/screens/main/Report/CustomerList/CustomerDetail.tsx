import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { borderWidth } from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import light from '@vn.starlingTech/theme/light'
import Container from 'app/components/Container'
import { StackParams } from 'app/navigation/params'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ({
  route,
}: StackScreenProps<StackParams, 'CustomerDetail'>) {
  return (
    <Container>
      <AppBlock style={styles.box}>
        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Mã KH:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.text}>{route.params.item.ma_kh}</AppText>
          </AppBlock>
        </AppBlock>
        <AppBlock style={styles.border} />

        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Tên KH:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.name}>{route.params.item.ten_kh}</AppText>
          </AppBlock>
        </AppBlock>
        <AppBlock style={styles.border} />

        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Địa chỉ:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.text}>{route.params.item.dia_chi}</AppText>
          </AppBlock>
        </AppBlock>
        <AppBlock style={styles.border} />

        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Số điện thoại:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.text}>{route.params.item.tel}</AppText>
          </AppBlock>
        </AppBlock>
        <AppBlock style={styles.border} />

        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Nhóm KH:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.text}>{route.params.item.ten_nhkh}</AppText>
          </AppBlock>
        </AppBlock>
        <AppBlock style={styles.border} />

        <AppBlock row space="between">
          <AppText style={styles.textLeft}>Mã NVKD:</AppText>
          <AppBlock flex style={styles.pH}>
            <AppText style={styles.text}>{route.params.item.ma_nvkd}</AppText>
          </AppBlock>
        </AppBlock>
      </AppBlock>
    </Container>
  )
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: '#F4F6FB',
    height: 1,
    marginVertical: appSize(9),
  },
  box: {
    borderColor: '#E3E3E3',
    borderRadius: appSize(8),
    borderWidth,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  name: {
    color: light.primary,
    fontSize: appSize(14),
  },
  pH: {
    flexDirection: 'row-reverse',
  },
  text: {
    color: light.text,
    fontSize: appSize(14),
  },
  textLeft: {
    color: light.text,
    fontSize: appSize(14),
    width: 100,
  },
})
