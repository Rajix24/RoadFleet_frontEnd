import { useState } from "react";
import {User_login} from "../api/auth.api.js" 

 function Login({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPassword(formData.get('password'))
    setEmail(formData.get('email'))

    const user = await User_login({email, password})
     onLogin(user);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name= "password" placeholder="Password" />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;