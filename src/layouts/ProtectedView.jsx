import { children,  } from "react" 

export default function ProtectedView({children , user}){
    return (
        <>
            <header>
                <h1>wilcome to application this globle layout</h1>
            </header>
            <main>
                {children} 
            </main>
        </>
    )
        
    
}