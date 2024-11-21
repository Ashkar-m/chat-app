
// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();
// export const baseUrl = "http://127.0.0.1:8000/";

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//     const navigateTo = useNavigate();
//     let [authTokens, setAuthTokens] = useState(() =>
//         localStorage.getItem("authTokens")
//             ? JSON.parse(localStorage.getItem("authTokens"))
//             : null
//     );

//     let [user, setUser] = useState(() =>
//         localStorage.getItem("authTokens")
//             ? decodeJWT(JSON.parse(localStorage.getItem("authTokens")).access)
//             : null
//     );

//     let [loading, setLoading] = useState(true);

//     // Function to manually decode a JWT
//     const decodeJWT = (token) => {
//         try {
//             const base64Url = token.split(".")[1];
//             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//             const jsonPayload = decodeURIComponent(
//                 atob(base64)
//                     .split("")
//                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//                     .join("")
//             );
//             return JSON.parse(jsonPayload);
//         } catch (error) {
//             console.error("Invalid token", error);
//             return null;
//         }
//     };

//     let loginUser = async (e) => {
//         e.preventDefault();
//         let response = await fetch(`${baseUrl}chat/api/token/`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username: e.target.username.value,
//                 password: e.target.password.value,
//             }),
//         });
//         let data = await response.json();

//         if (response.status === 200) {
//             setAuthTokens(data);
//             setUser(decodeJWT(data.access));
//             localStorage.setItem("authTokens", JSON.stringify(data));
//             navigateTo("/");
//         } else {
//             console.log(response);
//         }
//     };

//     let logoutUser = () => {
//         setAuthTokens(null);
//         setUser(null);
//         localStorage.removeItem("authTokens");
//     };

//     let updateToken = async () => {
//         let response = await fetch(`${baseUrl}chat/api/token/refresh/`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${authTokens?.refresh}`,
//             },
//             body: JSON.stringify({ refresh: authTokens?.refresh }),
//         });

//         let data = await response.json();

//         if (response.status === 200) {
//             setAuthTokens(data);
//             setUser(decodeJWT(data.access));
//             localStorage.setItem("authTokens", JSON.stringify(data));
//         } else {
//             logoutUser();
//         }

//         if (loading) {
//             setLoading(false);
//         }
//     };

//     let contextData = {
//         user: user,
//         authTokens: authTokens,
//         loginUser: loginUser,
//         logoutUser: logoutUser,
//     };

//     useEffect(() => {
//         if (loading) {
//             updateToken();
//         }

//         let fourMinutes = 1000 * 60 * 4;

//         let interval = setInterval(() => {
//             if (authTokens) {
//                 updateToken();
//             }
//         }, fourMinutes);
//         return () => clearInterval(interval);
//     }, [authTokens, loading]);

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     );
// };

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const baseUrl = "http://127.0.0.1:8000/";

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigateTo = useNavigate();

    const decodeJWT = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    };

    let [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem("authTokens");
        return tokens ? JSON.parse(tokens) : null;
    });

    let [user, setUser] = useState(() => {
        const tokens = localStorage.getItem("authTokens");
        return tokens ? decodeJWT(JSON.parse(tokens).access) : null;
    });

    let [loading, setLoading] = useState(true);

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}chat/api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(decodeJWT(data.access));
        } else {
            console.error("Login failed:", response);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigateTo("/login");
    };

    const updateToken = async () => {
        if (!authTokens?.refresh) {
            logoutUser();
            return;
        }

        const response = await fetch(`${baseUrl}chat/api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authTokens.refresh }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(decodeJWT(data.access));
        } else {
            logoutUser();
        }
    };

    // Update localStorage whenever authTokens changes
    useEffect(() => {
        if (authTokens) {
            localStorage.setItem("authTokens", JSON.stringify(authTokens));
        } else {
            localStorage.removeItem("authTokens");
        }
    }, [authTokens]);

    useEffect(() => {
        if (loading) {
            updateToken().finally(() => setLoading(false));
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 1000 * 60 * 4); // Refresh token every 4 minutes

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

