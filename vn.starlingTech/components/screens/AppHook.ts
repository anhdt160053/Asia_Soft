import moment from 'moment'

export const initScreenState: ScreenState = {
  timing: 0,
  refreshing: false,
  responseMessage: '',
  loadMoreMessage: '',
  page: 1,
}

export interface ScreenState {
  timing: number
  refreshing: boolean
  responseMessage: string
  loadMoreMessage: string
  page: number
  data?: any[] | object
}

export type ScreenActionTypes = 'RELOAD' | 'REFRESH' | 'LOAD_MORE'

export interface ScreenAction {
  type: ScreenActionTypes
  message?: string
  page?: number
  noLoadMore?: boolean
  data?: any[] | object
}

export function screenReducer(prevState: ScreenState, action: ScreenAction) {
  switch (action.type) {
    case 'RELOAD':
      return {
        ...prevState,
        refreshing: false,
        loadMoreMessage: '',
      }
    case 'REFRESH':
      return {
        ...prevState,
        timing: moment().unix(),
        refreshing: true,
        responseMessage: action?.message || '',
        page: 1,
        data: action?.data,
      }
    case 'LOAD_MORE':
      return {
        ...prevState,
        loadMoreMessage: '',
        page: action.page ? action.page : prevState.page + 1,
        data: action.data,
        refreshing: false,
      }
  }
}
