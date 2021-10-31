import React, {useState} from "react"
import EcommerceAd from "./EcommerceAd"

function GlobalState({children}){
    const [userLogin, setUserLogin]= useState(localStorage.getItem("login"))
    const [userInfo,setUserInfo]= useState(JSON.parse(localStorage.getItem("user")))
    const loginUser = (user)=>{
        setUserLogin(true)
        localStorage.setItem("login",true)
        setUserInfo(user)
        localStorage.setItem("user",JSON.stringify(user))
    }
    const logoutUser=()=>{
        setUserLogin(false)
        setUserInfo()
        localStorage.removeItem("login")
        localStorage.removeItem("user")
    }
    return(
        <EcommerceAd.Provider
            value={{
                userLogin,
                loginUser,
                logoutUser,
                userInfo
            }}
        >
                {children}
        </EcommerceAd.Provider>
    )
}

export default GlobalState;