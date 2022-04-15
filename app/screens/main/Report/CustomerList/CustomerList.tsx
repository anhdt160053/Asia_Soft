import { StackScreenProps } from '@react-navigation/stack'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles, { borderWidth } from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import light from '@vn.starlingTech/theme/light'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import Container from 'app/components/Container'
import PickerModalComponent from 'app/components/Lookup/PickerModalComponent'
import { StackParams } from 'app/navigation/params'
import { LOOK_UP_TYPES } from 'app/types'
import CustomerIconTQT from 'assets/svg/CustomerIconTQT'
import React, { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery } from 'react-query'

import { getCustomerList, reportKeys } from '../api/api'
import { ResponseCustomerList } from '../api/type'

export default function ({
  route,
  navigation,
}: StackScreenProps<StackParams, 'CustomerList'>) {
  const { user } = useAppContext()
  const { colors } = useAppTheme()

  const [refreshing, setRefreshing] = useState(false)

  const [maKH, setMaKH] = useState<string>()

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
    [reportKeys.customer(), maKH],
    () =>
      getCustomerList({
        user,
        ma_kh: maKH || '',
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
        <AppBlock center style={styles.code}>
          <AppText center>Mã KH</AppText>
        </AppBlock>

        <AppBlock flex center>
          <AppText center>Tên KH</AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResponseCustomerList
    index: number
  }) => {
    return (
      <TouchableOpacity
        style={[{ ...AppStyles.bordered }, styles.line]}
        onPress={() => navigation.navigate('CustomerDetail', { item })}
      >
        <AppBlock
          padding={[12, 16]}
          style={
            data
              ? index === data.length - 1
                ? styles.itemLRadius
                : styles.item
              : null
          }
        >
          <AppText light>{item.ma_kh}</AppText>
        </AppBlock>

        <AppBlock
          flex
          padding={[12, 16]}
          style={
            data
              ? index === data.length - 1
                ? styles.itemRRadius
                : styles.itemR
              : null
          }
        >
          <AppText light>{item.ten_kh}</AppText>
        </AppBlock>
      </TouchableOpacity>
    )
  }

  let responseMessage = ''
  if (isError && error) {
    const { message } = handlerApiResponseError(error)
    responseMessage = message
  } else if (isSuccess) {
    responseMessage = ''
  }

  return (
    <Container>
      <AppBlock style={styles.containerFilter}>
        <PickerModalComponent
          selected={maKH}
          onSelected={setMaKH}
          lookUpType={LOOK_UP_TYPES.KHACH_HANG}
          title="Mã khách hàng"
          renderSelectView={() => (
            <AppBlock style={styles.rowLocation}>
              <CustomerIconTQT width={appSize(18)} />
              <AppText light style={styles.ml8}>
                {maKH || 'Khách hàng'}
              </AppText>
            </AppBlock>
          )}
        />
      </AppBlock>

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
        </AppBlock>
      </ResponseContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  code: { width: 120 },
  container: {
    paddingTop: 16,
  },
  containerFilter: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...AppStyles.bottomBordered,
    paddingBottom: 3,
    paddingTop: 6,
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
    borderBottomWidth: borderWidth,
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 120,
  },
  itemLRadius: {
    borderBottomLeftRadius: 12,
    borderBottomWidth: borderWidth,
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 120,
  },
  itemR: {
    borderBottomWidth: borderWidth,
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemRRadius: {
    borderBottomRightRadius: 12,
    borderBottomWidth: borderWidth,
    borderColor: light.border,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  line: { ...AppStyles.bordered, flexDirection: 'row' },
  ml8: { marginLeft: 8 },
  rowLocation: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 16,
    paddingVertical: 10,
  },
})
