import { children, cloneElement  } from "react" 

export default function ProtectedView({children , user}){
    return (
        <>
            <main >
                {children}   
            </main>
        </>
    )
        

}