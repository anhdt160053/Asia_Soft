import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import light from '@vn.starlingTech/theme/light'
import { DateRangeType } from 'app/components/FilterComponent'
import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import TopByDT from './stock/TopByDT'
import TopBySL from './stock/TopBySL'

type Props = {
  dateRange: DateRangeType
}

export default (props: Props) => {
  const [byQuantity, setByQuantity] = useState(false)

  return (
    <AppBlock style={styles.container}>
      <AppText title center>
        10 mặt hàng bán chạy
      </AppText>
      <AppBlock style={[AppStyles.rowCenterBetween, styles.mt16]}>
        <Pressable
          onPress={() => setByQuantity(false)}
          style={[styles.btn, !byQuantity && styles.btnActive]}
        >
          <AppText primary={!byQuantity} bold>
            Theo doanh thu
          </AppText>
        </Pressable>
        <Pressable
          onPress={() => setByQuantity(true)}
          style={[styles.btn, byQuantity && styles.btnActive]}
        >
          <AppText primary={byQuantity} bold>
            Theo số lượng
          </AppText>
        </Pressable>
      </AppBlock>
      <AppBlock flex>
        {!byQuantity ? <TopByDT {...props} /> : <TopBySL {...props} />}
      </AppBlock>
    </AppBlock>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    marginBottom: 16,
  },
  btnActive: {
    borderBottomColor: light.primary,
    borderBottomWidth: 2,
  },
  container: {
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  mt16: { marginTop: 16 },
})
