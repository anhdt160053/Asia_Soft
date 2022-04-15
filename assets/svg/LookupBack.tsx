import { getSvgSize } from '@vn.starlingTech/helpers/sizeHelper'
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props} {...getSvgSize(24, 24, props.width)}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.284 12.824A.827.827 0 0 0 21 12a.825.825 0 0 0-.818-.83H5.799l5.196-5.251.074-.085a.84.84 0 0 0-.072-1.09.81.81 0 0 0-1.156-.002l-6.6 6.67-.073.084a.836.836 0 0 0-.106.82.817.817 0 0 0 .756.514h16.364l.102-.006Zm-9.286 6.432a.84.84 0 0 0-.003-1.175l-3.64-3.679-.084-.074a.807.807 0 0 0-1.072.077.835.835 0 0 0 .002 1.174l3.64 3.68.083.073a.81.81 0 0 0 1.074-.076Z"
      fill="#767676"
    />
  </Svg>
)

export default SvgComponent
