import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppText from '@vn.starlingTech/components/AppText'
import AppTextInput from '@vn.starlingTech/components/form/AppTextInput'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { removeVietnameseTones } from '@vn.starlingTech/helpers/textHelper'
import light from '@vn.starlingTech/theme/light'
import { reportKeys } from 'app/screens/main/Report/api/api'
import { LOOK_UP_TYPES } from 'app/types'
import DownIcon from 'assets/svg/DownIcon'
import LookupBack from 'assets/svg/LookupBack'
import LookupClose from 'assets/svg/LookupClose'
import { isString } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { ActivityIndicator } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation } from 'react-query'

import { getLookUp } from './api'

type ItemType = {
  Name: string
  Name2: string
  Value: string
  Address?: string
  Tel?: string
}

export type Props = {
  page?: string
  renderSelectView?: () => ReactElement
  selected: string | undefined
  lookUpType: LOOK_UP_TYPES
  title: string
  require?: true | undefined
  onSelected: (t?: string) => void
}

export default function (props: Props) {
  const [selectedItem, setSelectedItem] = useState<ItemType>()

  const [data, setData] = useState<ItemType[]>([])
  const [dataFilter, setDataFilter] = useState<ItemType[]>([])

  const [showingModal, setShowingModal] = useState(false)

  const [keyword, setKeyword] = useState('')

  const { user } = useAppContext()

  if (!user) {
    return null
  }

  const handleData = (listData: ItemType[], selectedValue?: string) => {

    if (selectedValue) {
      const tmpSelected = listData.find((item) => item.Value === selectedValue)
      setSelectedItem(tmpSelected)
    }
  }

  const { mutate, isLoading } = useMutation(
    [reportKeys.lookUp(props.lookUpType), props.lookUpType, user.username],
    getLookUp,
    {
      retry: settings.QUERY_RETRY,
      onSuccess: (data) => {
        const tmp: ItemType[] = []
        data.map((item) => {
          tmp.push({
            Name: item.name,
            Name2: removeVietnameseTones(item.name),
            Value: item.code,
            Address: item.dia_chi,
            Tel: item.tel,
          })
        })
        handleData(tmp, props.selected)
        setData(tmp)
      },
    },
  )

  useEffect(() => {
    // if (showingModal) {
    mutate({ user, type: props.lookUpType })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lookUpType]) // -> load du lieu khi lookUpType thay doi

  useEffect(() => {
    handleData(dataFilter, props.selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilter, props.selected])

  useEffect(() => {
    setDataFilter(
      data.filter((item) =>
        item.Name2?.toLowerCase().includes(keyword?.toLowerCase()),
      ),
    )
  }, [keyword, data])

  const onSelected = (value?: string) => {
    props.onSelected(value)
    setSelectedItem(undefined)
    setKeyword('')
    hideShowingModal()
  }

  const renderSelectView = () => {
    return (
      <TouchableOpacity onPress={onShowingModal}>
        <AppText style={styles.labelSearchBox}>
          {props.title}
          {props.require ? <AppText color={light.danger}> *</AppText> : null}
          <AppText>:</AppText>
        </AppText>
        <AppBlock row center space="between" style={styles.selectBox}>
          {isLoading ? (
            <AppBlock style={styles.loading}>
              <ActivityIndicator size="small" />
            </AppBlock>
          ) : (
            <>
              <AppText
                note={!selectedItem || selectedItem.Name === undefined}
                style={styles.textSearchBox}
              >
                {selectedItem?.Name !== undefined
                  ? selectedItem.Name
                  : `Tìm kiếm ${props.title.toLowerCase()}`}
              </AppText>
              <DownIcon width={appSize(18)} />
            </>
          )}
        </AppBlock>
      </TouchableOpacity>
    )
  }

  const onShowingModal = () => {
    setShowingModal(true)
  }

  const hideShowingModal = () => {
    setShowingModal(false)
  }

  if (!showingModal) {
    return props.renderSelectView ? (
      <TouchableOpacity onPress={onShowingModal}>
        {props.renderSelectView()}
      </TouchableOpacity>
    ) : (
      renderSelectView()
    )
  }

  const renderItem = ({ item }: { item: ItemType }) => {
    const isSelected = selectedItem?.Value === item.Value
    return (
      <TouchableOpacity
        onPress={() => onSelected(item.Value)}
        style={[styles.item, isSelected && styles.itemSelected]}
      >
        <AppText
          size={appSize(14)}
          height={appSize(20)}
          color={isSelected ? light.primary : '#101010'}
        >
          {item.Name?.trim()}
        </AppText>

        {isString(item.Value) && item.Value?.trim() ? (
          <AppBlock margin={[7, 0, 0]}>
            <AppText
              size={appSize(14)}
              color={isSelected ? light.primary : '#959595'}
            >
              {item.Value?.trim()}
            </AppText>
          </AppBlock>
        ) : null}

        {isString(item.Address) && item.Address?.trim() ? (
          <AppBlock margin={[7, 0, 0]}>
            <AppText
              size={appSize(14)}
              color={isSelected ? light.primary : '#959595'}
            >
              {item.Address?.trim()}
            </AppText>
          </AppBlock>
        ) : null}

        {isString(item.Tel) && item.Tel?.trim() ? (
          <AppBlock margin={[7, 0, 0]}>
            <AppText
              size={appSize(14)}
              color={isSelected ? light.primary : '#959595'}
            >
              {item.Tel?.trim()}
            </AppText>
          </AppBlock>
        ) : null}
      </TouchableOpacity>
    )
  }

  const { top } = useSafeAreaInsets()

  return (
    <Modal
      animationIn="fadeIn"
      isVisible={showingModal}
      onBackButtonPress={hideShowingModal}
      backdropColor="#FFFFFF"
      backdropOpacity={1}
      style={styles.noMargin}
    >
      <StatusBar barStyle="dark-content" />
      <AppBlock flex style={{ paddingTop: top }}>
        <AppBlock row middle padding={[6, 0]}>
          <TouchableOpacity onPress={hideShowingModal} style={styles.icon}>
            <LookupBack width={24} />
          </TouchableOpacity>
          <AppBlock flex>
            <AppTextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder={`Tìm kiếm ${props.title.toLowerCase()}`}
            />
          </AppBlock>
          <TouchableOpacity style={styles.icon} onPress={() => onSelected()}>
            <LookupClose width={24} />
          </TouchableOpacity>
        </AppBlock>
        {isLoading ? (
          <AppBlock padding={[16, 0]}>
            <ActivityIndicator />
          </AppBlock>
        ) : null}
        <FlatList data={dataFilter} renderItem={renderItem} />
      </AppBlock>
    </Modal>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    height: appSize(48),
    justifyContent: 'center',
    width: appSize(48),
  },
  item: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemSelected: {
    backgroundColor: '#f6f7f8',
  },
  labelSearchBox: {
    color: light.text,
    fontSize: appSize(14),
    marginBottom: 9,
    marginTop: 26,
  },
  loading: { alignSelf: 'center', flex: 1 },
  noMargin: { margin: 0 },
  selectBox: {
    borderColor: '#959595',
    borderRadius: appSize(5),
    borderWidth: 0.5,
    paddingHorizontal: appSize(16),
    paddingVertical: appSize(12),
  },
  textSearchBox: {
    fontSize: appSize(14),
  },
})
