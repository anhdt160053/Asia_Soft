import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 2.25v19.5M17.25 8.25A3.75 3.75 0 0013.5 4.5h-3.375a3.75 3.75 0 000 7.5h4.125a3.75 3.75 0 010 7.5h-4.5A3.75 3.75 0 016 15.75"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
