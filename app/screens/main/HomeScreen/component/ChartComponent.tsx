import AppStyles from '@vn.starlingTech/components/AppStyles'
import AppText from '@vn.starlingTech/components/AppText'
import { OnProcessing } from '@vn.starlingTech/components/screens/container/AppResponse'
import { numberFormat } from '@vn.starlingTech/helpers/numberHelper'
import { clone, isArray } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export type PieChartDataType = {
  name: string
  population: number
  color: string
}

export type StackBarChartDataType = {
  legend: string[]
  labels: string[]
  data: number[][]
  barColors: string[]
}

export type BarChartDataType = {
  labels: string[]
  data: number[]
  colors: any[]
}

export function ChartLoading() {
  return (
    <View style={styles.container}>
      <OnProcessing />
    </View>
  )
}

export function ChartNoData() {
  return (
    <View style={styles.container}>
      <AppText note center>
        Không có dữ liệu
      </AppText>
    </View>
  )
}

type PieChartLegendProps = { data: PieChartDataType[] }
export function PieChartLegend({ data }: PieChartLegendProps) {
  return (
    <View style={styles.rowHorLegend}>
      {data.map((item, index) => {
        return (
          <View style={styles.rowLegend} key={'pie-' + index}>
            <View style={[styles.legend, { backgroundColor: item.color }]} />
            <AppText>{item.name}</AppText>
          </View>
        )
      })}
    </View>
  )
}

type StackedBarChartLegendProps = { data: StackBarChartDataType }
export function StackedBarChartLegend({ data }: StackedBarChartLegendProps) {
  if (!data) {
    return null
  }
  return (
    <View style={styles.rowHorLegend}>
      {data.legend.map((item, index) => {
        return (
          <View style={styles.rowLegend} key={'stacked-' + index}>
            <View
              style={[
                styles.legend,
                { backgroundColor: data.barColors[index] },
              ]}
            />
            <AppText>{item}</AppText>
          </View>
        )
      })}
    </View>
  )
}

export function StackedBarValues({ legends, data, colors }: any) {
  if (!legends || !data || !colors) {
    return null
  }
  const nLegends = isArray(legends) ? clone(legends).reverse() : []
  const nData = isArray(data) ? clone(data).reverse() : []
  const nColors = isArray(colors) ? clone(colors).reverse() : []
  return (
    <View style={styles.stackedBarValues}>
      {nLegends.map((item, index) => {
        return (
          <View style={[AppStyles.row, styles.b6]} key={'stacked-' + index}>
            <View
              style={[styles.legend, { backgroundColor: nColors[index] }]}
            />
            <AppText color="#FFF">
              {numberFormat(nData[index] * 1000000)}
            </AppText>
          </View>
        )
      })}
    </View>
  )
}

export function PieBarValues({
  data,
  index,
}: {
  data: PieChartDataType[]
  index: number
}) {
  let total = 0
  data.map((item) => {
    total += Number(item.population)
  })
  const percent = ((100 * Number(data[index].population)) / total).toFixed(2)
  return (
    <View style={[styles.stackedBarValues, styles.stackedPieValues]}>
      <View style={[AppStyles.row, styles.b6]}>
        <View style={[styles.legend, { backgroundColor: data[index].color }]} />
        <AppText color="#FFF">{percent} %</AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  b6: { marginBottom: 6 },
  container: {
    alignItems: 'center',
    height: 220,
    justifyContent: 'center',
  },
  legend: {
    borderRadius: 99,
    height: 18,
    marginRight: 6,
    width: 18,
  },
  rowHorLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    paddingBottom: 12,
  },
  rowLegend: {
    ...AppStyles.rowCenter,
    marginBottom: 12,
    marginHorizontal: 8,
  },
  stackedBarValues: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 8,
    minWidth: 160,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  stackedPieValues: {
    minWidth: 80,
    width: 120,
  },
})
