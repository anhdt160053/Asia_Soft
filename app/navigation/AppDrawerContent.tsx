import { useNavigation } from '@react-navigation/core'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppText from '@vn.starlingTech/components/AppText'
import Line from '@vn.starlingTech/components/Line'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { getImgBase64 } from '@vn.starlingTech/helpers/imageHelper'
import { showAlertMessage } from '@vn.starlingTech/helpers/messageHelper'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import { FUNCTION_ID } from 'app/types'
import CustomerIcon from 'assets/svg/CustomerIcon'
import DebtIcon from 'assets/svg/DebtIcon'
import HomeIconTQT from 'assets/svg/HomeIconTQT'
import PasswordIcon from 'assets/svg/PasswordIcon'
import RevenueIcon from 'assets/svg/RevenueIcon'
import SignOutIcon from 'assets/svg/SignOutIcon'
import StockOutIcon from 'assets/svg/StockOutIcon'
import StorageIcon from 'assets/svg/StorageIcon'
import { some } from 'lodash'
import React from 'react'
import { Platform, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { StackParams } from './params'

export default (props: DrawerContentComponentProps) => {
  const { signOut, user } = useAppContext()
  const { colors } = useAppTheme()
  // useEffect(() => {
  StatusBar.setBarStyle('light-content')
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(colors.primary)
  }
  // }, [colors.primary]);

  if (!user) {
    return null
  }

  const { navigation } = props

  const confirmSignOut = () => {
    showAlertMessage({
      title: 'Đăng xuất',
      message: 'Bạn muốn thoát tài khoản?',
      positiveOnPress: signOut,
      negativeTitle: 'Huỷ',
    })
  }

  const insets = useSafeAreaInsets()

  return (
    <>
      <DrawerContentScrollView
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      >
        <AppBlock style={styles.avatar}>
          <Avatar.Image
            size={100}
            source={{ uri: getImgBase64(user.avatar) }}
          />
          <AppText bold size={15} color="white" style={styles.drawerTxt}>
            {user.name}
          </AppText>
        </AppBlock>
        <AppBlock flex padding={[0, 0, 0, 16]}>
          <Line style={styles.line} />
          {drawerData.map((item, index) => {
            if (
              !settings.FOR_DEV &&
              item.id &&
              !some(user.functionIds, (f) => f === item.id)
            ) {
              return null
            }
            return <DrawerItem {...item} key={'drawer-item-' + index} />
          })}
          <Line style={styles.line} />
          <DrawerItem
            onPress={() => navigation.navigate('ChangePass')}
            icon={<PasswordIcon color="#FFF" />}
            text="Thay đổi mật khẩu"
          />
          <DrawerItem
            icon={<SignOutIcon color="#101010" />}
            textColor="#101010"
            text="Đăng xuất"
            onPress={confirmSignOut}
          />
        </AppBlock>
      </DrawerContentScrollView>
      <AppText
        center
        color="rgba(255,255,255,0.2)"
        style={[
          {
            bottom: insets.bottom + 12,
          },
          styles.version,
        ]}
      >
        v{settings.versionDev}
      </AppText>
    </>
  )
}

type DrawerItemProps = {
  id?: FUNCTION_ID
  icon: React.ReactNode
  text: string
  screen?: keyof StackParams
  textColor?: string
  onPress?: () => void
}
const DrawerItem = ({
  icon,
  text,
  textColor,
  screen,
  onPress,
}: DrawerItemProps) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>()
  const onItemPress = () => {
    if (onPress) {
      onPress()
      return
    }
    if (screen) {
      navigation.navigate(screen)
    }
  }
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={styles.drawerItem}
      activeOpacity={0.6}
    >
      {icon}
      <AppText
        color={textColor || '#FFF'}
        size={15}
        style={styles.drawerItemTxt}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  )
}

const drawerData: DrawerItemProps[] = [
  {
    id: FUNCTION_ID.TONG_QUAN,
    icon: <HomeIconTQT color="#FFF" />,
    text: 'Tổng quan',
    screen: 'Home',
  },
  {
    id: FUNCTION_ID.BAO_CAO_DOANH_THU,
    icon: <RevenueIcon color="#FFF" />,
    text: 'Báo cáo doanh thu',
    screen: 'ReportRevenue',
  },
  {
    id: FUNCTION_ID.BAO_CAO_TON_KHO,
    icon: <StorageIcon color="#FFF" />,
    text: 'Báo cáo tồn kho',
    screen: 'ReportInventory',
  },
  {
    id: FUNCTION_ID.BAO_CAO_CONG_NO,
    icon: <DebtIcon color="#FFF" />,
    text: 'Báo cáo công nợ',
    screen: 'ReportDebt',
  },
  {
    id: FUNCTION_ID.BAO_CAO_XUAT_HANG,
    icon: <StockOutIcon color="#FFF" />,
    text: 'Báo cáo thực hiện xuất hàng',
    screen: 'ReportStockOut',
  },
  {
    id: FUNCTION_ID.DANH_MUC_KH,
    icon: <CustomerIcon color="#FFF" />,
    text: 'Danh mục khách hàng',
    screen: 'CustomerList',
  },
]

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  drawerItem: { alignItems: 'center', flexDirection: 'row', marginBottom: 23 },
  drawerItemTxt: { marginLeft: 12 },
  drawerTxt: { marginBottom: 4, paddingTop: 16 },
  line: { marginBottom: 24 },
  version: {
    position: 'absolute',
    right: 0,
  },
})
