import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles, { borderWidth } from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import light from '@vn.starlingTech/theme/light'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import Container from 'app/components/Container'
import FilterComponent from 'app/components/FilterComponent'
import { StackParams } from 'app/navigation/params'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'

import { getReportDebt, reportKeys } from '../api/api'
import { ResponseReportDebt } from '../api/type'

export default function ({
  route,
  navigation,
}: StackScreenProps<StackParams, 'ReportDebt'>) {
  const { user } = useAppContext()
  const { colors } = useAppTheme()

  const [refreshing, setRefreshing] = useState(false)

  const maKH = route.params?.maKH || ''
  const maNhomKH = route.params?.maNhomKH || ''
  const maPLKH1 = route.params?.maPLKH1 || ''
  const maPLKH2 = route.params?.maPLKH2 || ''
  const maPLKH3 = route.params?.maPLKH3 || ''

  let maNVKD = ''

  if (user?.isAdmin) {
    maNVKD = route.params?.maNVKD || ''
  } else {
    maNVKD = user?.ma_nvns || ''
  }

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
      reportKeys.debt(),
      dateRange,
      maKH,
      maNhomKH,
      maPLKH1,
      maPLKH2,
      maPLKH3,
      maNVKD,
    ],
    () =>
      getReportDebt({
        user,
        ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
        ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
        ma_kh: maKH,
        ma_nhkh: maNhomKH,
        ma_plkh1: maPLKH1,
        ma_plkh2: maPLKH2,
        ma_plkh3: maPLKH3,
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

  const renderHeader = () => {
    return (
      <AppBlock row style={styles.hItem}>
        <AppBlock center style={styles.unit}>
          <AppText>Mã KH</AppText>
        </AppBlock>

        <AppBlock center style={styles.name}>
          <AppText>Tên KH</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Nợ ĐK</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Có ĐK</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>PS Nợ</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>PS Có</AppText>
        </AppBlock>

        <AppBlock center style={styles.code}>
          <AppText>Nợ CK</AppText>
        </AppBlock>

        <AppBlock center style={styles.c4}>
          <AppText>Có CK</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseReportDebt
    index: number
  }) => {
    return (
      <Pressable
        disabled={item.Type === 'Total'}
        style={item.Type === 'Total' ? styles.line : null}
        onPress={() => navigation.navigate('DebtDetail', { item, dateRange })}
      >
        <AppBlock row style={{ ...AppStyles.bordered }}>
          <AppBlock style={styles.itemUnit}>
            <AppText style={styles.codeText}>{item.ma_kh}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemName}>
            {item.Type === 'Total' ? (
              <AppText center>Tổng cộng</AppText>
            ) : (
              <AppText light>{item.ten_kh}</AppText>
            )}
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText right>{item.du_no}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText right>{item.du_co}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText right>{item.ps_no}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText right>{item.ps_co}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemCode}>
            <AppText right>{item.du_no_ck}</AppText>
          </AppBlock>

          <AppBlock style={styles.itemSum}>
            <AppText right>{item.du_co_ck}</AppText>
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
  if (maKH) {
    filterSize++
  }
  if (maNhomKH) {
    filterSize++
  }
  if (maPLKH1) {
    filterSize++
  }
  if (maPLKH2) {
    filterSize++
  }
  if (maPLKH3) {
    filterSize++
  }
  if (maNVKD) {
    filterSize++
  }

  const onPressFilter = () => {
    // console.log(maKH, 'testchuyen')
    navigation.navigate('FilterScreenDebt', {
      maKH,
      maNhomKH,
      maPLKH1,
      maPLKH2,
      maPLKH3,
      maNVKD,
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
              onRefresh={onRefresh}
              refreshing={refreshing && !isFetched}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemUnit: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  line: {
    backgroundColor: '#46B4CF20',
  },
  name: { width: 300 },
  unit: { width: 150 },
})
