import {useEffect, useState} from 'react'
import axios from 'axios'
function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [productId, setProductId] = useState("")
    const [user_id, setUser_id] = useState("")
    useEffect(()=>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                    setUser_id(res.data._id)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token,user_id])
    // xét các trường hợp để thêm sản phẩm và giỏ hàng
    const addCart = async(product) =>{
        if(!isLogged) return alert("Please sign in to buy products")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart,{...product, quantity:1}])
            await axios.patch('/user/addCart', {cart:[...cart, {...product, quantity:1}]}, {
                headers: {Authorization: token}
            })
        }else{
            alert("The product has been added to cart")  
        }

    }
    const click = async (product)=>{
        if(!isLogged) return alert("Please sign in to buy products")
        setProductId(product._id)
        if(productId !==''){
            await axios.post('/api/tracking',{id_user: user_id,id_product:product._id},{
                headers: {Authorization: token}
            })
        }
    }
    //console.log(productId)
    return {
        isLogged: [isLogged, setIsLogged], 
        isAdmin: [isAdmin, setIsAdmin],
        cart:  [cart, setCart],
        addCart: addCart,
        click: click,
        history: [history,setHistory],
        productId: [productId, setProductId],
        user_id: [user_id, setUser_id]
    }
}

export default UserAPI