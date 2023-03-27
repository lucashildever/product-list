import React from 'react'

import ProductForm from '../components/product-form/ProductForm'

const AddProductPage = ({ formData, setFormData, setCanAddProduct }) => {
    return (
        <ProductForm 
            formData={formData}
            setFormData={setFormData}
            setCanAddProduct={setCanAddProduct}
        />
    )
}

export default AddProductPage
