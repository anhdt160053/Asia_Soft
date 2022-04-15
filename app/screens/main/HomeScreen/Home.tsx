import AppBlock from '@vn.starlingTech/components/AppBlock'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import Container from 'app/components/Container'
import FilterComponent from 'app/components/FilterComponent'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, AppState, ScrollView } from 'react-native'

import { checkToken } from '../Profile/api/api'
import HomeBarChart from './Home.BarChart'
import HomePieChart from './Home.PieChart'
import HomeTopStock from './Home.TopStock'

export type AreaColorsType = { name: string; color: string }

const areaColors: AreaColorsType[] = []

export default () => {
  const { user, signOut } = useAppContext()

  if (!user) {
    signOut()
    return
  }

  const [dateRange, setDateRange] = useState({
    dateFrom: moment().startOf('months').format('YYYY-MM-DD'),
    dateTo: moment().endOf('months').format('YYYY-MM-DD'),
  })

  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const checkTokenExpiration = useCallback(async () => {
    if (!settings.FOR_DEV) {
      if (appStateVisible === 'active') {
        try {
          const response = await checkToken(user)
          consoleLog(response, 'responseCheckToken')
          if (response && response.length && response[0].check === 0) {
          } else {
            Alert.alert(
              'Phiên đăng nhập',
              'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại',
              [{ text: 'Đồng ý', onPress: signOut }],
              { cancelable: false },
            )
          }
        } catch {
          Alert.alert(
            'Phiên đăng nhập',
            'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại',
            [{ text: 'Đồng ý', onPress: signOut }],
            { cancelable: false },
          )
        }
        // consoleLog(response, 'response');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStateVisible, user])

  useEffect(() => {
    checkTokenExpiration()
  }, [checkTokenExpiration])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!')
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
      console.log('AppState', appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <Container>
      <AppBlock flex>
        <FilterComponent dateRange={dateRange} setDateRange={setDateRange} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeBarChart areaColors={areaColors} dateRange={dateRange} />
          <HomePieChart areaColors={areaColors} dateRange={dateRange} />
          <HomeTopStock dateRange={dateRange} />
        </ScrollView>
      </AppBlock>
    </Container>
  )
}
