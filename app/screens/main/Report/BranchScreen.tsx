import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppButton from '@vn.starlingTech/components/AppButton'
import AppText from '@vn.starlingTech/components/AppText'
import { ResponseContainer } from '@vn.starlingTech/components/screens/container/AppResponse'
import AppConstants from '@vn.starlingTech/config/AppConstant'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import light from '@vn.starlingTech/theme/light'
import { HeaderLeftBack } from 'app/components/AppHeader'
import Container from 'app/components/Container'
import { StackParams } from 'app/navigation/params'
import CheckedIcon from 'assets/svg/CheckedIcon'
import SortAZIcon from 'assets/svg/SortAZIcon'
import SortZAIcon from 'assets/svg/SortZAIcon'
import UnCheckIcon from 'assets/svg/UnCheckIcon'
import { clone, findIndex } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'

import { getListBranches } from './api/api'
import { ResponseBranch } from './api/type'

export default ({
  navigation,
  route,
}: StackScreenProps<StackParams, 'Branch'>) => {
  const [insets] = useState(useSafeAreaInsets())

  const { user } = useAppContext()

  if (!user) {
    return null
  }

  const [refreshing, setRefreshing] = useState(false)
  const [responseMsg, setResponseMsg] = useState('')

  const { data, isSuccess, isLoading, isFetching, refetch } = useQuery(
    ['listBranch'],
    () => getListBranches(user),
  )

  // const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<
    { name: string; id: string }[]
  >(route.params.branchList || [])

  const [sortAZ, setSortAZ] = useState(true)

  const onSort = useCallback(() => {
    setSortAZ(!sortAZ)
  }, [sortAZ])

  // const toggleAll = useCallback(
  //   (_checkAll: boolean) => {
  //     setCheckAll(_checkAll);
  //     if (data && _checkAll) {
  //       const tmpList: string[] = [];
  //       data.map(item => {
  //         tmpList.push(item.ma_dl);
  //       });
  //       setCheckedList(tmpList);
  //     }
  //     if (!_checkAll) {
  //       setCheckedList([]);
  //     }
  //   },
  //   [data],
  // );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftBack />,
      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable onPress={onSort}>
            {sortAZ ? (
              <SortAZIcon color="#e4e4e4" />
            ) : (
              <SortZAIcon color="#e4e4e4" />
            )}
          </Pressable>
          {/* <Pressable
            style={{marginLeft: 16}}
            onPress={() => toggleAll(!checkAll)}>
            {checkAll ? <CheckedIcon /> : <UnCheckIcon />}
          </Pressable> */}
        </View>
      ),
    })
  }, [navigation, onSort, sortAZ])

  const tryAgain = () => {
    setResponseMsg('')
    refetch()
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  function toggleItem(name: string, branchId: string) {
    // setCheckedList([{name, id: branchId}]);
    const tmpList = clone(checkedList)
    const index = findIndex(tmpList, (branch) => branch.id === branchId)
    if (index > -1) {
      // tmpList.splice(index, 1);
      setCheckedList([])
    } else {
      setCheckedList([{ name, id: branchId }])
      // tmpList.push(branchId);
    }
    // setCheckedList(tmpList);
    // if (size(tmpList) === size(data)) {
    //   setCheckAll(true);
    // } else if (checkAll) {
    //   setCheckAll(false);
    // }
  }

  let tmpListData = clone(data)
  if (data) {
    if (sortAZ) {
      tmpListData = data.sort((a, b) => {
        return a.ten_dl.localeCompare(b.ten_dl)
      })
    } else {
      tmpListData = data.sort((a, b) => {
        return b.ten_dl.localeCompare(a.ten_dl)
      })
    }
    // consoleLog(tmpListData, 'xxx');
  }

  const onSubmit = () => {
    navigation.navigate(route.params.screen, {
      branchId: checkedList,
    })
  }

  const renderItem = ({ item }: { item: ResponseBranch }) => {
    const selected =
      findIndex(checkedList, (branch) => branch.id === item.ma_dl) > -1
    return (
      <Pressable
        onPress={() => toggleItem(item.ten_dl, item.ma_dl)}
        style={styles.item}
      >
        <AppBlock flex>
          <AppText primary={selected} bold={selected}>
            {item.ten_dl}
          </AppText>
          <AppText note={!selected} primary={selected} style={styles.mt6}>
            {item.ma_dl}
          </AppText>
        </AppBlock>
        {selected ? (
          <CheckedIcon color={selected ? light.primary : light.text} />
        ) : (
          <UnCheckIcon color={light.placeholder} />
        )}
      </Pressable>
    )
  }

  return (
    <Container>
      <ResponseContainer
        isLoading={isLoading}
        message={responseMsg}
        tryAgain={tryAgain}
        isFetchingData={isFetching}
        success={isSuccess}
      >
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && isFetching}
            onRefresh={onRefresh}
            keyExtractor={(_, index) => index.toString()}
            data={tmpListData}
            renderItem={renderItem}
          />
          <AppButton
            onPress={onSubmit}
            primary
            text="Đồng ý"
            style={[styles.btn, { marginBottom: 10 + insets.bottom }]}
          />
        </>
      </ResponseContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: 10,
    width: AppConstants.WIDTH - 32,
  },
  headerRight: { flexDirection: 'row', marginRight: 16 },
  item: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mt6: { marginTop: 6 },
})
