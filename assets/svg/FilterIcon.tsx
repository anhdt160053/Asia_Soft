import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M2.813 4.5h12.374M2.813 9h12.374M2.813 13.5h7.312M12.938 13.5h3.374M14.625 11.813v3.374"
        stroke="#343434"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
