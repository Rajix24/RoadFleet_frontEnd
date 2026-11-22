import {Route, Routes} from "react-router"
// PROTECTEDROUTE:
import ProtectedRoute from  "@/layouts/ProtectedRoute"
// AND LAYOUT: 
import AuthLayout from "@/layouts/auth"
import ChauffeurLayout from "@/layouts/ChauffeurLayout"
// PAGES :
import Register from "@/pages/Regiter"
import Login from "@/pages/Login"
import Admin from "@/pages/Admin"
import Chauffeur from "@/pages/Chauffeur"
import NotFound from "@/pages/NotFound"
import Home from "@/pages/Home"
import AdminChauffeur from "@/pages/Admin/Admin.chauffeur"

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route element={<AuthLayout/>}>
                <Route  path="login" element={<Login/>}/>
                <Route path="register_chauffeur" element= {<Register/>}/>
            </Route>
            <Route  element={<ProtectedRoute/>}>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/create_chauffeur" element={<AdminChauffeur/>}/>
                
            </Route>
            <Route  element={<ChauffeurLayout/>}>
                <Route path="/chauffeur" element={<Chauffeur/>}/>
            </Route>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}