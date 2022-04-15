import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles, { borderWidth } from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import light from '@vn.starlingTech/theme/light'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import Container from 'app/components/Container'
import FilterComponent from 'app/components/FilterComponent'
import { StackParams } from 'app/navigation/params'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'

import { getReportInventory, reportKeys } from '../api/api'
import { ResponseReportInventory } from '../api/type'

export default function ({
  route,
  navigation,
}: StackScreenProps<StackParams, 'ReportInventory'>) {
  const { user } = useAppContext()
  const { colors } = useAppTheme()

  const [refreshing, setRefreshing] = useState(false)

  const maVT = route.params?.maVT || ''
  const maKho = route.params?.maKho || ''
  const maNhomVT = route.params?.maNhomVT || ''

  const [dateRange, setDateRange] = useState({
    dateFrom: moment().startOf('months').format('YYYY-MM-DD'),
    dateTo: moment().endOf('months').format('YYYY-MM-DD'),
  })

  if (!user) {
    return null
  }

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    isFetching,
    isPreviousData,
    isFetched,
  } = useQuery(
    [
      reportKeys.inventory(
        dateRange.dateFrom + dateRange.dateTo + maKho + maNhomVT + maVT,
      ),
      dateRange,
      maKho,
      maNhomVT,
      maVT,
    ], // -> tu dong lay lai du lieu khi dateRange, maKho, maNhomVT, maVT thay doi
    () =>
      getReportInventory({
        user,
        ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
        ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
        ma_vt: maVT,
        ma_nhvt: maNhomVT,
        ma_kho: maKho,
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

  const isRefreshing = refreshing && isFetched

  const renderHeader = () => {
    return (
      <AppBlock row style={styles.hItem}>
        <AppBlock center style={styles.name}>
          <AppText>Tên VT</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Tồn</AppText>
        </AppBlock>

        <AppBlock center style={styles.unit}>
          <AppText>ĐVT</AppText>
        </AppBlock>

        <AppBlock center style={styles.code1}>
          <AppText>Mã VT</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseReportInventory
    index: number
  }) => {
    return (
      <Pressable
        disabled={!(item.type === 'Normal')}
        onPress={() =>
          navigation.navigate('InventoryDetail', { item, dateRange })
        }
        style={
          item.type === 'Total'
            ? styles.sumLine
            : item.type === 'Header'
            ? styles.group
            : null
        }
      >
        <AppBlock row style={{ ...AppStyles.bordered }}>
          <AppBlock
            style={item.type === 'Normal' ? styles.itemName : styles.itemName1}
          >
            <AppText light>
              {item.type === 'Total'
                ? 'Tổng cộng:'
                : item.type === 'Header'
                ? `Nhóm ${item.ma_nhvt}`
                : item.ten_vt}
            </AppText>
          </AppBlock>

          <AppBlock style={styles.itemSum}>
            <AppText right>{item.so_luong}</AppText>
          </AppBlock>

          <AppBlock center style={styles.itemUnit}>
            <AppText light>{item.dvt}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText style={styles.codeText}>{item.ma_vt}</AppText>
          </AppBlock>
        </AppBlock>
      </Pressable>
    )
  }

  let responseMessage = ''
  if (isError && error) {
    const { message } = handlerApiResponseError(error)
    responseMessage = message
  } else if (isSuccess) {
    responseMessage = ''
  }

  let filterSize: number = 0
  if (maVT) {
    filterSize++
  }
  if (maKho) {
    filterSize++
  }
  if (maNhomVT) {
    filterSize++
  }

  const onPressFilter = () => {
    navigation.navigate('FilterScreenInventory', { maKho, maVT, maNhomVT })
  }

  return (
    <Container>
      <FilterComponent
        dateRange={dateRange}
        setDateRange={setDateRange}
        filter
        filterSize={filterSize}
        onPressFilter={onPressFilter}
      />

      <ResponseContainer
        hasCached={isPreviousData}
        success={isSuccess}
        color={colors.text}
        tryAgain={refetch}
        isLoading={isLoading}
        isFetchingData={!refreshing && !isLoading && isFetching}
        message={responseMessage}
      >
        <AppBlock flex padding={[0, 16, 16]}>
          <ScrollView horizontal>
            <FlatList
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderHeader}
              data={data}
              renderItem={renderItem}
              style={styles.container}
              ListFooterComponent={<AppBlock style={styles.h90} />}
            />
          </ScrollView>
        </AppBlock>
      </ResponseContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  code: { width: 100 },
  code1: { width: 150 },
  codeText: {
    textAlign: 'left',
  },
  container: {
    paddingTop: 16,
  },
  group: {
    backgroundColor: '#EF860010',
  },
  h90: { height: 90 },
  hItem: {
    backgroundColor: 'rgba(70, 180, 207, 0.5)',
    borderBottomColor: light.border,
    borderBottomWidth: borderWidth,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
  },
  itemCode: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemName: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 250,
  },
  itemName1: {
    alignItems: 'center',
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 250,
  },
  itemSum: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 100,
  },
  itemUnit: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 100,
  },
  name: { width: 250 },
  sumLine: {
    backgroundColor: '#46B4CF20',
  },
  unit: { width: 100 },
})
