import { useMemo, useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { procesoPesado } from "../helpers/procesoPesado";

export const MemoHook = () => {

    const { counter, increment } = useCounter( 1000 );

    const [ show, setShow ] = useState( true );

    /* const procesoPesado = ( iteraciones ) => {

        for ( let i = 0; i < iteraciones; i++ ) {

            console.log( 'Ahí vamos...' );

        }

        return `${iteraciones} iteraciones realizadas.`;

    }; */

    // useMemo recibe un callback y unas dependencias

    const memoProcesoPesado = useMemo( () => procesoPesado( counter ), [ counter ] )

    return (
        <div className="container">
            <h1>Memo Hook</h1>

            <hr />
            <h2>Counter: <small>{counter}</small></h2>

            {/* <p>{procesoPesado( counter )}</p> */}

            <p>{memoProcesoPesado}</p>

            <div className="row mt-4">
                <button className="btn btn-primary" onClick={() => {

                    increment( 1 );

                }}>+1</button>
            </div>

            <div className="row mt-4">
                <button type="button" className="btn btn-primary" onClick={() => {

                    setShow( !show );

                }}>Toggle show: {JSON.stringify( show )}</button>
            </div>
        </div>
    );

};
