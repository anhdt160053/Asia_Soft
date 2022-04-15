import { StackScreenProps } from '@react-navigation/stack'
import AppBlock from '@vn.starlingTech/components/AppBlock'
import AppText from '@vn.starlingTech/components/AppText'
import { appSize } from '@vn.starlingTech/config/AppConstant'
import settings from '@vn.starlingTech/config/settings'
import { useAppContext } from '@vn.starlingTech/context/AppContext'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { numberFormat } from '@vn.starlingTech/helpers/numberHelper'
import light from '@vn.starlingTech/theme/light'
import Container from 'app/components/Container'
import { StackParams } from 'app/navigation/params'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'

import { getDetailStockOutInvoice, reportKeys } from '../api/api'
import { detailInvoice } from '../api/type'

export default function ({
  route,
}: StackScreenProps<StackParams, 'StockOutInvoiceDetail'>) {
  const { user } = useAppContext()

  const [refreshing, setRefreshing] = useState(false)

  if (!user) {
    return null
  }

  const { refetch, data, isFetched } = useQuery(
    [reportKeys.detailStockOutInvoice()],
    () =>
      getDetailStockOutInvoice({
        ma_cty: user.ma_cty,
        user,
        stt_rec: route.params.item.stt_rec,
      }),
    {
      retry: settings.QUERY_RETRY,
      keepPreviousData: true,
    },
  )

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  const renderHeader = () => {
    return (
      <AppBlock>
        <AppBlock row margin={[0, 0, 15]}>
          <AppText style={styles.header}>Ngày hóa đơn:</AppText>
          <AppBlock flex>
            <AppText style={styles.headerR}>
              {data ? data.ngay_ct : null}
              {/* {data
                ? data.ngay_ct
                  ? moment(data.ngay_ct).format('YYYY-MM-DD')
                  : null
                : null} */}
            </AppText>
          </AppBlock>
        </AppBlock>

        <AppBlock row margin={[0, 0, 15]}>
          <AppText style={styles.header}>Số hóa đơn:</AppText>
          <AppBlock flex>
            <AppText style={styles.headerR}>{data ? data.so_ct : null}</AppText>
          </AppBlock>
        </AppBlock>

        <AppBlock row margin={[0, 0, 15]}>
          <AppText style={styles.header}>Tên KH:</AppText>
          <AppBlock flex>
            <AppText style={styles.headerR}>
              {data ? data.ten_kh : null}
            </AppText>
          </AppBlock>
        </AppBlock>

        <AppBlock row margin={[0, 0, 15]}>
          <AppText style={styles.header}>Tên NVKD:</AppText>
          <AppBlock flex>
            <AppText style={styles.headerR}>
              {data ? data.ten_nvkd : null}
            </AppText>
          </AppBlock>
        </AppBlock>

        <AppBlock row margin={[0, 0, 15]}>
          <AppText style={styles.header}>Diễn giải:</AppText>
          <AppBlock flex>
            <AppText style={styles.headerR}>
              {data ? data.dien_giai : null}
            </AppText>
          </AppBlock>
        </AppBlock>

        <AppBlock style={styles.bottomLineHeader} margin={[0, 0, 15]} />
      </AppBlock>
    )
  }

  const renderFooter = () => {
    return (
      <AppBlock>
        <AppBlock row center space="between" style={styles.mB}>
          <AppText style={styles.footer}>Tổng tiền:</AppText>
          <AppText style={styles.footer}>
            {data ? data.tong_tien_hang : null}
          </AppText>
        </AppBlock>

        <AppBlock row center space="between" style={styles.mB}>
          <AppText style={styles.footer}>Giảm giá:</AppText>
          <AppText style={styles.footer}>{data ? data.tien_ck : null}</AppText>
        </AppBlock>

        <AppBlock row center space="between" style={styles.mB}>
          <AppText style={styles.footer}>VAT:</AppText>
          <AppText style={styles.footer}>
            {data ? data.tien_thue : null}
          </AppText>
        </AppBlock>

        <AppBlock row center space="between" style={styles.mB}>
          <AppText style={styles.footerSum}>Tổng thanh toán:</AppText>
          <AppText style={styles.footerAmount}>
            {data ? data.tien_thanh_toan : null}
          </AppText>
        </AppBlock>
      </AppBlock>
    )
  }

  const renderItem = ({ item }: { item: detailInvoice }) => {
    return (
      <AppBlock>
        <AppText style={styles.title}>{item.ten_vt}</AppText>

        <AppBlock row center space="between" margin={[7, 0, 0]}>
          <AppText style={styles.productDetail}>Mã kho:</AppText>
          <AppText style={styles.productDetail}>{item.ma_kho}</AppText>
        </AppBlock>

        <AppBlock row center space="between" margin={[7, 0, 0]}>
          <AppText style={styles.productDetail}>Số lượng:</AppText>
          <AppText style={styles.productDetail}>{item.so_luong}</AppText>
        </AppBlock>

        <AppBlock row center space="between" margin={[7, 0, 0]}>
          <AppText style={styles.productDetail}>Đơn giá:</AppText>
          <AppText style={styles.productDetail}>{item.gia2}</AppText>
        </AppBlock>

        <AppBlock row center space="between" margin={[7, 0, 0]}>
          <AppText style={styles.productDetail}>Thành tiền:</AppText>
          <AppText style={styles.productSum}>{item.tien2}</AppText>
        </AppBlock>

        <AppBlock style={styles.bottomLine} margin={[18, 0, 18]} />
      </AppBlock>
    )
  }

  return (
    <Container>
      <AppBlock padding={[16, 29, 16]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={refreshing && !isFetched}
          onRefresh={onRefresh}
          ListHeaderComponent={renderHeader}
          data={data ? data.chi_tiet : []}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </AppBlock>
    </Container>
  )
}

const styles = StyleSheet.create({
  bottomLine: {
    backgroundColor: light.border,
    height: 1,
    opacity: 0.5,
  },
  bottomLineHeader: {
    backgroundColor: light.border,
    height: 2.5,
    opacity: 0.5,
  },
  footer: {
    color: light.text,
    fontFamily: 'Roboto-Light',
    fontSize: appSize(14),
  },
  footerAmount: {
    color: light.primary,
    fontSize: appSize(14),
    // fontWeight: 'bold',
  },
  footerSum: {
    color: light.text,
    fontSize: appSize(14),
    // fontWeight: 'bold',
  },
  header: {
    color: light.text,
    fontFamily: 'Roboto-Light',
    fontSize: appSize(14),
    width: 120,
  },
  headerR: {
    color: light.text,
    fontFamily: 'Roboto-Light',
    fontSize: appSize(14),
  },
  mB: {
    marginBottom: 20,
  },
  productDetail: {
    color: light.text,
    fontFamily: 'Roboto-Light',
    fontSize: appSize(10),
  },
  productSum: {
    color: light.text,
    fontSize: appSize(10),
    // fontWeight: 'bold',
  },
  title: {
    color: light.text,
    fontFamily: 'Roboto-Light',
    fontSize: appSize(11),
  },
})
