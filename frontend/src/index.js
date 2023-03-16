import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { StateProvider } from './GlobalState'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import ProductsPage from './pages/ProductsPage'
import AddProductsPage from './pages/AddProductPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <h1>not found</h1>,
    children: [
      {
        path: '/',
        element: <ProductsPage/>
      },
      {
        path: '/add-product',
        element: <AddProductsPage/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router}/>
    </StateProvider>
  </React.StrictMode>
);
