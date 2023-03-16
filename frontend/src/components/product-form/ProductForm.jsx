import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalState } from '../../GlobalState'

const ProductForm = () => {

    const {
        formType, 
        setFormType,
        formData, 
        setFormData, 
        inputsMessages, 
        setInputsMessages,
        loading,
        setLoading
    } = useContext(GlobalState)
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

    const skuInput = useRef(null)
    const nameInput = useRef(null)
    const priceInput = useRef(null)
    const typeInput = useRef(null)
    const sizeInput = useRef(null)
    const weightInput = useRef(null)
    const heightInput = useRef(null)
    const widthInput = useRef(null)
    const lengthInput = useRef(null)

    function handleFormChange(option = '') {
        const alphanumeric = /^[a-zA-Z0-9\s]*$/
        const intOrFloat = /^\d+(?:\.\d+)?$/
        const intOnly = /^[0-9]+$/

        switch(option){
            case 'sku':
                setFormData({...formData, sku: skuInput.current.value})
                break
            case 'name':
                if(!alphanumeric.test(nameInput.current.value)) {
                    setInputsMessages({...inputsMessages, nameInput: true})
                } else {
                    setInputsMessages({...inputsMessages, nameInput: false})
                    setFormData({...formData, name: nameInput.current.value})
                }
                break
            case 'price':
                if(!intOrFloat.test(priceInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, priceInput: true})
                } else {
                    setInputsMessages({...inputsMessages, priceInput: false})
                    setFormData({...formData, price: priceInput.current.value})
                }
                break
            case 'type':
                setFormData({...formData, type: typeInput.current.value})
                break
            case 'size':
                if(!intOnly.test(sizeInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, sizeInput: true})
                } else {
                    setInputsMessages({...inputsMessages, sizeInput: false})
                    setFormData({...formData, size: sizeInput.current.value})
                }
                break
            case 'height':
                if(!intOrFloat.test(heightInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, furnitureInput: true})
                } else {
                    setInputsMessages({...inputsMessages, furnitureInput: false})
                    setFormData({...formData, height: heightInput.current.value})
                }
                break
            case 'width':
                if(!intOrFloat.test(widthInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, furnitureInput: true})
                } else {
                    setInputsMessages({...inputsMessages, furnitureInput: false})
                    setFormData({...formData, width: widthInput.current.value})
                }
                break
            case 'length':
                if(!intOrFloat.test(lengthInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, furnitureInput: true})
                } else {
                    setInputsMessages({...inputsMessages, furnitureInput: false})
                    setFormData({...formData, length: lengthInput.current.value})
                }
                break
            case 'weight':
                if(!intOrFloat.test(weightInput.current.value.toString())) {
                    setInputsMessages({...inputsMessages, weightInput: true})
                } else {
                    setInputsMessages({...inputsMessages, weightInput: false})
                    setFormData({...formData, weight: weightInput.current.value})
                }
                break
            default:
                return
        }
    }

    useEffect(() => {
        console.log(inputsMessages)
    }, [inputsMessages])

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
                        onChange={() => handleFormChange('sku')}
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
                        onChange={() => {handleFormChange('name')}} 
                    />
                </div>
                <span className={`name-input-message ${inputsMessages['nameInput'] ? 'name-input-message-active' : ''}`}>the name should receive alphanumeric values only.</span>
                <div>
                    <label htmlFor='price'>Price ($)</label>
                    <input 
                        id='price' 
                        type='number' 
                        name='price'
                        step='0.1'
                        ref={priceInput}
                        onChange={() => handleFormChange('price')} 
                    />
                </div>
                <span className={`price-input-message ${inputsMessages['priceInput'] ? 'price-input-message-active' : ''}`}>price field must receive a positive value in the formats `1` or `1.0`.</span>
                <div>
                    <label htmlFor='productType'>Type switcher</label>
                    <select 
                        ref={typeInput} 
                        onChange={() => {
                            handleFormChange('type')
                            handleSelectChange()
                        }}
                        id='productType'
                        name='type'
                        value={formType}
                    >
                        <option value='select'>select</option>
                        <option id='DVD' value='dvd'>Dvd</option>
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
                            ref={sizeInput}
                            onChange={() => {
                                handleFormChange()
                                handleFormChange('size')
                            }} 
                            id='size' 
                            type='number'
                            name='size'
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
                            type='number' 
                            name='height'
                            ref={heightInput}
                            onChange={() => {
                                handleFormChange('height')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='width'>Width (CM)</label>
                        <input 
                            id='width' 
                            type='number' 
                            name='width'
                            ref={widthInput}
                            onChange={() => {
                                handleFormChange('width')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='length'>Length (CM)</label>
                        <input
                            id='length' 
                            type='number' 
                            name='length'
                            ref={lengthInput}
                            onChange={() => {
                                handleFormChange('length')
                                handleSelectChange()
                            }}
                        />
                    </div>
                    <span className={`furniture-input-message ${inputsMessages['furnitureInput'] ? 'furniture-input-message-active' : ''}`}>dimension fields must receive a positive value in the formats `1` or `1.0`.</span>
                    <span>Please provide the dimensions in Height X Width X Length format.</span>
                </fieldset>
                <fieldset className={defineTypeInfoClass('book')}>
                    <div>
                        <label htmlFor='weight'>Weight (KG)</label>
                        <input 
                            ref={weightInput} 
                            onChange={() => {
                                handleFormChange()
                                handleFormChange('weight')
                            }}
                            id='weight' 
                            type='number' 
                            name='weight' 
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
