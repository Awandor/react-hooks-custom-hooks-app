import { useCallback, useState } from "react";
import { ShowIncrement } from "./ShowIncrement";

export const CallbackHook = () => {

    const [ counter, setCounter ] = useState( 10 );

    /* const increment = () => {

        setCounter( counter + 1 );

    }; */

    const increment = useCallback(
        ( num ) => {

            setCounter( c => c + num ); // como no tenemos counter usamos la forma alternativa de obtenerlo

        },
        [ setCounter ] // no podemos pasar como dependencia counter porque no tendría efecto
    );

    return (
        <div className="container">
            <h1>useCallback Hook</h1>
            <hr />
            <h2>Counter: <small>{counter}</small></h2>

            <div className="row mt-4">
                <ShowIncrement increment={increment} />
            </div>
        </div>
    );

};
