import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext, { baseUrl } from '../../context/AuthContext';

const Register = () => {
    const { loginUser } = useContext(AuthContext)
    const Submit = async (e) => {
        e.preventDefault()
        const data = {'username':e.target.username.value, 'password':e.target.password.value}
        await fetch(`${baseUrl}chat/user/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok){
                loginUser(e)
            }else{
                alert("This Name Already Exists")
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div id='login'>
            <Link id="register" to='/login'>Login</Link>
            <form onSubmit={Submit}>
                <h2>Register</h2>
                <input type="text" name='username' placeholder='Enter Username' />
                <input type="password" name="password" placeholder='Enter Password' />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register