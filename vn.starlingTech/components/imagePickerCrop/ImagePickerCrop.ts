import ImagePicker from 'react-native-image-crop-picker'

export type ImagePickerCropOptions = {
  mediaType: 'photo'
  width: number
  height: number
  cropping: boolean
  multiple: boolean
  smartAlbums: ['UserLibrary', 'SelfPortraits', 'Videos']
}
export type VideoPickerCropOptions = {
  mediaType: 'video'
  multiple: boolean
}

export function UsePhotoLibrary(
  options: ImagePickerCropOptions | VideoPickerCropOptions,
  callback: (imageUri: string) => void,
) {
  ImagePicker.openPicker(options).then((params) => {
    const { sourceURL } = params
    if (sourceURL) {
      // consoleLog(params);
      callback(sourceURL)
    }
  })
}

export function UseCamera(
  options: ImagePickerCropOptions,
  callback: (imageUri: string) => void,
) {
  ImagePicker.openCamera(options).then((params) => {
    const { sourceURL } = params
    if (sourceURL) {
      // consoleLog(params);
      callback(sourceURL)
    }
    // consoleLog(image);
  })
}
