export const base_url =import.meta.env.VITE_API_URL;

export async  function  getUsers(){
    const response = await  fetch(`${base_url}/camion`).catch(err =>{
        console.log(err)
        throw new Error("error in fetching data")
    })
    const Users = await response.json()
    console.log(Users.data)
    return Users.data
}
