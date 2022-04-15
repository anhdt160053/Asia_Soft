import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { AppContext } from '@vn.starlingTech/context/AppContext'
import { moneyFormat } from '@vn.starlingTech/helpers/numberHelper'
import { DateRangeType } from 'app/components/FilterComponent'
import { size } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useMutation } from 'react-query'

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
    ['getTop10-DT-' + props.dateRange?.dateFrom + props.dateRange?.dateTo],
    () => getTop10(user, props.dateRange, 'DT'),
    {
      retry: settings.QUERY_RETRY,
      onSuccess: () => {
        setProcessing(false)
      },
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
                <AppBlock
                  style={[
                    styles.item,
                    index === dataSize - 1 && AppStyles.noBorder,
                  ]}
                  key={'item-' + index}
                >
                  <AppBlock flex>
                    <AppText numberOfLines={1}>{item.ten_vt}</AppText>
                  </AppBlock>
                  <AppText style={styles.ml32}>
                    {moneyFormat(item.tien)}
                  </AppText>
                </AppBlock>
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
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
  },
  ml32: { marginLeft: 32 },
})
