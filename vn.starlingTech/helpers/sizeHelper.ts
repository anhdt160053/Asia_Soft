export function getSvgSize(
  width: number,
  height: number,
  newWidth?: string | number,
) {
  return {
    width: newWidth !== undefined ? Number(newWidth) : width,
    height:
      newWidth !== undefined ? (Number(newWidth) * height) / width : height,
  }
}
