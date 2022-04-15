import AppText from '@vn.starlingTech/components/AppText'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

type ListEmptyComponentProps = {
  message?: string
}
export function ListEmptyComponent({ message }: ListEmptyComponentProps) {
  return (
    <AppText center note style={styles.text}>
      {message || getString().emptyData}
    </AppText>
  )
}

type ListEndReachedFooterProps = {
  isError: boolean
  color?: string
  page: number
  message?: string
  tryAgain: () => void
}
export const ListEndReachedFooter = (props: ListEndReachedFooterProps) => {
  const { colors } = useAppTheme()
  if (props.message) {
    if (props.page <= 1) {
      return null
    }
    if (props.isError) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.container}
          onPress={props.tryAgain}
        >
          <AppText center style={styles.errMsg}>
            <Ionicons name="ios-reload" size={14} />
            {props.message}
          </AppText>
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <AppText center note style={styles.text}>
          {props.message}
        </AppText>
      </View>
    )
  }
  return <ActivityIndicator color={colors.text} animating />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
  },
  errMsg: { color: 'red', fontSize: 14 },
  text: { marginVertical: 16 },
})
