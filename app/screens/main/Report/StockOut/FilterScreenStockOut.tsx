import { useActionSheet } from '@expo/react-native-action-sheet'
import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppText from '@vn.starlingTech/components/AppText'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import light from '@vn.starlingTech/theme/light'
import Container from 'app/components/Container'
import FooterAction from 'app/components/FooterAction'
import PickerModalComponent from 'app/components/Lookup/PickerModalComponent'
import { StackParams } from 'app/navigation/params'
import { LOOK_UP_TYPES } from 'app/types'
import DownIcon from 'assets/svg/DownIcon'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native'

export default function ({
  navigation,
  route,
}: StackScreenProps<StackParams, 'FilterScreenStockOut'>) {
  const { user } = useAppContext()

  const [maKH, setMaKH] = useState(route.params?.maKH)
  const [maNhomKH, setMaNhomKH] = useState(route.params?.maNhomKH)
  const [maNVKD, setMaNVKD] = useState(route.params?.maNVKD)
  const [maKho, setMaKho] = useState(route.params?.maKho)
  const [docs, setDocs] = useState(route.params?.docs)
  const [status, setStatus] = useState(route.params?.status)

  const { showActionSheetWithOptions } = useActionSheet()

  const openActionSheetDocs = () => {
    showActionSheetWithOptions(
      {
        options: DOCS,
        cancelButtonIndex: DOCS.length - 1,
      },
      (buttonIndex: number | undefined) => {
        if (buttonIndex !== undefined && buttonIndex > -1 && buttonIndex < 3) {
          let doc = ''
          switch (buttonIndex) {
            case 0:
              doc = 'SO1'
              break
            case 1:
              doc = 'SO2'
              break
            case 2:
              doc = 'SO3'
              break
          }
          setDocs(doc)
        }
      },
    )
  }

  const openActionSheetStatus = () => {
    showActionSheetWithOptions(
      {
        options: STATUS,
        cancelButtonIndex: STATUS.length - 1,
      },
      (buttonIndex: number | undefined) => {
        if (buttonIndex !== undefined && buttonIndex > -1 && buttonIndex < 3) {
          let statusFilter = ''
          switch (buttonIndex) {
            case 0:
              statusFilter = ''
              break
            case 1:
              statusFilter = 'TH'
              break
            case 2:
              statusFilter = 'HT'
              break
          }
          setStatus(statusFilter)
        }
      },
    )
  }

  return (
    <Container>
      <AppBlock flex padding={[0, 16, 16]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppBlock>
            <AppText style={styles.labelSearchBox}>Lo???i ch???ng t???:</AppText>

            <Pressable onPress={openActionSheetDocs}>
              <AppBlock row center space="between" style={styles.selectBox}>
                <AppText style={styles.textSearchBox}>
                  {docs === 'SO3'
                    ? 'H??a ????n'
                    : docs === 'SO2'
                    ? 'Phi???u xu???t'
                    : '????n h??ng'}
                </AppText>
                <DownIcon width={appSize(18)} />
              </AppBlock>
            </Pressable>
          </AppBlock>

          <AppBlock>
            <AppText style={styles.labelSearchBox}>Tr???ng th??i:</AppText>

            <Pressable onPress={openActionSheetStatus}>
              <AppBlock row center space="between" style={styles.selectBox}>
                <AppText style={styles.textSearchBox}>
                  {status === ''
                    ? 'T???t c???'
                    : status === 'TH'
                    ? '??ang th???c hi???n'
                    : 'Ho??n th??nh'}
                </AppText>
                <DownIcon width={appSize(18)} />
              </AppBlock>
            </Pressable>
          </AppBlock>

          <PickerModalComponent
            selected={maKH}
            onSelected={setMaKH}
            lookUpType={LOOK_UP_TYPES.KHACH_HANG}
            title="M?? kh??ch h??ng"
          />

          <PickerModalComponent
            selected={maNhomKH}
            onSelected={setMaNhomKH}
            lookUpType={LOOK_UP_TYPES.NHOM_KHACH_HANG}
            title="M?? nh??m kh??ch h??ng"
          />

          {user?.isAdmin ? (
            <PickerModalComponent
              selected={maNVKD}
              onSelected={setMaNVKD}
              lookUpType={LOOK_UP_TYPES.NHAN_VIEN_KINH_DOANH}
              title="M?? nh??n vi??n kinh doanh"
            />
          ) : (
            <AppBlock>
              <AppBlock margin={[26, 0, 9]}>
                <AppText size={appSize(14)}>M?? nh??n vi??n kinh doanh:</AppText>
              </AppBlock>
              <AppBlock row center style={styles.selectBox}>
                <AppText size={appSize(14)}>{user?.name}</AppText>
              </AppBlock>
            </AppBlock>
          )}

          <PickerModalComponent
            selected={maKho}
            onSelected={setMaKho}
            lookUpType={LOOK_UP_TYPES.KHO}
            title="M?? kho"
          />

          <AppBlock style={styles.h60} />
        </ScrollView>

        <FooterAction
          pressButton={() =>
            navigation.navigate('ReportStockOut', {
              docs,
              status,
              maKH,
              maNhomKH,
              maNVKD,
              maKho,
            })
          }
        />
      </AppBlock>
    </Container>
  )
}

const DOCS = ['????n h??ng', 'Phi???u xu???t', 'H??a ????n', 'Hu???']
const STATUS = ['T???t c???', 'Th???c hi???n', 'Ho??n th??nh', 'Hu???']

const styles = StyleSheet.create({
  h60: {
    height: 60,
  },
  labelSearchBox: {
    color: light.text,
    fontSize: appSize(14),
    marginBottom: 9,
    marginTop: 26,
  },
  selectBox: {
    borderColor: '#959595',
    borderRadius: appSize(5),
    borderWidth: 0.5,
    paddingHorizontal: appSize(16),
    paddingVertical: appSize(12),
  },
  textSearchBox: {
    fontSize: appSize(14),
  },
})
