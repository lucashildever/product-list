import { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

const HomeHeader = ({checkedCards, setCheckedCards}) => {

    const {deleteProducts} = useContext(GlobalState)

    const [deleteMsg, setDeleteMsg] = useState(false)

    function handleDelete() {
        if(checkedCards.length > 0) {
            setDeleteMsg(false)
            deleteProducts(checkedCards.join(','))
            setCheckedCards([])
        } else {
            setDeleteMsg(true)
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
                    <button id='delete-product-btn'>ADD</button>
                </Link>
                <button onClick={handleDelete} id='delete-product-btn'>MASS DELETE</button>
            </div>
            <span className={`delete-msg ${deleteMsg ? 'delete-msg-active' : ''}`}>No products selected</span>
        </div>
    )
}

export default HomeHeader