import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    const click = state.userAPI.click
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!"
                     onClick={() => {addCart(product); click(product)}}>
                        Add To Cart
                    </Link>
                    {/* <Link id="btn_view" to={`/detail/${product._id}`}>
                        Mua ngay
                    </Link> */}
                    <Link id="btn_view" to="/cart" onClick={() => {addCart(product); click(product)}}>
                        Buy Now
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender