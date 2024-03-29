import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.scss'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <MantineProvider
    theme={{
      fontFamily: 'Tahoma',
    }}
  >
    <App />
  </MantineProvider>
)
