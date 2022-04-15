import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 16.875a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM18.375 10.875a5.617 5.617 0 014.5 2.25M1.125 13.125a5.617 5.617 0 014.5-2.25M6.603 20.25a6.003 6.003 0 0110.794 0M5.625 10.875a3 3 0 112.947-3.563M15.428 7.312a3 3 0 112.947 3.563"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
