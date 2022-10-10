import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Register() {

    // user register: name, email, password
    const [user, setUser] = useState({
        name:'',email: '', password: ''
    })
    // bắt sự kiện lấy thông tin từ người dùng nhập
    const onChange = event => {
        const {name, value} = event.target;
        setUser({...user,[name]:value})
    }
    // bắt sự kiện lấy thông tin từ người dùng submit
    const onSubmit = async event =>{
        event.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem('username', true)
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className = "login-page">
           <form onSubmit={onSubmit}>
               <h2>Register</h2>
               <input type = 'text' name = 'name' required placeholder="Name" value = {user.name} onChange = {onChange}/>
               <input type = 'email' name = 'email' required placeholder="Email" value = {user.email} onChange = {onChange}/>
               <input type = 'password' name = 'password' required autoComplete = 'on'
                 placeholder="Password" value = {user.password} onChange = {onChange}/>
               <div className = "row">
                    <button type = 'submit'>Register</button>
                    <Link to = '/login'>Login</Link>
               </div>
           </form>
        </div>
    )
}

export default Register

