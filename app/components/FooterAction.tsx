import { AppProcessingButton } from '@vn.starlingTech/components/AppButton'
import AppFooter from '@vn.starlingTech/components/AppFooter'
import AppText from '@vn.starlingTech/components/AppText'
import AppConstants, { appSize } from '@vn.starlingTech/config/AppConstant'
import light from '@vn.starlingTech/theme/light'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  pressButton?: any
  text?: string
  processing?: boolean
  disabled?: boolean
}

export default function (props: Props) {
  // const { bottom } = useSafeAreaInsets();
  return (
    <AppFooter style={{ ...styles.footer }}>
      {props.processing !== undefined ? (
        <AppProcessingButton
          disabled={props.disabled}
          width={AppConstants.WIDTH - 2 * appSize(16)}
          height={appSize(44)}
          text={props.children}
          onPress={props.pressButton}
          processing={props.processing}
          primary
          style={styles.selectBox}
        />
      ) : (
        <TouchableOpacity
          disabled={props.disabled}
          style={styles.selectBox}
          onPress={props.pressButton}
        >
          <AppText style={styles.textBottom}>{props.text || 'Đồng ý'}</AppText>
        </TouchableOpacity>
      )}
    </AppFooter>
  )
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: appSize(10),
  },
  selectBox: {
    alignItems: 'center',
    backgroundColor: light.primary,
    borderRadius: appSize(10),
    height: appSize(44),
    justifyContent: 'center',
    width: AppConstants.WIDTH - 2 * appSize(16),
  },
  textBottom: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: appSize(16),
  },
})
