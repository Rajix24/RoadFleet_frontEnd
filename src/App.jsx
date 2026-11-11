import './App.css'
import {base_url, getUsers} from "./api/UserApi.js"
import {Button} from "../components/ui/button.jsx" 



function App() {
  console.log(getUsers())
  return (
    <div>
      hello world 
      <Button>Click here</Button>
    </div>

  )
}

export default App
