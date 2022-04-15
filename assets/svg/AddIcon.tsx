import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
        fill="#fff"
      />
    </Svg>
  )
}
