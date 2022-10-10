import React,{useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import History from './history/HistoryOrder'
import OrderDetails from './history/OrderDetails'
import CreateProducts from './createProducts/CreateProducts'
import NotFound from './utils/Not_Found/NotFound'
import Dashboard from './dashboard/Dashboard'
import Users from './user/GetAllUsers'
import {GlobalState} from '../../GlobalState'

const Pages = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <Switch>
            <Route path ="/" exact component ={Products} />
            <Route path ="/detail/:id" exact component ={DetailProduct} />
            <Route path ="/login" exact component ={isLogged? NotFound :Login} />
            <Route path ="/register" exact component ={isLogged? NotFound :Register} />
            <Route path ="/history" exact component ={isLogged? History : NotFound} />
            <Route path ="/category" exact component ={isAdmin? Categories : NotFound} />
            <Route path ="/history/:id" exact component ={isLogged? OrderDetails : NotFound} />
            <Route path ="/create_product" exact component ={isAdmin? CreateProducts : NotFound}/>
            <Route path ="/edit_product/:id" exact component ={isAdmin? CreateProducts : NotFound} />
            <Route path ="/dashboard" exact component ={isAdmin? Dashboard : NotFound}/>
            <Route path ="/all_user" exact component ={isAdmin? Users : NotFound}/>
            <Route path ="/cart" exact component ={Cart} />
            <Route path ="*" exact component ={NotFound} />
        </Switch>
    )
}

export default Pages
