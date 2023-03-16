import { useEffect, useContext} from 'react'
import { GlobalState } from '../../GlobalState'

import ProductCard from './ProductCard'

const AllProducts = () => {

    const {productsData, fetchProducts} = useContext(GlobalState)

    useEffect(() => {
        if(!productsData)
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
                                info={item.type_info}
                                id={item.id}
                                key={index}
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