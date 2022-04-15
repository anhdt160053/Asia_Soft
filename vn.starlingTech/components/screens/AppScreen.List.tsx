import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import { size } from 'lodash'
import React, { ReactElement, useReducer, useEffect } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { useInfiniteQuery } from 'react-query'

import AppBlock from '../AppBlock'
import { initScreenState, screenReducer, ScreenState } from './AppHook'
import {
  ListEmptyComponent,
  ListEndReachedFooter,
} from './container/AppList.Container'
import { ResponseContainer } from './container/AppResponse'

type Props = {
  queryKey?: any
  getScreenData: (params: any) => Promise<any>
  renderItem: ListRenderItem<any>
  renderHeader?: (total: number) => ReactElement | null
  numColumns?: number
  noPaging?: boolean
  listContainerStyle?: ViewStyle
  containerStyle?: ViewStyle
  onRefresh?: () => void
  emptyMessage?: string
  timing: number
  onSuccess?: (params: any) => void
  fake?: boolean
}

interface State extends ScreenState {
  data: any[]
}

const initState: State = { ...initScreenState, data: [] }

function AppScreenList(props: Props) {
  const { colors } = useAppTheme()
  const [state, dispatch] = useReducer(screenReducer, initState)

  const resA = useInfiniteQuery(
    [props.queryKey, state.timing],
    ({ pageParam = 1 }) => props.getScreenData(pageParam),
    {
      keepPreviousData: true,
      getPreviousPageParam: () => false,
      getNextPageParam: () => false,
      // getPreviousPageParam: firstPage =>
      //   Number(firstPage.page) > 1 ? Number(firstPage.page) - 1 : false,
      // getNextPageParam: lastPage =>
      //   Number(lastPage.page) < Number(lastPage.total_page)
      //     ? Number(lastPage.page) + 1
      //     : false,
    },
  )

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    data: resData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isPreviousData,
  } = resA

  // consoleLog(isLoading, 'isLoading');
  // consoleLog(resA, 'res AppScreenList');

  const refreshing = state.refreshing && isPreviousData
  let responseMessage = state.responseMessage
  let getNextDataMessage = ''
  if (isError && error) {
    const { message } = handlerApiResponseError(error)
    if (state.page === 1) {
      responseMessage = message
    } else {
      getNextDataMessage = message
    }
  } else if (isSuccess) {
    responseMessage = ''
  }

  let currentList: any[] = state.data as any[]
  if (resData) {
    // consoleLog(resData);
    if (!props.fake) {
      //force no paging
      currentList = [] //resData?.pages[0];
      resData?.pages?.map((data) => {
        currentList = [...currentList, ...data]
      })
    }
  }

  // useEffect(() => {
  //   if (isFetched && resData?.pages) {
  //     consoleLog('updateData...', resData.pages[0].total);
  //     props.onSuccess && props.onSuccess(resData.pages[0].total);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFetched, resData]);

  useEffect(() => {
    if (props.timing) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timing])

  const onRefresh = () => {
    dispatch({ type: 'REFRESH', data: currentList })
  }

  const onEndReached = async () => {
    if (!isFetchingNextPage && isSuccess && hasNextPage) {
      loadNextData(state.page + 1)
    }
  }

  const loadNextData = async (page: number = state.page) => {
    dispatch({ type: 'LOAD_MORE', page })
    fetchNextPage()
  }

  function handlerNextDataMessage() {
    if (isFetchingNextPage) {
      getNextDataMessage = ''
    }
    if (!hasNextPage) {
      getNextDataMessage = getString().endDataMessage
    }
  }

  const hasCached = size(currentList) > 0
  // const screenIsLoading = isLoading && !hasCached;

  // consoleLog(currentList, 'currentList');

  handlerNextDataMessage()

  return (
    <AppBlock
      style={[
        styles.container,
        { backgroundColor: colors.background },
        props.containerStyle,
      ]}
    >
      <ResponseContainer
        success={isSuccess}
        color={colors.text}
        isLoading={isLoading}
        isFetchingData={!refreshing && !isLoading && isFetching}
        tryAgain={refetch}
        page={state.page}
        hasCached={hasCached}
        message={responseMessage}
      >
        <FlatList
          data={currentList}
          refreshing={refreshing}
          numColumns={props.numColumns || 1}
          renderItem={props.renderItem}
          keyExtractor={keyExtractor}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          ListHeaderComponent={
            props.renderHeader && props.renderHeader(size(currentList))
          }
          ListFooterComponent={
            props.noPaging || (isError && state.page === 1) ? (
              <View style={styles.h30} />
            ) : (
              <>
                <ListEndReachedFooter
                  isError={isError}
                  tryAgain={loadNextData}
                  page={state.page}
                  message={getNextDataMessage}
                />
                <View style={styles.h30} />
              </>
            )
          }
          ListEmptyComponent={() =>
            (!isLoading && !isFetching && (
              <ListEmptyComponent message={props.emptyMessage} />
            )) ||
            null
          }
          contentContainerStyle={[
            styles.listContainer,
            props.listContainerStyle,
          ]}
        />
      </ResponseContainer>
    </AppBlock>
  )
}

export const keyExtractor = (item: any, index: any) => '' + index.toString()

export default AppScreenList
// export default React.memo(AppScreenList);

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', flex: 1 },
  h30: { height: 120 },
  listContainer: { paddingHorizontal: 12, paddingTop: 16 },
})
