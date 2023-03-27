import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './header/Header'

const Layout = ({ checkedCards, setCheckedCards, canAddProduct, setCanAddProduct, formData, setFormData }) => {

    return (
        <>
            <Header 
                checkedCards={checkedCards}
                setCheckedCards={setCheckedCards}
                canAddProduct={canAddProduct}
                formData={formData}
                setFormData={setFormData}
                setCanAddProduct={setCanAddProduct}
            />
            <Outlet/>
        </>
    )
}

export default Layout