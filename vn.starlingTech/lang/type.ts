export interface LanguageType {
  screenIsLoading: string
  alert: string
  error: string
  errorTitle: string
  errorUntitled: string
  errorNetworkTitle: string
  errorNetwork: string
  errorInternet: string
  errorResponse: string
  tryAgain: string
  tryReload: string
  endDataMessage: string
  emptyData: string
  ok: string
  edit: string
  add: string
  update: string
  save: string
  cancel: string
  confirm: string
  continue: string
  signIn: string
  signUp: string
  signOut: string
  signOutMsg: string
  forgotPass: string
  required: string
  invalidPassword: string
  invalidRePassword: string
  invalidEmail: string
  viewAll: string
  viewMore: string
  viewLess: string
  comment: string
  email: string
  username: string
  password: string
  phone: string
  camera: string
  photoLibrary: string
  openSetting: string
  noPermission: {
    camera: string
    photoLibrary: string
    location: string
  }
  codePush: {
    title: string
    mandatoryUpdateMessage: string
    optionalUpdateMessage: string
    optionalIgnoreButtonLabel: string
    optionalInstallButtonLabel: string
    mandatoryContinueButtonLabel: string
    downloading: string
    installing: string
  }
  time: {
    hour: string
    minute: string
    second: string
  }
  date: {
    chooseDate: string
    pleaseChooseDate: string
  }
}
