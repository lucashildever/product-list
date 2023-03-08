import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage';
import AddProductsPage from './pages/AddProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductsPage/>
  },
  {
    path: '/add-product',
    element: <AddProductsPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
