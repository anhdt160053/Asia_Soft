import { numberFormat } from '@vn.starlingTech/helpers/numberHelper'

import { productProps } from '../data/dataStockOut'

export const amount = (itemsList: productProps[]) => {
  let sum = 0
  itemsList.forEach(({ quantity, unitprice }) => {
    sum += quantity * unitprice
  })
  return sum
}

export const amountFunc = (itemsList: productProps[]) => {
  return numberFormat(amount(itemsList))
}
