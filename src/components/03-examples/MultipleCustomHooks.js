import { useCounter } from "../../hooks/useCounter";
import { useFetch } from "../../hooks/useFetch";

export const MultipleCustomHooks = () => {

    const { counter, increment } = useCounter( 1 );

    console.log( 'Counter', counter );

    const url = `https://www.breakingbadapi.com/api/quotes/${counter}`;

    const { loading, data, error } = useFetch( url );

    // console.log( loading );

    // console.log( 'data:', data[0].quote ); // error

    // El problema es que el estado inicial de data es null y null[0] da error, hay que validar

    const { author, quote } = !!data && data[0]; // !!data -> si es true entonces retorna data[0]

    // Transformamos null en booleano null = null, !null = true, !!null = false
    // Si es falso no continúa evaluando y author y quote tendrán valor undefined

    return (
        <div className="container">
            <h1>Breaking Bad Quotes</h1>
            <hr />

            {
                loading ? ( <div className="alert alert-info text-center">Loading...</div> )
                    : ( <blockquote className="blockquote text-right"><p className="mb-0">{quote}</p><footer className="blockquote-footer">{author}</footer></blockquote> )
            }

            <button type="button" className="btn btn-outline-primary" onClick={() => {

                increment( 1 );

            }}>Next quote</button>

        </div>
    );

};
