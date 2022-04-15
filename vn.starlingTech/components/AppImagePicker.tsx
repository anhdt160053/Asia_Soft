import {
  hasCameraPermission,
  hasPhotoPermission,
} from '@vn.starlingTech/helpers/cameraHelper'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { getString } from '@vn.starlingTech/lang/language'
import React, { useState } from 'react'
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker'

import ActionSheet, { ActionSheetItemType } from './ActionSheet'

interface Props {
  visible: boolean
  onClosed: () => void
  onImagePicked: (p: ImageOrVideo) => void
}

export default function (props: Props) {
  // const [visible, setVisible] = useState(props.visible);

  const [actionIndex, setActionIndex] = useState<number>()
  // useEffect(() => {
  //   setVisible(props.visible);
  // }, [props.visible]);

  const onActionSheet = async () => {
    const options: Options = {
      width: 512,
      height: 512,
      cropping: true,
      forceJpg: true,
    }
    switch (actionIndex) {
      case 1:
        if (await hasCameraPermission()) {
          ImagePicker.openCamera(options).then((image) => {
            props.onImagePicked(image)
            setActionIndex(undefined)
          })
        }
        break
      case 2:
        if (await hasPhotoPermission()) {
          consoleLog('onImagePicker')
          setTimeout(
            () =>
              ImagePicker.openPicker(options).then((image) => {
                props.onImagePicked(image)
                setActionIndex(undefined)
              }),
            300,
          )
        }
        break
    }
  }

  const [actionItems] = useState<ActionSheetItemType[]>([
    {
      id: 1,
      label: getString().camera,
      onPress: () => {
        props.onClosed()
        setActionIndex(1)
        // onActionSheet(2);
      },
    },
    {
      id: 2,
      label: getString().photoLibrary,
      onPress: () => {
        props.onClosed()
        setActionIndex(2)
        // onActionSheet(2);
      },
    },
    {
      id: '#cancel',
      label: getString().cancel,
      onPress: closeActionSheet,
    },
  ])

  const closeActionSheet = () => {
    // setVisible(false);
    props.onClosed()
  }

  return (
    <ActionSheet
      visible={props.visible}
      actionItems={actionItems}
      onModalHide={onActionSheet}
      onCancel={closeActionSheet}
    />
  )
}
