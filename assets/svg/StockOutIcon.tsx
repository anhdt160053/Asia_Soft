import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const StockOutIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.25 17.25H6.54545L3.93015 2.86584C3.89873 2.69303 3.80766 2.53673 3.67281 2.42419C3.53796 2.31164 3.36789 2.25 3.19225 2.25H1.5"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 21C8.53553 21 9.375 20.1605 9.375 19.125C9.375 18.0895 8.53553 17.25 7.5 17.25C6.46447 17.25 5.625 18.0895 5.625 19.125C5.625 20.1605 6.46447 21 7.5 21Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.25 21C18.2855 21 19.125 20.1605 19.125 19.125C19.125 18.0895 18.2855 17.25 17.25 17.25C16.2145 17.25 15.375 18.0895 15.375 19.125C15.375 20.1605 16.2145 21 17.25 21Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.86363 13.5H17.6345C17.9858 13.5 18.3259 13.3767 18.5956 13.1516C18.8653 12.9265 19.0475 12.6139 19.1103 12.2683L20.25 6H4.5"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default StockOutIcon
