import { useState } from 'react'
import './App.css'
import Admin from './pages/Admin'
import Chauffeur from './pages/Chauffeur.jsx'
import Login from './pages/Login.jsx'
import ProtectedView from './layouts/ProtectedView'


function App() {
  const [user , setUser] = useState(null)
  const [page, setPage] = useState("")

    function handleLogin(infoUser) {
      setUser(infoUser)

    if (infoUser.role === "admin") {
      setPage("admin");
    } else if (infoUser.role === "chauffeur") {
      setPage("chauffeur");
    }
  }
    function handleLogout() {
    setPage("login");
  }

  // if (page === "login") {
  //   return  <Login onLogin={handleLogin} />;
  // }

  if (page === "admin") {
    return <ProtectedView user={user}>
          <Admin onLogout={handleLogout} />;
        </ProtectedView> 
  }

  if (page === "chauffeur") {
    return<ProtectedView user={user}>
        <Chauffeur onLogout={handleLogout} />;
        </ProtectedView>
  }

 return <ProtectedView user={user}>
          <Login onLogin={handleLogin} /> 
        </ProtectedView>
}

export default App
