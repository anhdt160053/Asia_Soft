const CHART_COLORS = [
  'rgba(35, 186, 32, 0.8)',
  '#ED637D',
  '#007BFF',
  '#F7CC68',
  '#D3192F',
  '#F29E4B',
  '#9b59b6',
  '#56C0C1',
  '#d35400',
  '#2ecc71',
  '#f1c40f',
  '#95a5a6',
  '#3498db',
  '#34495e',
  '#e67e22',
]

export function randomColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

export function randomChartColor(index: number) {
  return CHART_COLORS[index] ? CHART_COLORS[index] : randomColor()
}
