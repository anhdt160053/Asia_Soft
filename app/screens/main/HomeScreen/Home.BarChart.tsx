import { StackedBarChart } from '@starling-tech/react-native-chart-kit'
import { AbstractChartConfig } from '@starling-tech/react-native-chart-kit/dist/AbstractChart'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import settings from '@vn.starlingTech/config/settings'
import { AppContext } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { moneyFormat } from '@vn.starlingTech/helpers/numberHelper'
import { DateRangeType } from 'app/components/FilterComponent'
import { randomChartColor } from 'app/helper/ChartHelper'
import { ceil, find, findIndex, size, some } from 'lodash'
import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'

import { AreaColorsType } from './Home'
import { getRevenue } from './api/api'
import {
  ChartLoading,
  ChartNoData,
  StackedBarChartLegend,
  StackedBarValues,
} from './component/ChartComponent'

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

  let totalRevenue = 0
  let chartData = undefined

  const { isLoading, isFetching, isSuccess, isError, error, data, refetch } =
    useQuery(
      [
        'getRevenue' + props.dateRange?.dateFrom + props.dateRange?.dateTo,
        props.dateRange,
      ],
      () => getRevenue(user, props.dateRange),
      { retry: settings.QUERY_RETRY, keepPreviousData: true },
    )

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

  if (isSuccess && data) {
    const tmpLegends: string[] = []
    const tmpLabels: string[] = []
    const tmpColors: string[] = []
    const tmpDatas: number[][] = []

    data.forEach((item) => {
      if (!some(tmpLegends, (i) => i === item.kho)) {
        tmpLegends.push(item.kho)
      }
      if (!some(tmpLabels, (i) => i === item.ngay)) {
        tmpLabels.push(item.ngay)
      }
      totalRevenue += Number(item.doanh_thu)
    })

    const labelsSize = tmpLabels.length
    const step = labelsSize > 8 ? ceil(labelsSize / 8) : 1
    let tmpNext = 0
    const tmpLabel: string[] = []
    for (let i = 0; i < labelsSize; i++) {
      if (i === tmpNext) {
        // tmpLabel.push(labelsArr[i].substring(0, 2));
        tmpLabel.push(tmpLabels[i])
        tmpNext = i + step
      } else {
        tmpLabel.push('')
      }
    }

    tmpLabels.forEach((label) => {
      const tmpData: number[] = []
      const dataByLabel = data.filter((i) => i.ngay === label)
      if (dataByLabel.length) {
        tmpLegends.forEach((legend) => {
          const tmpVal = data.filter(
            (d) => d.ngay === label && d.kho === legend,
          )
          tmpData.push(
            tmpVal.length ? Number(tmpVal[0].doanh_thu) / 1000000 : 0,
          )
        })
      }
      if (some(tmpData, (v) => v > 0)) {
        tmpDatas.push(tmpData)
      } else {
        tmpDatas.push([])
      }
    })
    tmpLegends.forEach((legend, index) => {
      const cIndex = findIndex(props.areaColors, (c) => c.name === legend)
      if (cIndex === -1) {
        const color = randomChartColor(index)
        props.areaColors.push({ name: legend, color })
        tmpColors.push(color)
      } else {
        tmpColors.push(props.areaColors[cIndex].color)
      }
    })

    chartData = {
      legend: tmpLegends,
      data: tmpDatas,
      barColors: tmpColors,
      labels: tmpLabel,
    }
    // consoleLog(tmpLegend, 'tmpLegend')
  }

  // consoleLog(chartData, 'chartData')

  let barPercentage = 0.2
  const totalData = size(chartData?.data)
  if (totalData > 20) {
    barPercentage = 0.20
  } else if (totalData > 14) {
    barPercentage = 0.4
  } else if (totalData > 10) {
    barPercentage = 0.6
  } else if (totalData > 5) {
    barPercentage = 0.8
  } else {
    barPercentage = 1.5
  }

  const { top } = useSafeAreaInsets()

  useDeviceOrientationChange((o) => {
    consoleLog(o, 'o')
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
    <View style={styles.container}>
      <AppText title center style={styles.mb20}>
        Doanh thu theo thời gian
      </AppText>
      <AppText center style={styles.mb12}>
        <AppText>Tổng doanh thu:</AppText>
        <AppText primary bold size={20}>
          {' ' + moneyFormat(totalRevenue)}
        </AppText>
      </AppText>
      <ResponseContainer
        isFetchingData={false}
        isLoading={!isFetching && isLoading}
        success={isSuccess}
        message={responseMsg}
        tryAgain={refetch}
      >
        {data && !isSuccess ? (
          <ChartLoading />
        ) : (
          (chartData && size(chartData) && (
            <>
              <Pressable
                onPress={() => setShowHint({ ...showHint, visible: false })}
              >
                <StackedBarChart
                  data={chartData}
                  width={chartWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    barPercentage,
                  }}
                  hideLegend
                  yLabelsOffset={0}
                  formatYLabel={(input) => {
                    return Number(input).toFixed(0) + ' tr'
                  }}
                  style={styles.ml32}
                  onPress={(index, x, y) => {
                    // consoleLog(locationX, locationY);w
                    setShowHint({
                      index,
                      visible: true,
                      x,
                      y,
                    })
                  }}
                />
              </Pressable>
              {showHint.visible ? (
                <View
                  style={[
                    styles.hint,
                    {
                      top: showHint.y + 30,
                      left:
                        showHint.x -
                        (showHint.index <= size(chartData.data) / 2 ? 10 : 110),
                    },
                  ]}
                >
                  <StackedBarValues
                    colors={chartData.barColors}
                    legends={chartData.legend}
                    data={chartData.data[showHint.index]}
                  />
                </View>
              ) : null}
              <StackedBarChartLegend data={chartData} />
            </>
          )) || <ChartNoData />
        )}
      </ResponseContainer>
    </View>
  )
}

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 0.9) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  // barPercentage: 0.2,
  useShadowColorFromDataset: false, // optional
  stackedBar: true,
  horizontalOffset: 0,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 4,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  hint: {
    position: 'absolute',
    zIndex: 1,
  },
  mb12: { marginBottom: 12 },
  mb20: { marginBottom: 20 },
  ml32: { marginLeft: -26 },
})
