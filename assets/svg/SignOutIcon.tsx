import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16.314 8.063L20.25 12l-3.936 3.938M9.75 12h10.497M9.75 20.25H4.5a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75h5.25"
        stroke={props.color || light.icon}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
