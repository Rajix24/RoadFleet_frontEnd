import { useState } from "react";
import Cookie from "js-cookie";
import "./App.css";


import Admin from "./pages/Admin";
import Chauffeur from "./pages/Chauffeur.jsx";
import Login from "./pages/Login.jsx";
import ProtectedView from "./layouts/ProtectedView";
import { GetUsers } from "./api/UserApi";


function App() {

  const [user, setUser] = useState(() => {
   
    const cookieUser = Cookie.get("user");
    if (!cookieUser) {
      return null;
    }

    try {
      return JSON.parse(cookieUser);
    } catch (error) {
      console.error("Invalid user cookie:", error);
      return null;
    }
  });




  // function handleLogin(infoUser) {
  //   if (!infoUser) return;

  //   setUser(infoUser);

  //   if (infoUser.role === "admin") {
  //     setPage("admin");
  //   } else if (infoUser.role === "chauffeur") {
  //     setPage("chauffeur");
  //   }
  // }

  function handleLogout() {
    Cookie.remove("user");
    setUser(null);
    setPage("login");
  }

  if (user?.role === "admin") {
    return (
      <ProtectedView>
        <Admin user={user}  />
      </ProtectedView>
    );
  }

  if (user?.role === "chauffeur") {
    return (
      <ProtectedView>
        <Chauffeur user={user}  />
      </ProtectedView>
    );
  }

  return (
    <ProtectedView>
      <Login  editUser={setUser} />
    </ProtectedView>
  );
}

export default App;
