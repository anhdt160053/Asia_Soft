import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.25 17.25H6.545L3.93 2.866a.75.75 0 00-.738-.616H1.5M7.5 21a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75zM17.25 21a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.864 13.5h11.77a1.5 1.5 0 001.476-1.232L20.25 6H4.5"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
