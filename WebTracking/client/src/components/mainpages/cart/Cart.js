import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from 'axios';
import PaypalButton from './PaypalButton';
function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)
  useEffect(() =>{
      const getTotal = () =>{
          const total = cart.reduce((prev, item) => {
              return prev + (item.price * item.quantity)
          },0)

          setTotal(total)
      }

      getTotal()

  },[cart])

  const addToCart = async (cart) =>{
      await axios.patch('/user/addcart', {cart}, {
          headers: {Authorization: token}
      })
  }
  const increaseItem = (id) =>{
      cart.forEach(item => {
          if(item._id === id){
              item.quantity += 1
          }
      })

      setCart([...cart])
      addToCart(cart)
  }
  const decreaseItem = (id) =>{
      cart.forEach(item => {
          if(item._id === id){
              item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
          }
      })

      setCart([...cart])
      addToCart(cart)
  }
  const removeProduct = id =>{
      if(window.confirm("Do you want to delete this product?")){
          cart.forEach((item, index) => {
              if(item._id === id){
                  cart.splice(index, 1)
              }
          })

          setCart([...cart])
          addToCart(cart)
      }
  }
  const tranSuccess = async payment =>{
        const {paymentID, address} = payment
        await axios.post('/api/payment',{cart, paymentID,address}, 
        {headers:{Authorization:token}
    })
        setCart([])
        addToCart([])
        alert("You have successfully placed 1 order")
  }

  if (cart.length === 0) return <h2 style={{textAlign: "center", fontSize: "28px",color:"#ee4d2d"}}>Cart is empty</h2>;

  return (
      <div>
          {
              cart.map(product => (
                  <div className="detail cart" key={product._id}>
                      <img src={product.images.url} alt="" />

                      <div className="box-detail">
                          <h2>{product.title}</h2>

                          <h3>$ {product.price * product.quantity}</h3>
                          <p>{product.description}</p>
                          <p>{product.content}</p>
                          <p><span>Screen Size: </span> {product.screenSize} Inches</p>
                          <p><span>Ram: </span>{product.ram} GB</p>
                          <p><span>Camera: </span>{product.camera}</p>
                          <p><span>Memory: </span>{product.memory} GB</p>
                          <p><span>Pin: </span>{product.pin} mAh</p>
                          <p><span>Status: </span>{product.status}</p>
                          <p><span>Color: </span>{product.color}</p>
                          <div className="amount">
                              <p>Quantity: </p>
                              <button className="btn" onClick={() => decreaseItem(product._id)}> - </button>
                              <span className ="btn">{product.quantity}</span>
                              <button className="btn" onClick={() => increaseItem(product._id)}> + </button>
                              <div className="delete" onClick={() => removeProduct(product._id)}>Delete</div>
                          </div> 
                      </div>
                  </div>
              ))
          }

          <div className="total">
              <h3>Total: ${total}</h3>
              <PaypalButton 
              total = {total}
              tranSuccess={tranSuccess}/>
          </div>
      </div>
  )
}

export default Cart