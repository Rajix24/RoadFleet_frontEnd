import Cookie from "js-cookie";
export const token = Cookie.get("auth_token")
const access_token = Cookie.get("access_token")
const base_url =import.meta.env.VITE_API_URL;




export async  function  getCamions(){
    const response = await  fetch(`${base_url}/camion`).catch(err =>{
        console.log(err)
        throw new Error("error in fetching data")
    })
    const Users = await response.json()
    console.log(Users.data)
    return Users.data
}

export async function GetUsers() {
    try {
        const response = await fetch(`${base_url}/api/users`, {
            method: "GET",
            credentials : "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const Users = await response.json()
        return Users
    } catch (error) {
        console.error("GetUsers error:", error)
        throw error
    }
}

export async  function DeleteUser(param){
    try{

        const response = await fetch(`${base_url}/api/user/${param}`, {
            method: "DELETE",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            }
        })
        
        if (!response.ok) {
            throw new Error("can't delete user");
        }
        const res = response.json()
        return res
    }catch(error){
        console.log(error)
        // throw new Error("error in function of delete user")
    }
}

export async function UpdateUser(email, userData) {
    try {
        const response = await fetch(`${base_url}/api/user/${encodeURIComponent(email)}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error(`Unable to update user (HTTP ${response.status})`)
        }

        const responseText = await response.text()
        return responseText ? JSON.parse(responseText) : null
    } catch (error) {
        console.error("UpdateUser error:", error)
        throw error
    }
}

