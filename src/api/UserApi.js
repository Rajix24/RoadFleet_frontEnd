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

        console.log(Users.data)
        return Users.data

    } catch (error) {
        console.error("GetUsers error:", error)
        throw error
    }
}