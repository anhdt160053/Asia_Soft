import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { handlerApiResponseError } from '@vn.starlingTech/api/AppNetworking'
import settings from '@vn.starlingTech/config/settings'
import { useAppTheme } from '@vn.starlingTech/theme/theming'
import React, { ReactElement, ReactNode, useEffect, useReducer } from 'react'
import { RefreshControl } from 'react-native'
import { useQuery } from 'react-query'

import { initScreenState, screenReducer, ScreenState } from './AppHook'
import { ResponseContainer } from './container/AppResponse'

type Props = {
  queryKey?: any
  getScreenData: (params: any) => Promise<any>
  renderContent?: (data: any | undefined) => ReactElement
  renderFooter?: (data: any) => ReactNode
  scrollManual?: boolean
  onRefresh?: () => void
  emptyMessage?: string
  timing?: number
}

interface State extends ScreenState {
  data: any[]
}

const initState: State = { ...{ ...initScreenState, paging: false }, data: [] }

export default function (props: Props) {
  const { colors } = useAppTheme()
  const [state, dispatch] = useReducer(screenReducer, initState)

  const resA = useQuery(
    [props.queryKey, state.timing],
    ({ pageParam = 1 }) => props.getScreenData(pageParam),
    {
      retry: settings.QUERY_RETRY,
      keepPreviousData: true,
    },
  )

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    isFetching,
    isPreviousData,
  } = resA

  // consoleLog(resA, 'resA');

  useEffect(() => {
    if (props.timing) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timing])

  const onRefresh = () => {
    dispatch({ type: 'REFRESH', data })
  }

  let refreshing = state.refreshing
  let responseMessage = state.responseMessage
  if (isError && error) {
    const { message } = handlerApiResponseError(error)
    responseMessage = message
  } else if (isSuccess) {
    responseMessage = ''
    refreshing = false
  }

  if (props.scrollManual) {
    return (
      <ResponseContainer
        hasCached={isPreviousData}
        success={isSuccess}
        color={colors.text}
        tryAgain={refetch}
        isLoading={isLoading}
        isFetchingData={!refreshing && !isLoading && isFetching}
        message={responseMessage}
      >
        {data && props?.renderContent && props.renderContent(data)}
      </ResponseContainer>
    )
  }

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ResponseContainer
          hasCached={isPreviousData}
          success={isSuccess}
          color={colors.text}
          tryAgain={refetch}
          isLoading={isLoading}
          isFetchingData={!refreshing && !isLoading && isFetching}
          message={responseMessage}
        >
          {data && props?.renderContent && props.renderContent(data)}
        </ResponseContainer>
      </KeyboardAwareScrollView>
      {props.renderFooter ? props.renderFooter(data) : null}
    </>
  )
}
