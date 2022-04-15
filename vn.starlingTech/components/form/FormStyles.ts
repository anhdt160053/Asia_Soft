import light from '@vn.starlingTech/theme/light'
import { sizes } from '@vn.starlingTech/theme/theming'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  appInputEye: {
    paddingRight: 55,
  },
  colorRed: { color: 'red' },
  disabled: { backgroundColor: '#f0f0f0' },
  eye: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 50,
  },
  helperTxt: {
    color: light.danger,
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 16,
    marginHorizontal: 1,
    marginTop: 8,
  },
  inline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineLabel: { width: 122 },
  input: {
    flex: 1,
    fontSize: sizes.font,
    height: '100%',
    paddingLeft: 8,
  },
  inputDisabled: { backgroundColor: '#f5f6f7' },
  inputError: {
    borderColor: '#dc3545',
  },
  inputView: {
    alignItems: 'center',
    borderColor: light.inputBorder,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    maxWidth: 600,
    paddingBottom: 0,
    paddingHorizontal: 12,
    paddingTop: 0,
    width: '100%',
  },
  item: { width: '100%' },
  itemInputInLine: { flexDirection: 'row', width: 120 },
  labelContainer: { flexDirection: 'row', marginBottom: 9 },
  radius5: { borderRadius: 5, paddingHorizontal: 7 },
  textErr: {
    color: '#dc3545',
    marginTop: 5,
    textAlign: 'left',
  },
})
