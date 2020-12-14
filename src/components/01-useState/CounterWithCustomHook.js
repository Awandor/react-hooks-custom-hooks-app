import { useCounter } from "../../hooks/useCounter"

export const CounterWithCustomHook = () => {

    const { state, increment, decrement, reset } = useCounter();

    return (
        <div className="container">
            <h1>Counter with custom Hook: {state}</h1>
            <hr />

            <button className="btn btn-primary" onClick={() => {

                increment( 1 );

            }}>+1</button>

            <button className="btn btn-primary ml-4" onClick={() => {

                decrement( 1 );

            }}>-1</button>

            <button className="btn btn-primary ml-4" onClick={() => {

            reset();

            }}>reset</button>

            {/* Si no mando argumentos a la función no hace falta el callback */}

            <button className="btn btn-primary ml-4" onClick={reset}>reset sin argumento</button>
        </div>
    )

}
