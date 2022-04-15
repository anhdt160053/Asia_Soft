import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const HomeIconTQT = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21.375 19.5H2.625"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.375 19.5V8.25H14.625"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.875 3.75H14.625V19.5H19.875V3.75Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.125 19.5V12.75H9.375"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default HomeIconTQT
