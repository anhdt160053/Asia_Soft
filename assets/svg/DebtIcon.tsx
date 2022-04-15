import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const DebtIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 3.75V20.25"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.75 20.25H14.25"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.25 8.25L18.75 5.25"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.25 15.75C2.25 17.4069 4.125 18 5.25 18C6.375 18 8.25 17.4069 8.25 15.75L5.25 8.25L2.25 15.75Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.75 12.75C15.75 14.4069 17.625 15 18.75 15C19.875 15 21.75 14.4069 21.75 12.75L18.75 5.25L15.75 12.75Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default DebtIcon
