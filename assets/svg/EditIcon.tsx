import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={12} fill="#E4E4E4" />
      <Path
        d="M10 17.5H7a.5.5 0 01-.5-.5v-2.793a.5.5 0 01.146-.354l7.5-7.5a.5.5 0 01.708 0l2.792 2.793a.5.5 0 010 .707L10 17.5zM12.5 8l3.5 3.5"
        stroke="#666"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
