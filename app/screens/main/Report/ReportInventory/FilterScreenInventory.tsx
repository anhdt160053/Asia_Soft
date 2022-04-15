import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
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
}: StackScreenProps<StackParams, 'FilterScreenInventory'>) {
  const [maVT, setMaVT] = useState(route.params?.maVT)
  const [maKho, setMaKho] = useState(route.params?.maKho)
  const [maNhomVT, setMaNhomVT] = useState(route.params?.maNhomVT)

  return (
    <Container>
      <AppBlock flex padding={[0, 16, 16]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PickerModalComponent
            selected={maVT}
            onSelected={setMaVT}
            lookUpType={LOOK_UP_TYPES.VAT_TU}
            title="Mã vật tư"
          />

          <PickerModalComponent
            selected={maNhomVT}
            onSelected={setMaNhomVT}
            lookUpType={LOOK_UP_TYPES.NHOM_VAT_TU}
            title="Mã nhóm vật tư"
          />

          <PickerModalComponent
            selected={maKho}
            onSelected={setMaKho}
            lookUpType={LOOK_UP_TYPES.KHO}
            title="Mã kho"
          />

          <AppBlock style={styles.h60} />
        </ScrollView>

        <FooterAction
          pressButton={() =>
            navigation.navigate('ReportInventory', { maVT, maKho, maNhomVT })
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
})
