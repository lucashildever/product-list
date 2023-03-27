import { useContext, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'
import { useLocation } from 'react-router-dom'

import HomeHeader from './header-content/HomeHeader'
import AddProductHeader from './header-content/AddProductHeader'

const Header = ({ checkedCards, setCheckedCards, canAddProduct, setCanAddProduct, formData, setFormData }) => {

    const {headerContent, setHeaderContent} = useContext(GlobalState)
    const { pathname } = useLocation()

    useEffect(()=> {
        if(pathname === '/')
            setHeaderContent('home')
        else
            setHeaderContent('add')
    }, [pathname, setHeaderContent])

    return (
        <header className='header'>
            {
                headerContent === 'home' 
                ?
                <HomeHeader 
                    setCheckedCards={setCheckedCards}
                    checkedCards={checkedCards}
                /> 
                :
                <AddProductHeader 
                    canAddProduct={canAddProduct}
                    setCanAddProduct={setCanAddProduct}
                    formData={formData}
                    setFormData={setFormData}
                />
            }
        </header>
    )
}

export default Header
