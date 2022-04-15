import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppText from '@vn.starlingTech/components/AppText'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import Container from 'app/components/Container'
import FooterAction from 'app/components/FooterAction'
import PickerModalComponent from 'app/components/Lookup/PickerModalComponent'
import { StackParams } from 'app/navigation/params'
import { LOOK_UP_TYPES } from 'app/types'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function ({
  navigation,
  route,
}: StackScreenProps<StackParams, 'FilterScreenDebt'>) {
  const { user } = useAppContext()

  const [maKH, setMaKH] = useState(route.params?.maKH)
  const [maNhomKH, setMaNhomKH] = useState(route.params?.maNhomKH)
  const [maPLKH1, setMaPLKH1] = useState(route.params?.maPLKH1)
  const [maPLKH2, setMaPLKH2] = useState(route.params?.maPLKH2)
  const [maPLKH3, setMaPLKH3] = useState(route.params?.maPLKH3)
  const [maNVKD, setMaNVKD] = useState(route.params?.maNVKD)

  return (
    <Container>
      <AppBlock flex padding={[0, 16, 16]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PickerModalComponent
            selected={maKH}
            onSelected={setMaKH}
            lookUpType={LOOK_UP_TYPES.KHACH_HANG}
            title="Mã khách hàng"
          />

          <PickerModalComponent
            selected={maNhomKH}
            onSelected={setMaNhomKH}
            lookUpType={LOOK_UP_TYPES.NHOM_KHACH_HANG}
            title="Mã nhóm khách hàng"
          />

          <PickerModalComponent
            selected={maPLKH1}
            onSelected={setMaPLKH1}
            lookUpType={LOOK_UP_TYPES.PHAN_LOAI_KH}
            title="Mã phân loại khách hàng 1"
          />

          <PickerModalComponent
            selected={maPLKH2}
            onSelected={setMaPLKH2}
            lookUpType={LOOK_UP_TYPES.PHAN_LOAI_KH}
            title="Mã phân loại khách hàng 2"
          />

          <PickerModalComponent
            selected={maPLKH3}
            onSelected={setMaPLKH3}
            lookUpType={LOOK_UP_TYPES.PHAN_LOAI_KH}
            title="Mã phân loại khách hàng 3"
          />

          {user?.isAdmin ? (
            <PickerModalComponent
              selected={maNVKD}
              onSelected={setMaNVKD}
              lookUpType={LOOK_UP_TYPES.NHAN_VIEN_KINH_DOANH}
              title="Mã nhân viên kinh doanh"
            />
          ) : (
            <AppBlock>
              <AppBlock margin={[26, 0, 9]}>
                <AppText size={appSize(14)}>Mã nhân viên kinh doanh:</AppText>
              </AppBlock>
              <AppBlock row center style={styles.selectBox}>
                <AppText size={appSize(14)}>{user?.name}</AppText>
              </AppBlock>
            </AppBlock>
          )}

          <AppBlock style={styles.h60} />
        </ScrollView>

        <FooterAction
          pressButton={() =>
            navigation.navigate('ReportDebt', {
              maKH,
              maNhomKH,
              maPLKH1,
              maPLKH2,
              maPLKH3,
              maNVKD,
            })
          }
        />
      </AppBlock>
    </Container>
  )
}

const styles = StyleSheet.create({
  h60: {
    height: 60,
  },
  selectBox: {
    backgroundColor: '#f0f0f0',
    borderColor: '#959595',
    borderRadius: appSize(5),
    borderWidth: 0.5,
    paddingHorizontal: appSize(16),
    paddingVertical: appSize(12),
  },
})
