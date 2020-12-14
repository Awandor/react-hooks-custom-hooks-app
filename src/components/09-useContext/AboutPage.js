import { useContext } from "react";
import { UserContext } from "./UserContext";

export const AboutPage = () => {

    const { user, setUser } = useContext( UserContext );

    const handleClick = () => {

        setUser( {} );

    };

    return (
        <div className="container">
            <h1>About Page</h1>
            <hr />

            <pre>{JSON.stringify( user, null, 3 )}</pre>

            <button className="btn btn-warning" onClick={handleClick}>Log out</button>

        </div>
    );

};
