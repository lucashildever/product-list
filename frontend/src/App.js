import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import ProductsPage from './pages/ProductsPage'
import AddProductsPage from './pages/AddProductPage'

function App() {

  const [checkedCards, setCheckedCards] = useState([])
  const [canAddProduct, setCanAddProduct] = useState(false) 
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    type: 'select',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: ''
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout
                  checkedCards={checkedCards}
                  setCheckedCards={setCheckedCards}
                  formData={formData}
                  setFormData={setFormData}
                  canAddProduct={canAddProduct}
                  setCanAddProduct={setCanAddProduct}
                />,
      errorElement: <h1>not found</h1>,
      children: [
        {
          path: '/',
          element: <ProductsPage
                      checkedCards={checkedCards}
                      setCheckedCards={setCheckedCards}
                    />
        },
        {
          path: '/add-product',
          element: <AddProductsPage
                      formData={formData}
                      setFormData={setFormData}
                      setCanAddProduct={setCanAddProduct}
                    />
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
