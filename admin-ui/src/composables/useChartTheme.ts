import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

// Palette aligned with the existing Naive UI dark theme
const COLORS = [
  '#818cf8', // indigo-400
  '#34d399', // emerald-400
  '#fbbf24', // amber-400
  '#60a5fa', // blue-400
  '#fb7185', // rose-400
  '#a78bfa', // violet-400
  '#2dd4bf', // teal-400
  '#f472b6', // pink-400
]

/** Reusable dark-theme base options for ECharts */
export function useChartTheme() {
  const baseOption: EChartsOption = {
    color: COLORS,
    backgroundColor: 'transparent',
    textStyle: { color: '#94a3b8' }, // slate-400
    legend: { textStyle: { color: '#94a3b8' } },
    tooltip: {
      backgroundColor: '#1e293b', // slate-800
      borderColor: '#334155', // slate-700
      textStyle: { color: '#e2e8f0' }, // slate-200
    },
    grid: { left: 50, right: 20, top: 40, bottom: 30, containLabel: false },
  }

  const axisCommon = {
    axisLine: { lineStyle: { color: '#334155' } },
    axisTick: { lineStyle: { color: '#334155' } },
    axisLabel: { color: '#94a3b8', fontSize: 11 },
    splitLine: { lineStyle: { color: '#1e2d3f', type: 'dashed' as const } },
  }

  return { baseOption, axisCommon, COLORS }
}
