<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#818cf8',
    primaryColorHover: '#a5b4fc',
    primaryColorPressed: '#6366f1',
    primaryColorSuppl: '#818cf8',
    successColor: '#34d399',
    successColorHover: '#6ee7b7',
    successColorPressed: '#10b981',
    warningColor: '#fbbf24',
    warningColorHover: '#fcd34d',
    warningColorPressed: '#f59e0b',
    errorColor: '#f87171',
    errorColorHover: '#fca5a5',
    errorColorPressed: '#ef4444',
    infoColor: '#60a5fa',
    borderRadius: '8px',
    borderRadiusSmall: '6px',
    fontSizeMedium: '13px',
    fontSizeSmall: '12px',
  },
  DataTable: {
    thColor: '#162032',
    thTextColor: '#94a3b8',
    thFontWeight: '500',
    tdColorStriped: '#111c2d',
    borderColor: '#1e2d3f',
    tdTextColor: '#cbd5e1',
    thPaddingSmall: '8px 12px',
    tdPaddingSmall: '8px 12px',
  },
  Card: {
    borderRadius: '10px',
    color: '#1a2638',
    borderColor: '#1e2d3f',
    titleTextColor: '#e2e8f0',
    titleFontSizeMedium: '13px',
  },
  Modal: {
    color: '#1a2638',
    borderRadius: '12px',
    titleTextColor: '#e2e8f0',
    titleFontSizeLarge: '15px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
  },
  Menu: {
    itemColorActive: 'rgba(129,140,248,0.1)',
    itemColorActiveHover: 'rgba(129,140,248,0.15)',
    itemTextColorActive: '#818cf8',
    itemIconColorActive: '#818cf8',
    itemTextColorActiveHover: '#a5b4fc',
    itemIconColorActiveHover: '#a5b4fc',
    itemColorHover: 'rgba(255,255,255,0.05)',
    itemTextColorHover: '#e2e8f0',
    itemIconColorHover: '#e2e8f0',
    itemTextColor: '#94a3b8',
    itemIconColor: '#94a3b8',
    color: 'transparent',
    borderRadius: '8px',
    itemBorderRadius: '8px',
  },
  Button: {
    borderRadiusMedium: '7px',
    borderRadiusSmall: '6px',
    borderRadiusTiny: '5px',
    fontSizeMedium: '13px',
    fontSizeSmall: '12px',
    fontSizeTiny: '11px',
  },
  Input: {
    borderRadius: '7px',
    fontSizeMedium: '13px',
    fontSizeSmall: '12px',
    color: '#111c2d',
    colorFocus: '#111c2d',
    border: '1px solid #1e2d3f',
    borderFocus: '1px solid #818cf8',
    borderHover: '1px solid #334155',
  },
  Select: {
    menuBorderRadius: '8px',
  },
  Tag: {
    borderRadius: '5px',
    fontSizeMedium: '11px',
    fontSizeSmall: '11px',
  },
  Statistic: {
    labelFontSize: '12px',
    labelTextColor: '#94a3b8',
    valueFontSize: '22px',
  },
}
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides">
    <NDialogProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <RouterView />
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
