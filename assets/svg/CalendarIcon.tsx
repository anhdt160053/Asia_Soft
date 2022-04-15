import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M14.625 2.813H3.375a.563.563 0 00-.563.562v11.25c0 .31.252.563.563.563h11.25c.31 0 .563-.252.563-.563V3.375a.562.562 0 00-.563-.563zM12.375 1.688v2.25M5.625 1.688v2.25M2.813 6.188h12.374"
        stroke="#343434"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
