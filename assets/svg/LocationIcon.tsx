import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M10 10.736a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.25 8.236c0 5.625-6.25 10-6.25 10s-6.25-4.375-6.25-10a6.25 6.25 0 0112.5 0v0z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
