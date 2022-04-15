import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M22.5 11.25h-6V7.5h3.992a.75.75 0 01.697.471L22.5 11.25zM1.5 13.5h15M17.625 20.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM6.375 20.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM15.375 18h-6.75"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.125 18H2.25a.75.75 0 01-.75-.75V6.75A.75.75 0 012.25 6H16.5v10.051M16.5 16.051V11.25h6v6a.75.75 0 01-.75.75h-1.875"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
