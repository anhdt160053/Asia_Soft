import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
