import { useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { Small } from "./Small";

export const Memorize = () => {

    const { counter, increment } = useCounter( 10 );

    const [ show, setShow ] = useState( true )

    return (
        <div className="container">
            <h1>Memorize</h1>

            <hr />
            <h2>Counter: <Small value={counter} /></h2>

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
