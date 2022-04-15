import { DrawerActions, useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParams } from 'app/navigation/params'
import BackIcon from 'assets/svg/BackIcon'
import CartIcon from 'assets/svg/CartIcon'
import MenuIcon from 'assets/svg/MenuIcon'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function HeaderLeftMenu() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
    >
      <MenuIcon color="#FFF" />
    </TouchableOpacity>
  )
}

export function HeaderLeftBack({ onPress }: { onPress?: () => void }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress ? onPress : navigation.goBack}
    >
      <BackIcon color="#FFF" />
    </TouchableOpacity>
  )
}

export function HeaderRightCart() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>()

  const goToCart = () => {
    navigation.navigate('Cart')
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToCart}>
      <CartIcon color="#FFF" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 16,
    width: 48,
  },
})
