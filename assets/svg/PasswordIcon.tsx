import light from '@vn.starlingTech/theme/light'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function PasswordIcon(props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 15a1.875 1.875 0 100-3.75A1.875 1.875 0 0012 15zM12 15v2.25"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5 8.25h-15a.75.75 0 00-.75.75v10.5c0 .414.335.75.75.75h15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75zM8.624 8.25V4.875a3.375 3.375 0 116.75 0V8.25"
        stroke={props.color || light.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PasswordIcon
