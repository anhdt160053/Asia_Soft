import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 20a5 5 0 100-10 5 5 0 000 10zM7.975 24.922a9.004 9.004 0 0116.05 0"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
