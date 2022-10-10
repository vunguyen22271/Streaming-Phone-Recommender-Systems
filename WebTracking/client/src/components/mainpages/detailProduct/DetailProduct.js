import React,{useContext, useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/ProductItem/ProductItem'
import Delayed from '../utils/Loading/Delay'
function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const click = state.userAPI.click    
    const [detailProduct, setDetailProduct] = useState([])
    const [listSP] = state.similaritiesAPI.list
    console.log(listSP)
    //const [recommend, setRecommend] = useState([])
    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id === params.id) setDetailProduct(product)
            })   
        }
    },[params.id,products])

    if(detailProduct.length === 0) return null
    //const recommend = products.filter(product =>listSP.some(item =>product._id === item))
    //console.log(recommend)
    return (
         /* Xem chi tiết sản phẩm và thêm những sản phẩm tương tự theo category */
        <>
        <div className="detail">
            <img src = {detailProduct.images.url} alt=""/>
            <div className = "box-detail">
                <div className = "row">
                    <h2>{detailProduct.title}</h2>
                    <h6>#id: {detailProduct.product_id}</h6>
                </div>
                <span style={{color:"#ee4d2d"}}>${detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p><span>Screen Size:</span>{detailProduct.screenSize} Inches</p>
                <p><span>Ram:</span>{detailProduct.ram} GB</p>
                <p><span>Camera:</span>{detailProduct.camera}</p>
                <p><span>Memory:</span>{detailProduct.memory} GB</p>
                <p><span>Pin:</span>{detailProduct.pin} mAh</p>
                <p><span>status:</span>{detailProduct.status}</p>
                <p><span>Color:</span>{detailProduct.color}</p>
                <p><span>Sold:</span>{detailProduct.sold}</p>
                <Link to = "/cart" className = "btn-buy" onClick={() =>{addCart(detailProduct);click(detailProduct)}}>Buy Now</Link>
            </div>
        </div>

        <Delayed>
        <div>
            <h2>Related Products</h2>
            <div className='products'>
                {
                    // products.map(product =>{
                    //     return (listSP.some(list=>list === product._id)) ? 
                    //     <ProductItem key = {product._id} product={product}/>:null
                    // })
                    products.map(product =>{
                        return (listSP.some(list=>list === product._id)) ? 
                        <ProductItem key = {product._id} product={product}/>:null
                    })
                }
            </div>
        </div>
        </Delayed>
        </>
       
    )
}

export default DetailProduct
