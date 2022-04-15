import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.5 13.086V19.5a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-6.413M5.066 3.75h13.868a.75.75 0 01.721.544L21 9H3l1.345-4.706a.75.75 0 01.72-.544z"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9v1.5a3 3 0 01-6 0V9M15 9v1.5a3 3 0 01-6 0V9M21 9v1.5a3 3 0 01-6 0V9"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
