import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles, { borderWidth } from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { numberFormat } from '@vn.starlingTech/helpers/numberHelper'
import light from '@vn.starlingTech/theme/light'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import Container from 'app/components/Container'
import FilterComponent from 'app/components/FilterComponent'
import { StackParams } from 'app/navigation/params'
import { size } from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'

import { getReportRevenue, reportKeys } from '../api/api'
import { ResponseReportRevenue } from '../api/type'

export default function ({
  route,
}: StackScreenProps<StackParams, 'ReportRevenue'>) {
  const { user } = useAppContext()
  const { colors } = useAppTheme()

  const [maKH, setMaKH] = useState<string>()

  const [refreshing, setRefreshing] = useState(false)

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
    [reportKeys.revenue(), dateRange, maKH],
    () =>
      getReportRevenue({
        user,
        ngay1: moment(dateRange.dateFrom).format('YYYY/MM/DD'),
        ngay2: moment(dateRange.dateTo).format('YYYY/MM/DD'),
        ma_dl: maKH || '',
      }),
    {
      retry: settings.QUERY_RETRY,
      keepPreviousData: true,
    },
  )

  const renderHeader = () => {
    return (
      <AppBlock row style={styles.hItem}>
        <AppBlock center style={styles.name1}>
          <AppText center>Tên hàng</AppText>
        </AppBlock>
        <AppBlock center style={styles.itemQuantity}>
          <AppText center>Số lượng</AppText>
        </AppBlock>
        <AppBlock center style={styles.itemQuantity}>
          <AppText center>Doanh số</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseReportRevenue
    index: number
  }) => {
    if (item.loai.toString() !== '0') {
      const isLatest = size(data) - 1 === index
      return (
        <AppBlock
          row
          style={{
            ...AppStyles.bordered,
            ...(isLatest && {
              borderWidth,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
            }),
          }}
        >
          <AppBlock
            style={
              data
                ? index === size(data) - 1
                  ? styles.nameSumLast
                  : styles.nameSum
                : null
            }
            padding={[12, 16]}
          >
            <AppText size={14} light>
              {item.ten_vt}
            </AppText>
          </AppBlock>
          <AppBlock
            style={
              data
                ? index === size(data) - 1
                  ? styles.itemSumLast
                  : styles.itemSum
                : null
            }
          >
            <AppText
              bold
              right
              size={14}
              color={index === size(data) - 1 ? light.primary : light.text}
            >
              {numberFormat(item?.tien)}
            </AppText>
          </AppBlock>
        </AppBlock>
      )
    }

    return (
      <AppBlock row style={{ ...AppStyles.bordered }}>
        <AppBlock style={styles.name} padding={[12, 16]}>
          <AppText light>{item.ten_vt}</AppText>
        </AppBlock>
        <AppBlock style={styles.item}>
          <AppText light right>
            {numberFormat(item?.so_luong)}
          </AppText>
        </AppBlock>
        <AppBlock style={styles.sum}>
          <AppText light right>
            {numberFormat(item?.tien)}
          </AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  let responseMessage = ''
  if (isError && error) {
    const { message } = handlerApiResponseError(error)
    responseMessage = message
  } else if (isSuccess) {
    responseMessage = ''
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  return (
    <Container>
      <FilterComponent
        dateRange={dateRange}
        setDateRange={setDateRange}
        customerFilter
        maKH={maKH}
        setMaKH={setMaKH}
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
              ListFooterComponent={<AppBlock style={styles.h90} />}
              data={data}
              renderItem={renderItem}
              style={styles.container}
            />
          </ScrollView>
        </AppBlock>
      </ResponseContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
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
  item: {
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemQuantity: { width: 150 },
  itemSum: {
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  itemSumLast: {
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  name: {
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    width: 300,
  },
  name1: {
    width: 300,
  },
  nameSum: {
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    width: 450,
  },
  nameSumLast: {
    width: 450,
  },
  sum: {
    borderColor: light.border,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
})
