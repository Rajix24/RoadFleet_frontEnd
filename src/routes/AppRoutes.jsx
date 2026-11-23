import {Route, Routes} from "react-router"
// PROTECTEDROUTE:
import ProtectedRoute from  "@/layouts/ProtectedRoute"
// AND LAYOUT: 
import AuthLayout from "@/layouts/auth"
import ChauffeurLayout from "@/layouts/ChauffeurLayout"
// PAGES :
//AUTH:
import Register from "@/pages/Regiter"
import Login from "@/pages/Login"


// PRENCIPLE:
import Admin from "@/pages/Admin"
import Chauffeur from "@/pages/Chauffeur"
import Home from "@/pages/Home"

//NOT FOUND
import NotFound from "@/pages/NotFound"


// ADMIN PPAGES

import AdminChauffeur from "@/pages/Admin/Admin.chauffeur"
import GestionCamions from "@/pages/Admin/Materials/GestionCamions"
import GestionRemorque from "@/pages/Admin/Materials/GestionRemorque"
import CestionPneus from "@/pages/Admin/Materials/GestionPneus"
import GestionTrajet from "@/pages/Admin/trajet/GestionTrajet"





export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route element={<AuthLayout/>}>
                <Route  path="login" element={<Login/>}/>
                <Route path="register_chauffeur" element= {<Register/>}/>
            </Route>
            <Route  path="/admin" element={<ProtectedRoute/>}>
                <Route index element={<Admin/>}/>
                <Route path="camions" element={<GestionCamions/>}/>
                <Route path="remorque" element={<GestionRemorque/>}/>
                <Route path="pneus" element={<CestionPneus/>}/>
                <Route path="trajet" element={<GestionTrajet/>}/>
                <Route path="create_chauffeur" element={<AdminChauffeur/>}/>
                
            </Route>
            <Route  element={<ChauffeurLayout/>}>
                <Route path="/chauffeur" element={<Chauffeur/>}/>
            </Route>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}