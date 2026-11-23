import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Cookies from "js-cookie"
export const  UserContext = createContext(null);



export function UserProvider({children}) {
  const [user, setUser] = useState(() =>{
    return JSON.parse( Cookies.get("user")|| null)
  }); 

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user')
    Cookies.remove('access_token')
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}