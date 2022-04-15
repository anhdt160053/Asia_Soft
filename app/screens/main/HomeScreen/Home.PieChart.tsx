// import { PieChart } from '@starling-tech/react-native-chart-kit'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { AppContext } from '@vn.starlingTech/context/AppContext'
import { DateRangeType } from 'app/components/FilterComponent'
import { randomChartColor } from 'app/helper/ChartHelper'
import { findIndex } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PieChart } from 'react-native-svg-charts'
import { useMutation } from 'react-query'

import { AreaColorsType } from './Home'
import { getPieRevenue } from './api/api'
import { ChartLoading, ChartNoData } from './component/ChartComponent'
import { Labels } from './component/Labels'

type PieChartType = {
  key: number
  value: number
  label: string
  svg: { fill: string }
  arc: { cornerRadius: 5 }
}

type Props = {
  dateRange: DateRangeType
  areaColors: AreaColorsType[]
}

export default (props: Props) => {
  const { user } = useContext(AppContext)

  const screenWidth = useWindowDimensions().width
  const [chartWidth, setChartWidth] = useState(screenWidth)

  if (!user) {
    return null
  }

  const [processing, setProcessing] = useState(true)

  const { isLoading, isSuccess, isError, error, data, mutate } = useMutation(
    ['getRevenue' + props.dateRange?.dateFrom + props.dateRange?.dateTo],
    () => getPieRevenue(user, props.dateRange),
    { retry: settings.QUERY_RETRY, onSuccess: () => setProcessing(false) },
  )

  useEffect(() => {
    setProcessing(true)
    const timeout = setTimeout(() => {
      mutate()
    }, 1000)
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

  const [showHint, setShowHint] = useState({
    index: 0,
    visible: false,
    x: 0,
    y: 0,
  })

  const chartData: PieChartType[] = []

  if (isSuccess && data) {
    let total = 0
    data.forEach((item) => {
      total += Number(item.doanh_thu)
    })
    data.forEach((item, index) => {
      const cIndex = findIndex(props.areaColors, (c) => c.name === item.kho)
      let color = randomChartColor(index)
      if (cIndex === -1) {
        props.areaColors.push({ name: item.kho, color })
      } else {
        color = props.areaColors[cIndex].color
      }
      const value = total > 0 ? (Number(item.doanh_thu) * 100) / total : 0
      chartData.push({
        key: index,
        value: total > 0 ? (Number(item.doanh_thu) * 100) / total : 0,
        label: value.toFixed(2) + '%',
        svg: { fill: color },
        arc: { cornerRadius: 5 },
        // population: Number(item.doanh_thu),
        // name: item.kho,
        // color,
      })
    })
  }

  const { top } = useSafeAreaInsets()

  useDeviceOrientationChange((o) => {
    if (
      o === OrientationType['LANDSCAPE-LEFT'] ||
      o === OrientationType['LANDSCAPE-RIGHT']
    ) {
      setChartWidth(screenWidth - top)
    } else {
      setChartWidth(screenWidth)
    }
  })

  return (
    <Pressable
      onPress={() => setShowHint({ ...showHint, visible: false })}
      style={styles.container}
    >
      {/* <AppText title center>
        Doanh thu theo kho
      </AppText> */}
      <ResponseContainer
        isFetchingData={false}
        isLoading={processing || isLoading}
        success={isSuccess}
        message={responseMsg}
        tryAgain={mutate}
      >
        {data && !isSuccess ? (
          <ChartLoading />
        ) : (
          (chartData.length && (
            <AppBlock style={{ marginLeft: -16 }}>
              <PieChart
                style={{ width: chartWidth, height: chartWidth }}
                data={chartData}
                innerRadius={15}
                outerRadius={70}
                labelRadius={120}
                // sort={(a, b) => b.key - a.key}
              >
                <Labels />
              </PieChart>
            </AppBlock>
          )) || <ChartNoData />
        )}
      </ResponseContainer>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 4,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
})
