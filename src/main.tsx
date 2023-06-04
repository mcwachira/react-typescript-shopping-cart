import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProductProvider } from './context/productProvider.tsx'
import { CartProvider } from './context/cartProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
<CartProvider>
<App />
</CartProvider>

    </ProductProvider>

  </React.StrictMode>,
)
