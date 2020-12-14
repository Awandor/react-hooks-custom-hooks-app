import { useContext } from "react";
import { UserContext } from "./UserContext";

export const HomePage = () => {

    // const userContext = useContext( UserContext );

    // console.log( userContext );

    const { user } = useContext( UserContext );

    

    return (
        <div className="container">
            <h1>Home Page</h1>
            <hr />

            <pre>
                {JSON.stringify( user, null, 3 )}
            </pre>
            
        </div>
    );

};
