import { useState } from "react";
import {User_login} from "../api/auth.api.js" 
import { EyeOffIcon, MailIcon } from "lucide-react"
import {Button} from "@/components/ui/button.jsx"
import Styles from "./login.module.css"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

 function Login({ onLogin , editUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    const formData = new FormData(event.target);
    // console.log(event.target[0].value)
    // console.log(formData)
    let email = event.target[0].value
    let password = event.target[1].value
    setPassword(password)
    setEmail(email)
    console.log(email, password)
    const user = await User_login({email, password})
    console.log(user, "qwoihdqdjiqjdiqjwdiq")
    
    // onLogin(user);
    editUser(user)
  }

  return (
    <div className={Styles.layout}>
    <div>
        <h1>Login</h1>
    </div>
    <form onSubmit={handleSubmit}>
        <Field className="max-w-sm" >
            <FieldLabel htmlFor="inline-end-input">Email</FieldLabel>
                <InputGroup>
                    <InputGroupInput type="email" name="email" placeholder="Enter your email" />
                    <InputGroupAddon>
                    <MailIcon />
                    </InputGroupAddon>
                </InputGroup>
            <FieldDescription>Enter Your email</FieldDescription>

        </Field>
       
        <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                    id="inline-end-input"
                    type="password"
                    placeholder="Enter password"
                    name  ="password"
                    />
                    <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                    </InputGroupAddon>
                </InputGroup>
            <FieldDescription>Enter password 8 characters</FieldDescription>
        </Field>

      <Button type="submit">
        Login
      </Button>
    </form>
</div>
  );
}

export default Login;