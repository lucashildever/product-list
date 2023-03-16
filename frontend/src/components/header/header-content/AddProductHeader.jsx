import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'

const AddProductHeader = () => {

    const {
        formData, 
        inputsMessages, 
        setInputsMessages, 
        setLoading, 
        productsData,
        fetchProducts
    } = useContext(GlobalState)

    useEffect(() => {
        if(!productsData) {
            fetchProducts()
        }
    }, [])

    let sku = formData['sku'].trim()
    let name = formData['name'].trim()
    let price = formData['name'].trim()
    let type = formData['type'].trim()
    let size = formData['size'].trim()
    let height = formData['height'].trim()
    let width = formData['width'].trim()
    let length = formData['length'].trim()
    let weight = formData['weight'].trim() 

    function noEmptyForm() {
        if(type === 'select' && (sku === '' || name === '' || price === '')) {
            setInputsMessages({...inputsMessages, formDiv: true})
        }
        
        if (type === 'dvd' && (sku === '' || name === '' || price === '' || size === '')) {
            setInputsMessages({...inputsMessages, formDiv: true})
        }
        
        if (type === 'furniture' && (sku === '' || name === '' || price === '' || height === '' || width === '' || length === '')) {
            setInputsMessages({...inputsMessages, formDiv: true})
        }
        
        if (type === 'book' && (sku === '' || name === '' || price === '' || weight === '')) {
            setInputsMessages({...inputsMessages, formDiv: true})
        }
    }

    function verifySku() {
        const exists = productsData.find(product => product.sku === sku);
        if (exists === undefined) {
            setInputsMessages({...inputsMessages, skuInput: true});
        }
        
        // if (sku === '') {
        //     return
        // } else {
        //     const exists = productsData.find(product => product.sku === sku);
        //     if (exists === undefined) {
        //         setInputsMessages({...inputsMessages, skuInput: true});
        //     }
        // }
    
        // productsData.forEach(item => {
        //     if(item.sku === sku) {
        //         console.log('aqui')
        //         setInputsMessages({...inputsMessages, skuInput: true})
        //     } else {
        //         setInputsMessages({...inputsMessages, skuInput: false})
        //     }
        // })
    }

    function handleSaveProduct() {
        

        //noEmptyForm()
        verifySku()

        // for(let item in inputsMessages) {
        //     if(!inputsMessages[item]) {
        //         console.log('negado')
        //     } else {
        //         setLoading(true)
        //         console.log('adicionado')
        //     }
        // }
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])
    useEffect(() => {
        console.log(sku)
    }, [sku])

    return (
        <div className='header-content'>
            <h1>Add Product</h1>
            <div className='header-buttons-add'>
                <button onClick={handleSaveProduct} className='save-btn'>Save</button>
                {/* <button onClick={handleSaveProduct} className='save-btn'>Save</button> */}
                <button className='cancel-btn'>Cancel</button>
            </div>
        </div>
    )
}

export default AddProductHeader