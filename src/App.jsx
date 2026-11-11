import './App.css'
import {base_url, getUsers} from "./api/UserApi.js"


function App() {
  console.log(getUsers())
  return (
    <div>
      hello world 
    </div>
  )
}

export default App
