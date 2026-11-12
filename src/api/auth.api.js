import Cookie  from "js-cookie"
const url = import.meta.env.VITE_API_URL

export async  function User_login(information){
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(information)
    })
    if(!response.ok){
        throw new Error("error in login try again...")
    }
    const data = await response.json()
    Cookie.set("auth_token", data.user.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict"
    })
    
    return data.user
}