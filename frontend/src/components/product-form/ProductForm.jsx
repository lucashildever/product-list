import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalState } from '../../GlobalState'

const ProductForm = ({ formData, setFormData, setCanAddProduct }) => {

    const [formType, setFormType] = useState('select')
    const {
        inputsMessages,
        setInputsMessages,
        productsData,
        fetchProducts,
        loading
    } = useContext(GlobalState)
    
    const skuInput = useRef(null)
    const nameInput = useRef(null)
    const priceInput = useRef(null)
    const typeInput = useRef(null)
    const sizeInput = useRef(null)
    const weightInput = useRef(null)
    const heightInput = useRef(null)
    const widthInput = useRef(null)
    const lengthInput = useRef(null)

    useEffect(() => {
        if(!productsData) {
            fetchProducts()
        }
    // eslint-disable-next-line
    }, [])

    // set form fieldset based on type selected
    function handleSelectChange() {
        setFormType(typeInput.current.value);
    }

    function defineTypeInfoClass(option) {
        switch(option) {
            case 'select':
                return formType === 'select' ? 'active' : ''
            case 'dvd':
                return formType === 'dvd' ? 'active' : ''
            case 'furniture':
                return formType === 'furniture' ? 'active' : ''
            case 'book':
                return formType === 'book' ? 'active' : ''
            default:
                return
        }
    }

    function checkInputsMessages() {
        let canAdd = false
        for(let key in inputsMessages) {
            if(key !== 'formDiv' && !inputsMessages[key]) {
                canAdd = true
            } else {
                canAdd = false
            }
        }
        setCanAddProduct(canAdd)
    }

    function checkIfCanAddProduct() {
        if(formData.type === 'dvd') {
            if(formData.sku !== '' && formData.name !== '' && formData.price !== '' && formData.size !== '')
                checkInputsMessages()
        }
        if(formData.type === 'furniture') {
            if(formData.sku !== '' && formData.name !== '' && formData.price !== '' && formData.height !== '' && formData.width !== '' && formData.length !== '')
                checkInputsMessages()
        }
        if(formData.type === 'book') {
            if(formData.sku !== '' && formData.name !== '' && formData.price !== '' && formData.weight !== '')
                checkInputsMessages()
        }
    }

    function validateInputs() {
        const alphanumeric = /^[a-zA-Z0-9\s]*$/
        const intOrFloat = /^\d+(?:\.\d+)?$/
        const intOnly = /^[0-9]+$/

        if(productsData) {
            setInputsMessages({
                ...inputsMessages,
                // verify if sku already exists
                skuInput: productsData.some(item => item.sku === formData.sku) && formData.sku !== '',
                // verify if inputs are in valid format
                nameInput: !alphanumeric.test(nameInput.current.value) && formData.name !== '',
                priceInput: !intOrFloat.test(priceInput.current.value) && formData.price !== '',
                sizeInput: !intOnly.test(sizeInput.current.value) && formData.size !== '',
                weightInput: !intOrFloat.test(weightInput.current.value) && formData.weight !== '',
                furnitureInput: [
                    intOrFloat.test(heightInput.current.value) && formData.height !== '',
                    intOrFloat.test(widthInput.current.value) && formData.width !== '',
                    intOrFloat.test(lengthInput.current.value) && formData.length !== ''
                ].includes(false)
            })   
        }
    }

    useEffect(() => {
        validateInputs()
        checkIfCanAddProduct()
    // eslint-disable-next-line
    }, [formData])

    function handleFormChange(option) {
        switch(option){
            case 'sku':
                setFormData({...formData, sku: skuInput.current.value})
                break
            case 'name':
                setFormData({...formData, name: nameInput.current.value})
                break
            case 'price':                
                setFormData({...formData, price: priceInput.current.value})
                break
            case 'type':
                setFormData({...formData, type: typeInput.current.value})
                break
            case 'size':
                setFormData({...formData, size: sizeInput.current.value})
                break
            case 'height':
                setFormData({...formData, height: heightInput.current.value})
                break
            case 'width':
                setFormData({...formData, width: widthInput.current.value})
                break
            case 'length':
                setFormData({...formData, length: lengthInput.current.value})
                break
            case 'weight':
                setFormData({...formData, weight: weightInput.current.value})
                break
            default:
                return
        }
    }

    return (
        <div className='form-div'>
            <span 
                className={`form-div-message ${inputsMessages['formDiv'] ? 'form-div-message-active' : '' } `}
            >
                please submit required data.
            </span>
            <div className={`loading-icon ${loading ? 'loading-form-active' : ''}`}>
                <div className="lds-dual-ring"></div>
            </div>
            <form id='product_form'>
                <div>
                    <label htmlFor='sku'>SKU</label>
                    <input 
                        id='sku'
                        type='text'
                        name='sku'
                        ref={skuInput}
                        autoComplete='off'
                        onInput={() => handleFormChange('sku')}
                    />
                </div>
                <span className={`sku-input-message ${inputsMessages['skuInput'] ? 'sku-input-message-active' : ''}`}>this sku is already in use, please provide a different one.</span>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        id='name' 
                        type='text' 
                        name='name'
                        ref={nameInput}
                        autoComplete='off'
                        onInput={() => {handleFormChange('name')}} 
                    />
                </div>
                <span className={`name-input-message ${inputsMessages['nameInput'] ? 'name-input-message-active' : ''}`}>the name should receive alphanumeric values only.</span>
                <div>
                    <label htmlFor='price'>Price ($)</label>
                    <input 
                        id='price' 
                        type='text' 
                        name='price'
                        ref={priceInput}
                        autoComplete='off'
                        onInput={() => handleFormChange('price')} 
                    />
                </div>
                <span className={`price-input-message ${inputsMessages['priceInput'] ? 'price-input-message-active' : ''}`}>price field must receive a positive value in the formats `1` or `1.0`.</span>
                <div>
                    <label htmlFor='productType'>Type switcher</label>
                    <select 
                        ref={typeInput} 
                        onInput={() => {
                            handleFormChange('type')
                            handleSelectChange()
                        }}
                        id='productType'
                        name='type'
                        value={formType}
                    >
                        <option value='select'>select</option>
                        <option id='DVD' value='dvd'>DVD</option>
                        <option id='Furniture' value='furniture'>Furniture</option>
                        <option id='Book' value='book'>Book</option>
                    </select>
                </div>
                <span className={`switcher-input-message ${inputsMessages['switcherInput'] ? 'switcher-input-message-active' : ''}`}>you must select a product type.</span>
                <div className={`select-product-type ${defineTypeInfoClass('select')}`}>
                    <span>*select a product type*</span>
                </div>
                <fieldset className={defineTypeInfoClass('dvd')}>
                    <div>
                        <label htmlFor='size'>Size (MB)</label>
                        <input 
                            id='size'
                            type='text'
                            name='size'
                            ref={sizeInput}
                            autoComplete='off'
                            onInput={() => handleFormChange('size')} 
                        />
                    </div>
                    <span 
                        className={`size-input-message ${inputsMessages['sizeInput'] ? 'size-input-message-active' : '' }`}
                    >
                        size field must receive numeric info.
                    </span>
                    <span>Please provide the storage capacity in megabytes.</span>
                </fieldset>
                <fieldset className={defineTypeInfoClass('furniture')}>
                    <div>
                        <label htmlFor='height'>Height (CM)</label>
                        <input 
                            id='height'
                            type='text' 
                            name='height'
                            ref={heightInput}
                            autoComplete='off'
                            onInput={() => {
                                handleFormChange('height')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='width'>Width (CM)</label>
                        <input 
                            id='width' 
                            type='text' 
                            name='width'
                            ref={widthInput}
                            autoComplete='off'
                            onInput={() => {
                                handleFormChange('width')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='length'>Length (CM)</label>
                        <input
                            id='length' 
                            type='text' 
                            name='length'
                            ref={lengthInput}
                            autoComplete='off'
                            onInput={() => {
                                handleFormChange('length')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <span 
                        className={`furniture-input-message ${inputsMessages['furnitureInput'] ? 'furniture-input-message-active' : ''}`}
                    >
                        dimension fields must receive a positive value in the formats `1` or `1.0`.
                    </span>
                    <span>Please provide the dimensions in Height X Width X Length format.</span>
                </fieldset>
                <fieldset className={defineTypeInfoClass('book')}>
                    <div>
                        <label htmlFor='weight'>Weight (KG)</label>
                        <input 
                            id='weight'
                            type='text'
                            name='weight'
                            ref={weightInput}
                            autoComplete='off'
                            onInput={() => {
                                handleFormChange()
                                handleFormChange('weight')
                            }}
                        />
                    </div>
                    <span className={`weight-input-message ${inputsMessages['weightInput'] ? 'weight-input-message-active' : ''}`}>dimension fields must receive a positive value in the formats `1` or `1.0`.</span>
                    <span>Please provide the weight in kilogram.</span>
                </fieldset>
            </form>
        </div>
    )
}

export default ProductForm
