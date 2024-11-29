// import React, { useContext, useEffect, useState } from 'react'
// import AuthContext, { baseUrl } from '../../context/AuthContext'
// import { Link, useNavigate, useParams } from 'react-router-dom'

// const Chat = () => {
//     const { user, authTokens } = useContext(AuthContext)
//     const { name, password } = useParams()
//     const navigateTo = useNavigate();
//     const [messages, setMessages] = useState([])

//     useEffect( () => {
//         const fetchData = async() => {
//             await fetch(`${baseUrl}/room/${name}/${password}/`,{
//                 method : 'GET',
//                 headers : {
//                     "Authorization" : `Bearer ${authTokens.access}`
//                 }
//             })
//             .then(response => response.json())
//             .then(data => setMessages(data))
//             .catch(err => navigateTo("/"))
//         }
//         const timer = setInterval(() => {fetchData()}, 1000)
//         fetchData();
//         return () => clearInterval(timer)
//     }, [])

//     const Send = async (e) => {
//         e.preventDefault()

//         let data = new FormData()
//         data.append("message", e.target.message.value)
//         data.append("image", e.target.image.files[0])
//         await axios(`${baseUrl}/room/${name}/${password}/`, {
//             method: 'POST',
//             headers: {
//                 "Authorization": `Bearer ${authTokens.access}`,
//                 "Content-Type": "multipart/form-data"
//             },
//             data: data
//         })
//         e.target.reset()
//         let messageContainer = document.getElementById("messageContainer")
//         messageContainer.scrollTo(0, 0)
//     }
    
//   return (
//     <div>

//         <nav>
//             <Link to='/'>
//                 <p>Back</p>
//             </Link>
//             <h2>{name}</h2>
//         </nav>

//         <div className="messages">
//                 <div className="message" id='messagesContainer'>
//                     {messages && messages.map((message) => {
//                         return <div className={`${user.username == message.user ? 'owner' : 'another'}`} key={message.id}><h3>{message.user}</h3> <p>{message.message}</p>
//                             {message.image ? <img className='image' style={{'width': 'auto', 'height': "100px", "display": "block"}} src={`http://localhost:8000${message.image}`} loading="lazy" width={300} height={150} /> : ''}
//                         </div>
//                     })}
//                 </div>
//         </div>
//         <form className='send' onSubmit={Send}>
//             <input type="text" name="message" />
//             <input type="file" name="image" />
//             <input type="submit" value="Send" />
//         </form>
      
//     </div>
//   )
// }

// export default Chat

import React, { useContext, useEffect, useState } from 'react'
import AuthContext, { baseUrl } from '../../context/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Chat = () => {
    const { user, authTokens } = useContext(AuthContext)
    const { name, password } = useParams()
    const navigateTo = useNavigate();
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${baseUrl}chat/room/${name}/${password}/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${authTokens.access}`
                }
            })
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(err => navigateTo("/"))
        }
        const timer = setInterval(() => { fetchData() }, 1000)
        fetchData();
        return () => clearInterval(timer)
    }, [])
    console.log(messages);
    

    const Send = async (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append("message", e.target.message.value)
        data.append("image", e.target.image.files[0])
        await fetch(`${baseUrl}chat/room/${name}/${password}/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            },
            body: data
        })
        e.target.reset()
        let messageContainer = document.getElementById("messageContainer")
        messageContainer.scrollTo(0, 0)
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-100">
            <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
                <Link to='/login' className="text-sm hover:underline">
                    <p>Back</p>
                </Link>
                <h2 className="text-lg font-semibold">{name}</h2>
            </nav>

            <div className="flex-grow overflow-auto p-4 bg-gray-200">
                <div className="space-y-4" id='messagesContainer'>
                    {messages && messages.map((message) => (
                        <div
                            className={`p-4 rounded-lg shadow-md max-w-md ${user.username === message.user ? 'bg-blue-500 text-white self-end' : 'bg-white text-gray-900 self-start'}`}
                            key={message.id}
                        >
                            <h3 className="font-semibold">{message.user}</h3>
                            <p>{message.message}</p>
                            {message.image ? (
                                <img
                                    className="mt-2 w-full h-auto max-h-40 object-cover rounded"
                                    src={`http://127.0.0.1:8000${message.image}`}
                                    loading="lazy"
                                    alt="Uploaded content"
                                    width={300} height={150}
                                />
                            ) : '' }
                        </div>
                    ))}
                </div>
            </div>

            <form
                className="flex items-center gap-4 bg-white p-4 border-t border-gray-300"
                onSubmit={Send}
            >
                <input
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    name="image"
                    className="text-sm text-gray-600"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat
