import React from 'react'

import AllProducts from '../components/product-list/AllProducts'

const ProductsPage = ({checkedCards, setCheckedCards}) => {

    return (
      <AllProducts
          checkedCards={checkedCards}
          setCheckedCards={setCheckedCards}
      />
    )
}

export default ProductsPage
