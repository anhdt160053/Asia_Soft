import { BASE_URL } from '@vn.starlingTech/api/Server'
import { isEmpty } from 'lodash'

export const getImgPath = (imgUrl: string, hostUrl?: string) => {
  if (isEmpty(imgUrl)) {
    return ''
  }
  if (imgUrl.includes('http') || imgUrl.includes('https')) {
    return imgUrl
  }
  let newImgUrl = imgUrl
  if (imgUrl.charAt(0) === '/') {
    newImgUrl = imgUrl.substring(1)
  }
  return `${hostUrl || BASE_URL}/${newImgUrl}`
}

export const getImgSource = (imgUrl: string, hostUrl?: string) => {
  const imageUri = getImgPath(imgUrl, hostUrl)
  return (imageUri && { uri: imageUri }) || {}
}

export const getImgBase64 = (base64: string) => {
  return `data:image/jpeg;base64,${base64}`
}
