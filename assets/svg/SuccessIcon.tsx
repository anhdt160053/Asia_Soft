import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" {...props}>
      <Path
        d="M33.594 20.313L22.135 31.25l-5.729-5.469"
        stroke="#008816"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25 43.75c10.355 0 18.75-8.395 18.75-18.75S35.355 6.25 25 6.25 6.25 14.645 6.25 25 14.645 43.75 25 43.75z"
        stroke="#008816"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
