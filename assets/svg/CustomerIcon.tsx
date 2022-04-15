import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CustomerIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.25 10.5H18"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.25 13.5H18"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.63428 13.5C9.87692 13.5 10.8843 12.4926 10.8843 11.25C10.8843 10.0074 9.87692 9 8.63428 9C7.39164 9 6.38428 10.0074 6.38428 11.25C6.38428 12.4926 7.39164 13.5 8.63428 13.5Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.729 15.75C5.89546 15.106 6.27115 14.5355 6.79704 14.1283C7.32294 13.721 7.96923 13.5 8.63438 13.5C9.29952 13.5 9.94583 13.7209 10.4718 14.1282C10.9977 14.5354 11.3734 15.1058 11.5399 15.7498"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CustomerIcon
