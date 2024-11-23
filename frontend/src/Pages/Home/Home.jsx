// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'

// import AuthContext, { baseUrl } from '../../context/AuthContext'

// const HomePage = () => {
//     const { authTokens } = useContext(AuthContext)
//     const navigateTo = useNavigate()
//     const { logoutUser } = useContext(AuthContext)
//     const enterRoom = (e) => {
//         e.preventDefault()
//         navigateTo(`/${e.target.room.value}/${e.target.enterPassword.value}`)
//     }
//     const CreateRoom = async (e) => {
//         e.preventDefault()
//         await fetch(`${baseUrl}chat/room/`, {
//             method: 'POST',
//             headers: {
//                 "Authorization": `Bearer ${authTokens.access}`
//             },
//             body: JSON.stringify({'name': e.target.name.value, 'password': e.target.password.value})
//         })
//         .then(response => response.json())
//         .then(data => {
//             data.status === 200 ? navigateTo(`/${e.target.name.value}/${e.target.password.value}`) : alert("This room is already exists")
//         })
//     }
//     return (
//         <div id='enterRoom'>
//             <button id='logout' onClick={logoutUser}>Logout</button>
//             <form onSubmit={enterRoom}>
//                 <label htmlFor="room">Enter the room's name</label>
//                 <input type="text" name="room" placeholder='Room name...' />
//                 <input type="password" name="enterPassword" placeholder='Room Password...' />
//                 <button type="submit">Enter</button>
//             </form>
//             <form onSubmit={CreateRoom}>
//                 <h3>or <br /> Create room</h3>
//                 <label htmlFor="name">Enter the room's name</label>
//                 <input type="text" name="name" placeholder='Room Name...' />
//                 <input type="password" name="password" placeholder='Room Password...' />
//                 <button type="submit">Create</button>
//             </form>
//         </div>
//     )
// }

// export default HomePage

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext, { baseUrl } from '../../context/AuthContext'

const HomePage = () => {
    const { authTokens } = useContext(AuthContext)
    const navigateTo = useNavigate()
    const { logoutUser } = useContext(AuthContext)

    const enterRoom = (e) => {
        e.preventDefault()
        navigateTo(`/${e.target.room.value}/${e.target.enterPassword.value}`)
    }

    const CreateRoom = async (e) => {
        e.preventDefault()
        await fetch(`${baseUrl}chat/room/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authTokens.access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'name': e.target.name.value, 'password': e.target.password.value })
        })
            .then(response => response.json())
            .then(data => {
                data.status === 200 ? navigateTo(`/${e.target.name.value}/${e.target.password.value}`) : alert("This room already exists")
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <button
                    id="logout"
                    onClick={logoutUser}
                    className="w-full text-center py-2 bg-red-500 text-white rounded mb-4 hover:bg-red-600 transition duration-300"
                >
                    Logout
                </button>

                <form onSubmit={enterRoom} className="space-y-4">
                    <div>
                        <label htmlFor="room" className="block text-sm font-semibold text-gray-700">Enter the room's name</label>
                        <input
                            type="text"
                            name="room"
                            placeholder="Room name..."
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="enterPassword" className="block text-sm font-semibold text-gray-700">Room Password</label>
                        <input
                            type="password"
                            name="enterPassword"
                            placeholder="Room Password..."
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition duration-300"
                    >
                        Enter
                    </button>
                </form>

                <hr className="my-6" />

                <form onSubmit={CreateRoom} className="space-y-4">
                    <h3 className="text-center font-semibold text-xl">or <br /> Create Room</h3>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Enter the room's name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Room Name..."
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Room Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Room Password..."
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600 transition duration-300"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default HomePage
