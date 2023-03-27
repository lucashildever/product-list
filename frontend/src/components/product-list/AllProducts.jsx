import { useEffect, useContext } from 'react'
import { GlobalState } from '../../GlobalState'

import ProductCard from './ProductCard'

const AllProducts = ({ checkedCards, setCheckedCards }) => {

    const {productsData, fetchProducts} = useContext(GlobalState)

    useEffect(() => {
        fetchProducts()
    // eslint-disable-next-line
    }, [])
    
    return (
        <div className='all-products'>
            {
                productsData ?
                    productsData.map((item, index) => {
                        return(
                            <ProductCard 
                                sku={item.sku}
                                name={item.name}
                                price={item.price}
                                type={item.type}
                                type_info={item.type_info}
                                id={item.id}
                                key={index}
                                checkedCards={checkedCards}
                                setCheckedCards={setCheckedCards}
                            />
                        )
                    })
                :
                <h1>loading products...</h1>
            }
        </div>
    ) 
    
}

export default AllProducts