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

import { getReportStockOut, reportKeys } from '../api/api'
import { ResponseReportStockOut } from '../api/type'

export default function ({
  route,
  navigation,
}: StackScreenProps<StackParams, 'ReportStockOut'>) {
  const { user } = useAppContext()
  const { colors } = useAppTheme()

  const [refreshing, setRefreshing] = useState(false)

  const docs = route.params?.docs || 'SO3'
  const status = route.params?.status || ''
  const maKH = route.params?.maKH || ''
  const maNhomKH = route.params?.maNhomKH || ''
  let maNVKD = ''

  if (user?.isAdmin) {
    maNVKD = route.params?.maNVKD || ''
  } else {
    maNVKD = user?.ma_nvns || ''
  }
  const maKho = route.params?.maKho || ''

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
      reportKeys.stockOut(),
      dateRange,
      docs,
      status,
      maKH,
      maNhomKH,
      maNVKD,
      maKho,
    ],
    () =>
      getReportStockOut({
        user,
        ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
        ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
        ma_ct: docs,
        trang_thai: status,
        ma_kh: maKH,
        ma_nhkh: maNhomKH,
        ma_kho: maKho,
        ma_nvkd: maNVKD,
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
        <AppBlock center style={styles.code}>
          <AppText>Ngày CT</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Số CT</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Mã KH</AppText>
        </AppBlock>

        <AppBlock center style={styles.name}>
          <AppText>Tên KH</AppText>
        </AppBlock>

        <AppBlock center style={styles.name}>
          <AppText>Tên NVKD</AppText>
        </AppBlock>

        <AppBlock center style={styles.c4}>
          <AppText>Tổng tiền HĐ</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseReportStockOut
    index: number
  }) => {
    return (
      <Pressable
        disabled={item.Type === 'Total'}
        style={item.Type === 'Total' ? styles.line : null}
        onPress={() =>
          navigation.navigate('StockOutInvoiceDetail', { item, dateRange })
        }
      >
        <AppBlock row style={{ ...AppStyles.bordered }}>
          <AppBlock center style={styles.itemCode}>
            <AppText style={styles.codeText}>
              {item.Type === 'Total'
                ? null
                : moment(item.ngay_ct).format('YYYY-MM-DD')}
            </AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode1}>
            <AppText>{item.so_ct}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode1}>
            <AppText>{item.ma_kh}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemName}>
            {item.Type === 'Total' ? (
              <AppText center>Tổng cộng</AppText>
            ) : (
              <AppText light>{item.ten_kh}</AppText>
            )}
          </AppBlock>

          <AppBlock style={styles.itemName}>
            <AppText light>{item.ten_nvkd}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemSum}>
            <AppText right>{item.tt}</AppText>
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
  if (docs) {
    filterSize++
  }
  if (status) {
    filterSize++
  }
  if (maKH) {
    filterSize++
  }
  if (maNhomKH) {
    filterSize++
  }
  if (maNVKD) {
    filterSize++
  }
  if (maKho) {
    filterSize++
  }

  const onPressFilter = () => {
    navigation.navigate('FilterScreenStockOut', {
      docs,
      status,
      maKH,
      maNhomKH,
      maNVKD,
      maKho,
    })
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
    borderBottomWidth: borderWidth,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
  },
  itemCode: {
    borderColor: light.border,
    // borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemCode1: {
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
    width: 300,
  },
  itemSum: {
    borderColor: light.border,
    // borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  line: {
    backgroundColor: '#46B4CF20',
  },
  name: { width: 300 },
})
