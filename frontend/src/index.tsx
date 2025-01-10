import ReactDOM from 'react-dom/client'
import App from './App'
import './slick.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Failed to find the root element')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <App />
)
