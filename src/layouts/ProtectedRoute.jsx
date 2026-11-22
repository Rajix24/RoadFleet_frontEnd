import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie"
import { useEffect } from "react";

export default function ProtectedRoute() {
  const Navigate = useNavigate()
  const user = JSON.parse(Cookies.get("user")|| null) 
  if (!user) {
    useEffect(()=>{
      Navigate("/login")
    },[])
    
      return
  }
  return <Outlet />;
}