import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useNavigate } from 'react-router-dom'

const AddProductHeader = ({ canAddProduct, setCanAddProduct, formData, setFormData }) => {

    const {inputsMessages, setInputsMessages, setLoading, addProduct} = useContext(GlobalState)
    const navigate = useNavigate()

    function resetForm() {
        setInputsMessages({
            formDiv: false,
            skuInput: false,
            nameInput: false,
            priceInput: false,
            switcherInput: false,
            sizeInput: false,
            furnitureInput: false,
            weightInput: false
        })
        setFormData({
            sku: '',
            name: '',
            price: '',
            type: 'select',
            size: '',
            height: '',
            width: '',
            length: '',
            weight: ''
        })
    }

    useEffect(() => {
        setLoading(false)
        resetForm()
    }, [])

    const handleClick = () => {
        if(canAddProduct) {
            resetForm()
            setLoading(true)
            setCanAddProduct(false)

            const data = {
                sku: formData.sku,
                name: formData.name,
                price: formData.price,
                type: formData.type
            }

            switch(formData.type) {
                case 'dvd':
                    data.type_info = formData.size
                    break
                case 'furniture':
                    data.type_info = formData.height + 'x' + formData.width + 'x' + formData.length
                    break
                case 'book':
                    data.type_info = formData.weight
                    break
                default:
                    break
            }
            console.log(data)
            addProduct(data)
            navigate('/')
        } else
            setInputsMessages({...inputsMessages, formDiv: true})
    }

    return (
        <div className='header-content'>
            <h1>Add Product</h1>
            <div className='header-buttons-add'>
                <button onClick={handleClick} className='save-btn'>Save</button>
                <button onClick={() => navigate('/')} className='cancel-btn'>Cancel</button>
            </div>
        </div>
    )
}

export default AddProductHeader