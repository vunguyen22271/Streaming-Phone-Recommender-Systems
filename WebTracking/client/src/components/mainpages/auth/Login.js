import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Login() {

    // user login
    const [user, setUser] = useState({
        email: '', password: ''
    })
    // bắt sự kiện và lấy thông tin người dùng điền vào ô input
    const onChange = event => {
        const {name, value} = event.target;
        setUser({...user,[name]:value})
    }
    // bắt sự kiện khi người dùng submit thông tin login
    const onSubmit = async event =>{
        event.preventDefault()
        try {
            await axios.post('/user/login', {...user})
            localStorage.setItem('username', true)
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className = "login-page">
           <form onSubmit={onSubmit}>
               <h2>Login</h2>
               <input type = 'email' name = 'email' required placeholder="Email" value = {user.email} onChange = {onChange}/>
               <input type = 'password' name = 'password' required autoComplete = 'on'
                 placeholder="Password" value = {user.password} onChange = {onChange}/>
               <div className = "row">
                    <button type = 'submit'>Login</button>
                    <Link to = '/register'>Register</Link>
               </div>
           </form>
        </div>
    )
}

export default Login
