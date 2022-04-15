import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const DownIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 21 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.5604 6.75L10.4385 12.375L4.31665 6.75"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default DownIcon
