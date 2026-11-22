import { useState, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { User_login } from "../api/auth.api.js";
import { useNavigate } from "react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";

function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("function login excited");
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("handle submit are excuted");
    let email = event.target[0].value;
    let password = event.target[1].value;
    setPassword(password);
    setEmail(email);
    const userInfo = await User_login({ email, password });
    login(userInfo);
    if (userInfo.role == "admin") {
      navigate("/admin");
    }
    if (userInfo.role == "chauffeur") {
      navigate("/chauffeur");
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;