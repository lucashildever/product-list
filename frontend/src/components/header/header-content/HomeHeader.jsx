import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

const HomeHeader = () => {

    const {checkedCards, setCheckedCards, fetchProducts} = useContext(GlobalState)

    const [deleteMsg, setDeleteMsg] = useState(false)

    function handleDelete() {
        
        if(checkedCards.length > 0) {
            setDeleteMsg(false)

            fetch(`http://localhost/scandiweb/products-page/backend/api/index.php/deleteproducts?ids=${checkedCards.join(',')}`, {
                method: 'PUT'
            })
                .then(response => {
                    fetchProducts()
                    response.json()
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
        } else {
            setDeleteMsg(true)
            console.log('selecione algum item para deletar')
        }
    }

    return (
        <div className='header-content'>
            <h1>Product List</h1>
            <div className='header-buttons-home'>
                <Link 
                    to='/add-product' 
                    onClick={() => {
                        setDeleteMsg(false)
                        setCheckedCards([])
                        }} 
                >
                    <button id='delete-product-btn'>Add</button>
                </Link>
                <button onClick={handleDelete} id='delete-product-btn'>Mass delete</button>
            </div>
            <span className={`delete-msg ${deleteMsg ? 'delete-msg-active' : ''}`}>No products selected</span>
        </div>
    )
}

export default HomeHeader