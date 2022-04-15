import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import light from '@vn.starlingTech/theme/light'
import Container from 'app/components/Container'
import { StackParams } from 'app/navigation/params'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'

import { getDetailInventory, reportKeys } from '../api/api'
import { ResponseDetailInventory } from '../api/type'

export default function ({
  route,
}: StackScreenProps<StackParams, 'InventoryDetail'>) {
  const { user } = useAppContext()
  const [refreshing, setRefreshing] = useState(false)

  if (!user) {
    return null
  }

  const { refetch, data, isFetched } = useQuery(
    [reportKeys.detailInventory()],
    () =>
      getDetailInventory({
        user,
        ngay1: moment(route.params.dateRange.dateFrom).format('YYYY/MM/DD'),
        ngay2: moment(route.params.dateRange.dateTo).format('YYYY/MM/DD'),
        ma_vt: route.params.item.ma_vt,
        ma_nhvt: '',
        ma_kho: '',
      }),
    {
      retry: settings.QUERY_RETRY,
      keepPreviousData: true,
    },
  )

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  const renderHeader = () => {
    return (
      <Container>
        <AppBlock row style={styles.hItem}>
          <AppBlock center style={styles.code}>
            <AppText>Ngày CT</AppText>
          </AppBlock>

          <AppBlock center style={styles.unit}>
            <AppText>Số CT</AppText>
          </AppBlock>

          <AppBlock center style={styles.name}>
            <AppText>Diễn giải</AppText>
          </AppBlock>

          <AppBlock center style={styles.c4}>
            <AppText>SL nhập</AppText>
          </AppBlock>

          <AppBlock center style={styles.c4}>
            <AppText>SL xuất</AppText>
          </AppBlock>

          <AppBlock center style={styles.c4}>
            <AppText>Tồn</AppText>
          </AppBlock>
        </AppBlock>
      </Container>
    )
  }

  const dataNew = data ? data.length - 1 : null

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseDetailInventory
    index: number
  }) => {
    return (
      <AppBlock
        row
        style={[
          styles.border,
          index === dataNew ? styles.bR : null,
          index === 0 || index === dataNew ? styles.bg : null,
        ]}
      >
        <AppBlock style={styles.itemCode}>
          <AppText center style={styles.codeText}>
            {moment(item.ngay_ct).format('YYYY-MM-DD')}
          </AppText>
        </AppBlock>

        <AppBlock style={styles.itemUnit}>
          <AppText light>{item.so_ct}</AppText>
        </AppBlock>

        <AppBlock style={styles.itemName}>
          {index === 0 ? (
            <AppText center>Tồn đầu kỳ</AppText>
          ) : index === dataNew ? (
            <AppText center>Tồn cuối kỳ</AppText>
          ) : (
            <AppText light>{item.dien_giai}</AppText>
          )}
        </AppBlock>

        <AppBlock style={styles.itemSum}>
          <AppText right>{item.sl_nhap}</AppText>
        </AppBlock>

        <AppBlock style={styles.itemSum}>
          <AppText right>{item.sl_xuat}</AppText>
        </AppBlock>

        <AppBlock style={styles.itemSumIn}>
          <AppText right>{item.ton}</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  return (
    <AppBlock flex padding={[0, 16, 16]}>
      <ScrollView horizontal>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={refreshing && !isFetched}
          onRefresh={onRefresh}
          ListHeaderComponent={renderHeader}
          data={data}
          renderItem={renderItem}
          style={styles.container}
          ListFooterComponent={<AppBlock style={styles.h90} />}
        />
      </ScrollView>
    </AppBlock>
  )
}

const styles = StyleSheet.create({
  bR: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bg: {
    backgroundColor: '#EF860010',
  },
  border: { ...AppStyles.bordered },
  c4: { width: 150 },
  code: { width: 150 },
  codeText: {
    textAlign: 'left',
  },
  container: {
    paddingTop: 16,
  },
  h90: { height: 90 },
  hItem: {
    backgroundColor: 'rgba(70, 180, 207, 0.5)',
    borderBottomColor: light.border,
    borderBottomWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
  },
  itemCode: {
    borderColor: light.border,
    borderRightWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemName: {
    borderColor: light.border,
    borderRightWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 300,
  },
  itemSum: {
    borderColor: light.border,
    borderRightWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemSumIn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemUnit: {
    borderColor: light.border,
    borderRightWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 100,
  },
  name: { width: 300 },
  unit: { width: 100 },
})
