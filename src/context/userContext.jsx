import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Cookies from "js-cookie"
export const  UserContext = createContext(null);



export function UserProvider({children}) {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  useEffect(()=>{
    setUser(()=>{
      return JSON.parse(Cookies.get("user")|| null) || null 
    })
  },[])
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}