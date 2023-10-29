import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_BASE_URL || '/bnanas-demo/'
  }
  return '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  base: `${getBaseURL()}`,
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
