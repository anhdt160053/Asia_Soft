import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppStyles from '@vn.starlingTech/components/AppStyles'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import React, { ReactNode, useEffect, useState } from 'react'
import Orientation, {
  useDeviceOrientationChange,
  OrientationType,
} from 'react-native-orientation-locker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
}
export default (props: Props) => {
  const { top } = useSafeAreaInsets()
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  })

  const handleOrientation = (o: OrientationType) => {
    if (
      o === OrientationType.PORTRAIT ||
      o === OrientationType['PORTRAIT-UPSIDEDOWN']
    ) {
      setMargin({ marginLeft: 0, marginRight: 0 })
    } else if (o === OrientationType['LANDSCAPE-LEFT']) {
      setMargin({ marginLeft: top, marginRight: 0 })
    } else if (o === OrientationType['LANDSCAPE-RIGHT']) {
      setMargin({ marginLeft: 0, marginRight: top })
    }
  }

  useEffect(() => {
    Orientation.getDeviceOrientation(handleOrientation)
    Orientation.unlockAllOrientations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDeviceOrientationChange(handleOrientation)

  return (
    <AppBlock
      style={[
        AppStyles.fill,
        { marginLeft: margin.marginLeft, marginRight: margin.marginRight },
      ]}
    >
      {props.children}
    </AppBlock>
  )
}
