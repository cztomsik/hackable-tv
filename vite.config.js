// @ts-check
const reactPlugin = require('@vitejs/plugin-react-refresh')

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],

  proxy: {
    '/api/radio': {
      target: 'https://de1.api.radio-browser.info/json',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\/radio/, '')
    },

    '/api/weather': {
      target: 'https://www.metaweather.com/api',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\/weather/, '')
    }
  }
}

module.exports = config
