import { useContext, useEffect, useState, useRef } from 'react'
import { GlobalState } from '../../GlobalState'

const ProductCard = ({ sku, id, name, price, info }) => {

    // const {checkedCards, setCheckedCards, productsData} = useContext(GlobalState)
    let {checkedCards} = useContext(GlobalState)
    const [cardActive, setCardActive] = useState(false)
    const checkBox = useRef(null)

    // function handleCardClick() {
    //     setCardActive(!cardActive)
        
    //     let cardsArray = checkedCards
        
    //     if(cardsArray.includes(id)) {
    //         cardsArray.splice(checkedCards.indexOf(id), 1)
    //         setCheckedCards([...cardsArray])
    //         checkBox.current.checked = false
    //     } else {
    //         cardsArray.push(id)
    //         setCheckedCards([...cardsArray])
    //        
    //         setCardActive(true)
    //     }
    // }

    function handleClick() {
        if(checkedCards.includes(id)) {
            checkedCards = checkedCards.filter(item => item !== id)
            checkBox.current.checked = false
            setCardActive(false)
        } else {
            checkedCards.push(id)
            checkBox.current.checked = true
            setCardActive(true)
        }
        console.log(checkedCards)
    }
    
    useEffect(() => {
        console.log(checkedCards)
        checkedCards = []
    }, [])

    return (
        <div  
            onClick={handleClick}
            className={`product-card ${cardActive ? 'card-active' : ''} `}
        >
            <input ref={checkBox} className='delete-checkbox' type='checkbox'></input>
            <div className='product-info'>
                <h2>{name}</h2>
                <h2>{sku}</h2>
                <h2>{price}</h2>
                <h2>{info}</h2>
            </div>
        </div>
    )
}

export default ProductCard

