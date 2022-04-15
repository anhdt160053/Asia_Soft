import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import { AppContext } from '@vn.starlingTech/context/AppContext'
import { numberFormat } from '@vn.starlingTech/helpers/numberHelper'
import { DateRangeType } from 'app/components/FilterComponent'
import { size } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { getTop10 } from '../api/api'
import { ChartNoData } from '../component/ChartComponent'

type Props = {
  dateRange: DateRangeType
}

export default (props: Props) => {
  const { user } = useContext(AppContext)

  if (!user) {
    return null
  }

  const [processing, setProcessing] = useState(true)

  const { isLoading, isSuccess, isError, error, data, mutate } = useMutation(
    ['getTop10-SL-' + props.dateRange?.dateFrom + props.dateRange?.dateTo],
    () => getTop10(user, props.dateRange, 'SL'),
    {
      onSuccess: () => setProcessing(false),
    },
  )

  useEffect(() => {
    setProcessing(true)
    const timeout = setTimeout(() => {
      mutate()
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dateRange])

  let responseMsg = ''
  if (isError) {
    const { message } = handlerApiResponseError(error)
    responseMsg = message
  }

  const dataSize = size(data)

  return (
    <ResponseContainer
      isLoading={processing || isLoading}
      isFetchingData={false}
      message={responseMsg}
      tryAgain={mutate}
      success={isSuccess}
    >
      {isLoading ? (
        <AppBlock />
      ) : (
        (data && dataSize && (
          <>
            {data.map((item, index) => {
              return (
                <View
                  style={[
                    styles.item,
                    index === dataSize - 1 && AppStyles.noBorder,
                  ]}
                  key={'item-' + index}
                >
                  <AppText style={AppStyles.fill} numberOfLines={1}>
                    {item.ten_vt}
                  </AppText>
                  <AppText style={styles.ml32}>
                    {numberFormat(item.tien, '.')}
                  </AppText>
                </View>
              )
            })}
          </>
        )) || <ChartNoData />
      )}
    </ResponseContainer>
  )
}

const styles = StyleSheet.create({
  item: {
    ...AppStyles.rowCenterBetween,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 12,
  },
  ml32: { marginLeft: 32 },
})
