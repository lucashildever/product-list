import { createContext, useState } from 'react'

export const GlobalState = createContext()

export const StateProvider = ({ children }) => {

  const [productsData, setProductsData] = useState()
  const [loading, setLoading] = useState(false)
  const [formType, setFormType] = useState('select')
  // const [checkedCards, setCheckedCards] = useState([])
  const [headerContent, setHeaderContent] = useState('home')
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    type: 'select',
    typeInfo: '',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: ''
  })
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

  function fetchProducts() {
    fetch('http://localhost/scandiweb/products-page/backend/api/index.php/getproducts')
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          setProductsData(data)
      })
      .catch(function(e) {
          console.log(e);
      });
  }

  return (
    <GlobalState.Provider 
      value={{ 
        formType, 
        setFormType, 
        // checkedCards, 
        //setCheckedCards,
        headerContent,
        setHeaderContent,
        formData,
        setFormData,
        productsData,
        setProductsData,
        inputsMessages,
        setInputsMessages,
        fetchProducts,
        loading,
        setLoading
      }}
    >
      {children}
    </GlobalState.Provider>  
  )
}
