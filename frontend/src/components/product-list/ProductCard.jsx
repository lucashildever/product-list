import { useEffect, useState, useRef } from 'react'

const ProductCard = ({ sku, id, name, type, price, type_info, checkedCards, setCheckedCards }) => {

    const [cardActive, setCardActive] = useState(false)
    const checkBox = useRef(null)
    
    useEffect(() => {
        setCheckedCards([])
    }, [])

    useEffect(() => {
        if(checkedCards.includes(id)) {
            setCardActive(true)
            checkBox.current.checked = true
        }
        else {
            setCardActive(false)
            checkBox.current.checked = false
        }
    }, [checkedCards])

    function handleCardClick() {
        const cardsArray = [...checkedCards]
        if(cardsArray.includes(id)) {
            cardsArray.splice(cardsArray.indexOf(id), 1)
            setCheckedCards([...cardsArray])
            setCardActive(false)
        } else {
            setCheckedCards([...cardsArray, id])
            setCardActive(true)
        }
    }

    return (
        <div 
            onClick={handleCardClick}
            className={`product-card ${cardActive ? 'card-active' : ''} `}
        >
            <input ref={checkBox} className={`delete-checkbox product-card-${id}`} type='checkbox'></input>
            <div className='product-info'>
                <h2>{sku}</h2>
                <h2>{name}</h2>
                <h2>{price} $</h2>
                <h2>
                    {type === 'dvd' ? 'Size: ' : (type === 'furniture' ? 'Dimension: ' : 'Weight: ' )} 
                    {type_info}
                </h2>
            </div>
        </div>
    )
}

export default ProductCard

