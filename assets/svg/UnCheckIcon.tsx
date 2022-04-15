import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function (props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21.244 11.578a.757.757 0 00.756-.756v-2.57C22 4.393 19.59 2 15.753 2h-7.5C4.393 2 2 4.392 2 8.256v7.5C2 19.608 4.392 22 8.253 22h7.503c3.852 0 6.244-2.392 6.241-6.247a.765.765 0 10-1.53 0c0 3.034-1.67 4.714-4.714 4.714h-7.5c-3.043 0-4.723-1.68-4.723-4.714v-7.5c0-3.043 1.68-4.723 4.726-4.723h7.5c3.044 0 4.714 1.67 4.714 4.723V10.797a.765.765 0 00.765.763v.018h.01z"
        fill={props.color || '#fff'}
      />
    </Svg>
  )
}
