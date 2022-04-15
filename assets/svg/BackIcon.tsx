import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15 19.5L7.5 12 15 4.5"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
