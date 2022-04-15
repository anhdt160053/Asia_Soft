import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import FooterAction from 'app/components/FooterAction'
import PickerModalComponent from 'app/components/Lookup/PickerModalComponent'
import { StackParams } from 'app/navigation/params'
import { LOOK_UP_TYPES } from 'app/types'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

export default function ({
  navigation,
  route,
}: StackScreenProps<StackParams, 'FilterScreenCustomer'>) {
  const [maKH, setMaKH] = useState(route.params?.maKH)

  return (
    <AppBlock flex padding={[0, 16, 16]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickerModalComponent
          selected={maKH}
          onSelected={setMaKH}
          lookUpType={LOOK_UP_TYPES.KHACH_HANG}
          title="Mã khách hàng"
        />
      </ScrollView>

      <FooterAction
        pressButton={() => navigation.navigate('CustomerList', { maKH })}
      />
    </AppBlock>
  )
}
