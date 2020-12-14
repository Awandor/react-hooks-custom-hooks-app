import { useContext } from "react";
import { UserContext } from "./UserContext";

export const LoginPage = () => {

    const { setUser } = useContext( UserContext );

    const algo = {
        id:3333,
        name: 'Anders'
    };

    return (
        <div className="container">
            <h1>Login Page</h1>
            <hr/>

            <button className="btn btn-primary" onClick={()=> setUser( algo )}>Login</button>
            
        </div>
    );

};
