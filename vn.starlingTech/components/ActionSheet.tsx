import light from '@vn.starlingTech/theme/light'
import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'

import AppText from './AppText'

export type ActionSheetItemType = {
  id: number | string
  label: string
  onPress: () => void
}

type Props = {
  visible: boolean
  actionItems: ActionSheetItemType[]
  onCancel: () => void
  onModalHide?: () => void
  actionTextColor?: string
  noModal?: boolean
}
const ActionSheet = (props: Props) => {
  const { actionItems, onCancel } = props
  const actionSheetItems = [
    ...actionItems,
    // {
    //   id: '#cancel',
    //   label: 'Cancel',
    //   onPress: props?.onCancel,
    // },
  ]

  if (props.noModal) {
    return (
      <TouchableOpacity onPress={onCancel} style={styles.modal}>
        <View style={styles.modalContent}>
          {actionSheetItems.map((actionItem, index) => {
            return (
              <TouchableHighlight
                style={[
                  styles.actionSheetView,
                  index === 0 && styles.item0,
                  index === actionSheetItems.length - 2 && styles.itemLast,
                  index === actionSheetItems.length - 1 && styles.itemCancel,
                ]}
                key={index}
                underlayColor="#f7f7f7"
                onPress={actionItem.onPress}
              >
                <AppText
                  style={[
                    styles.actionSheetText,
                    { color: light.text },
                    (props?.actionTextColor && {
                      color: props?.actionTextColor,
                    }) ||
                      undefined,
                    index === actionSheetItems.length - 1 && styles.cancelColor,
                  ]}
                >
                  {actionItem.label}
                </AppText>
              </TouchableHighlight>
            )
          })}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      useNativeDriver
      isVisible={props.visible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      coverScreen
      onModalHide={props.onModalHide}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        {actionSheetItems.map((actionItem, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.actionSheetView,
                index === 0 && styles.item0,
                index === actionSheetItems.length - 2 && styles.itemLast,
                index === actionSheetItems.length - 1 && styles.itemCancel,
              ]}
              key={index}
              underlayColor="#f7f7f7"
              onPress={actionItem.onPress}
            >
              <AppText
                style={[
                  styles.actionSheetText,
                  { color: light.text },
                  (props?.actionTextColor && {
                    color: props?.actionTextColor,
                  }) ||
                    undefined,
                  index === actionSheetItems.length - 1 && styles.cancelColor,
                ]}
              >
                {actionItem.label}
              </AppText>
            </TouchableHighlight>
          )
        })}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  actionSheetText: {
    fontSize: 18,
  },
  actionSheetView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingTop: 16,
  },
  cancelColor: {
    color: '#fa1616',
  },
  item0: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemCancel: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 8,
  },
  itemLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 20,
    marginLeft: 8,
    marginRight: 8,
  },
})

export default ActionSheet
