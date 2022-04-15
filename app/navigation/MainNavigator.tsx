import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import { HeaderLeftBack, HeaderLeftMenu } from 'app/components/AppHeader'
import Home from 'app/screens/main/HomeScreen/Home'
import ChangePass from 'app/screens/main/Profile/ChangePass'
import CustomerDetail from 'app/screens/main/Report/CustomerList/CustomerDetail'
import CustomerList from 'app/screens/main/Report/CustomerList/CustomerList'
import FilterScreenCustomer from 'app/screens/main/Report/CustomerList/FilterScreenCustomer'
import DebtDetail from 'app/screens/main/Report/ReportDebt/DebtDetail'
import FilterScreenDebt from 'app/screens/main/Report/ReportDebt/FilterScreenDebt'
import ReportDebt from 'app/screens/main/Report/ReportDebt/ReportDebt'
import FilterScreenInventory from 'app/screens/main/Report/ReportInventory/FilterScreenInventory'
import InventoryDetail from 'app/screens/main/Report/ReportInventory/InventoryDetail'
import ReportInventory from 'app/screens/main/Report/ReportInventory/ReportInventory'
import ReportRevenue from 'app/screens/main/Report/ReportRevenue/ReportRevenue'
import FilterScreenStockOut from 'app/screens/main/Report/StockOut/FilterScreenStockOut'
import ReportStockOut from 'app/screens/main/Report/StockOut/ReportStockOut'
import StockOutInvoiceDetail from 'app/screens/main/Report/StockOut/StockOutInvoiceDetail'
import React, { useEffect, useRef } from 'react'
import { Animated, StatusBar, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import AppDrawerContent from './AppDrawerContent'
import { DrawerStackParams, StackParams } from './params'

const Drawer = createDrawerNavigator<DrawerStackParams>()
function DrawerStack() {
  const { colors } = useAppTheme()
  return (
    <LinearGradient colors={[colors.primary, '#008BAD']} style={AppStyles.fill}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          headerShown: false,
          overlayColor: 'transparent',
          sceneContainerStyle: { backgroundColor: 'transparent' },
          drawerStyle: { width: '68%', backgroundColor: 'transparent' },
        }}
        drawerContent={(props) => <AppDrawerContent {...props} />}
      >
        <Drawer.Screen name="Main" component={StackNavigator} />
      </Drawer.Navigator>
    </LinearGradient>
  )
}

const Stack = createStackNavigator<StackParams>()
function StackNavigator() {
  const { dark, colors } = useAppTheme()
  const isDrawerOpen = useDrawerStatus() === 'open'
  const animation = useRef(new Animated.Value(0)).current

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  })

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const animatedStyle = {
    borderRadius,
    transform: [{ scale }],
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
  }, [])

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start()
  }, [isDrawerOpen, animation])

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: dark ? '#666' : '#FFFFFF',
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { color: '#FFF' },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        {StackScreenData.map((item, index) => {
          return (
            <Stack.Screen
              options={{
                title: item.title,
                headerLeft: () =>
                  item.drawer ? <HeaderLeftMenu /> : <HeaderLeftBack />,
              }}
              {...item}
              key={'sscreen-' + index}
            />
          )
        })}
      </Stack.Navigator>
    </Animated.View>
  )
}

export default DrawerStack

type StackScreenType = {
  name: keyof StackParams
  title?: string
  component: any
  drawer?: boolean
}

const StackScreenData: StackScreenType[] = [
  {
    name: 'Home',
    title: 'Tổng quan',
    component: Home,
    drawer: true,
  },
  {
    name: 'ReportRevenue',
    title: 'Báo cáo doanh thu',
    component: ReportRevenue,
    drawer: true,
  },
  {
    name: 'ReportInventory',
    title: 'Báo cáo tồn kho',
    component: ReportInventory,
    drawer: true,
  },
  {
    name: 'InventoryDetail',
    title: 'Chi tiết vật tư',
    component: InventoryDetail,
    drawer: false,
  },
  {
    name: 'FilterScreenInventory',
    title: 'Bộ lọc',
    component: FilterScreenInventory,
    drawer: false,
  },
  {
    name: 'ReportDebt',
    title: 'Báo cáo công nợ',
    component: ReportDebt,
    drawer: true,
  },
  {
    name: 'DebtDetail',
    title: 'Chi tiết công nợ',
    component: DebtDetail,
    drawer: false,
  },
  {
    name: 'FilterScreenDebt',
    title: 'Bộ lọc',
    component: FilterScreenDebt,
    drawer: false,
  },
  {
    name: 'ReportStockOut',
    title: 'Báo cáo thực hiện xuất hàng',
    component: ReportStockOut,
    drawer: true,
  },
  {
    name: 'StockOutInvoiceDetail',
    title: 'Hóa đơn',
    component: StockOutInvoiceDetail,
    drawer: false,
  },
  {
    name: 'FilterScreenStockOut',
    title: 'Bộ lọc',
    component: FilterScreenStockOut,
    drawer: false,
  },
  {
    name: 'CustomerList',
    title: 'Danh mục khách hàng',
    component: CustomerList,
    drawer: true,
  },
  {
    name: 'CustomerDetail',
    title: 'Chi tiết khách hàng',
    component: CustomerDetail,
    drawer: false,
  },
  {
    name: 'FilterScreenCustomer',
    title: 'Bộ lọc',
    component: FilterScreenCustomer,
    drawer: false,
  },
  {
    name: 'ChangePass',
    title: 'Thay đổi mật khẩu',
    component: ChangePass,
    drawer: true,
  },
]
