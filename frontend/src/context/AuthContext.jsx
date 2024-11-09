import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({Children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem)
}