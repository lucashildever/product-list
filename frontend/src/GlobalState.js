import { createContext, useState } from 'react'

export const GlobalState = createContext()

export const StateProvider = ({ children }) => {

  const [productsData, setProductsData] = useState()
  const [loading, setLoading] = useState(false)
  const [headerContent, setHeaderContent] = useState('home')
  const [inputsMessages, setInputsMessages] = useState({
    formDiv: false,
    skuInput: false,
    nameInput: false,
    priceInput: false,
    switcherInput: false,
    sizeInput: false,
    furnitureInput: false,
    weightInput: false
  })

  // coudn't configure webhost to accept other request methods than GET that's why it's not RESTful
  function fetchProducts() {
    const url = 'https://products-list-scandiweb.000webhostapp.com/backend/index1.php/getproducts'

    fetch(url, {
      method: 'GET',
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        setProductsData(data)
      })
      .catch(error => console.error(error))
  }

  function deleteProducts(ids) {
    const url = `https://products-list-scandiweb.000webhostapp.com/backend/index1.php/deleteproducts?ids=${ids}`

    fetch(url,{
      method: 'GET'
    })
      .then(response => {
        fetchProducts()
      })
      .catch(error => console.error(error))
  }

  function addProduct(data) {
    const url = `https://products-list-scandiweb.000webhostapp.com/backend/index1.php/addproduct?sku=${data.sku}&name=${data.name}&price=${data.price}&type=${data.type}&type_info=${data.type_info}`

    fetch(url, {
      method: 'GET'
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error));
  }
  
  return (
    <GlobalState.Provider 
      value={{
        headerContent,
        setHeaderContent,
        productsData,
        setProductsData,
        inputsMessages,
        setInputsMessages,
        loading,
        setLoading,
        fetchProducts,
        deleteProducts,
        addProduct
      }}
    >
      {children}
    </GlobalState.Provider>  
  )
}
