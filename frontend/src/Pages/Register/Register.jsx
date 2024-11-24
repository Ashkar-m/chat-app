// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import AuthContext, { baseUrl } from '../../context/AuthContext';

// const Register = () => {
//     const { loginUser } = useContext(AuthContext)
//     const Submit = async (e) => {
//         e.preventDefault()
//         const data = {'username':e.target.username.value, 'password':e.target.password.value}
//         await fetch(`${baseUrl}chat/user/create/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.ok){
//                 loginUser(e)
//             }else{
//                 alert("This Name Already Exists")
//             }
//         })
//         .catch(err => console.log(err))
//     }
//     return (
//         <div id='login'>
//             <Link id="register" to='/login'>Login</Link>
//             <form onSubmit={Submit}>
//                 <h2>Register</h2>
//                 <input type="text" name='username' placeholder='Enter Username' />
//                 <input type="password" name="password" placeholder='Enter Password' />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     )
// }
// export default Register

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext, { baseUrl } from '../../context/AuthContext';

const Register = () => {
    const { loginUser } = useContext(AuthContext)

    const Submit = async (e) => {
        e.preventDefault()
        const data = { 'username': e.target.username.value, 'password': e.target.password.value }
        await fetch(`${baseUrl}chat/user/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    loginUser(e)
                } else {
                    alert("This Name Already Exists")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
            <div className="w-screen max-w-md bg-white rounded-lg shadow-lg p-6">
                <Link
                    id="login"
                    to='/login'
                    className="text-blue-500 hover:text-blue-700 text-sm mb-4 block text-center"
                >
                    Already have an account? Login
                </Link>

                <form onSubmit={Submit} className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Register</h2>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
