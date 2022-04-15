export type productProps = {
  name: string
  quantity: number
  unitprice: number
}

export const productList: productProps[] = [
  {
    name: 'Bao bì 3 lớp sóng màu vàng',
    quantity: 3,
    unitprice: 1800000,
  },
  //   {
  //     name: 'Bao bì 2 lớp sóng màu trắng',
  //     quantity: 2,
  //     unitprice: 1200000,
  //   },
  //   {
  //     name: 'Bao bì 3 lớp',
  //     quantity: 4,
  //     unitprice: 1000000,
  //   },
  //   {
  //     name: 'Bao bì',
  //     quantity: 3,
  //     unitprice: 1100000,
  //   },
  //   {
  //     name: 'lớp sóng màu vàng',
  //     quantity: 2,
  //     unitprice: 1400000,
  //   },
  {
    name: 'lớp sóng trắng',
    quantity: 1,
    unitprice: 2000000,
  },
]
