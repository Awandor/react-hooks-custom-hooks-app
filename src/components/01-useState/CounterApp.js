import { useState } from "react"

export const CounterApp = () => {

    /* const [{ counter1, counter2 }, setCounter] = useState( {
        counter1: 10,
        counter2: 20
    } ); */

    const [ counter, setCounter ] = useState( {
        counter1: 10,
        counter2: 20
    } );

    // Quitamos la desestructuración de useState y la usamos aquí aplicado al objeto

    const { counter1, counter2 } = counter;

    return (
        <div className="container">
            <h1>Counter 1 {counter1}</h1>
            <h1>Counter 2 {counter2}</h1>
            <hr />

            <button className="btn btn-primary" onClick={() => {

                // setCounter( { counter1: ( counter1 + 1 ), counter2 } );

                // Si hubiera muchas propiedades es mejor usar el operador spread y no usar desestructuración en useState
                // spread coloca todas las propiedades primero incluida counter1 que luego sobreescribimos

                setCounter( { ...counter, counter1: ( counter1 + 1 ) } );

            }}>+1</button>
        </div>
    )

}
