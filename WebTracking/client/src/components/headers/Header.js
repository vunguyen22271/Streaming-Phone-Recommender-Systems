import React,{useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from "../headers/icons/menu.svg"
import Cart from "../headers/icons/cart.svg"
import Close from "../headers/icons/close.svg"
import {Link} from "react-router-dom"
import axios from 'axios'
const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logout = async() =>{
        await axios.get('/user/logout')
        localStorage.removeItem('username')
        window.location.href = '/'
    }
    const adminRouter = () =>{
        return (
            <>
                <li><Link to = '/create_product'>Create products</Link></li>
                <li><Link to = '/category'>Categories</Link></li>
                <li><Link to = '/dashboard'>Dashboard</Link></li>
                <li><Link to = '/all_user'>Accounts</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return (
            <>
                <li><Link to = '/history'>History</Link></li>
                <li><Link to = '/' onClick ={logout}>Logout</Link></li>
            </>
        )
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
            <div className = "menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width = "30" />
            </div>
            <div className = "logo">
                <h1>
                    <Link to = "/">{ isAdmin? 'Admin': 'DE Shop'}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to = "/">{ isAdmin? 'Products': 'Shop'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter():  <li><Link to = "/login"> Login | Register</Link></li>
                }
                <li className="menu" onClick={() => setMenu(!menu)}>
                    <img src= {Close} alt="" width = "30"/>
                </li>
            </ul>
            { isAdmin ? '' 
                :<div className = "cart-icon">
                    <span>{cart.length}</span>
                    <Link to = "/cart">
                        <img src = {Cart} alt="" width = "30" />
                    </Link>
                </div>
            }
        </header>
    )
}

export default Header