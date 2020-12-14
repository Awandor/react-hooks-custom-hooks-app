import { useState } from "react";
import { AppRouter } from "./AppRouter"
import { UserContext } from "./UserContext";

export const MainApp = () => {

    /* const user = {
        id: 1234,
        nombre: 'Dan',
        email: 'algo@algo.com'
    } */

    const [ user, setUser ] = useState( {} );

    /* return (
        <UserContext.Provider value={user}>
            <AppRouter />
        </UserContext.Provider>
    ); */

    // Pasamos un objeto como value con el método setUser

    /* return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            <AppRouter />
        </UserContext.Provider>
    ); */

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppRouter />
        </UserContext.Provider>
    );

};
