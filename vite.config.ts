import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/global.scss";'
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE',//设置antd主题色
          '@component-background': 'rgba(21, 39, 53, 1)', // 下拉框
          '@text-color': '#fff', // 文字颜色
          '@input-bg': 'transparent', // 输入框背景色
          '@item-hover-bg': 'rgba(15, 60, 53, 0.5)', // select item hover
          '@table-border-color': 'rgba(15, 60, 53, 0.5)',
          '@table-bg': '#07375F',
          '@table-header-bg': '#0D5788',
          '@table-header-color': '#fff',
          '@table-header-cell-split-color': '#000',
          '@select-item-selected-bg': 'rgba(15, 60, 53, 0.5)', 
          '@label-color': '#00E3FF', 
          '@picker-basic-cell-disabled-bg': '#fff',
          '@border-color-split': 'none',
          '@border-color-base': '#10337E',
          '@text-color-secondary': '#fff', // modal 关闭x颜色
          '@background-color-light': 'rgba(15, 60, 53, 0.5)',
          '@table-selected-row-bg': 'rgba(15, 60, 53, 0.5)',
          '@transfer-item-selected-hover-bg': 'rgba(15, 60, 53, 0.5)',
        },
      },
    }
  }
})
