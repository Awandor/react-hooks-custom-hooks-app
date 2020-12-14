import { useLayoutEffect, useRef, useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { useFetch } from "../../hooks/useFetch";

import './layoutEffect.css';

export const LayoutEffect = () => {

    const { counter, increment } = useCounter( 1 );

    console.log( 'Counter', counter );

    const url = `https://www.breakingbadapi.com/api/quotes/${counter}`;

    const { data } = useFetch( url );

    // console.log( loading );

    // console.log( 'data:', data[0].quote ); // error

    // El problema es que el estado inicial de data es null y null[0] da error, hay que validar

    const { quote } = !!data && data[0]; // !!data -> si es true entonces retorna data[0]

    // Transformamos null en booleano null = null, !null = true, !!null = false
    // Si es falso no continúa evaluando y author y quote tendrán valor undefined

    const parrafo = useRef();

    const [ boxSize, setBoxSize ] = useState( {} );

    useLayoutEffect( () => {
        
        console.log( parrafo.current.getBoundingClientRect() );

        setBoxSize( parrafo.current.getBoundingClientRect() );
        
    }, [ quote ] );

    // cada vez que cambia quote se obtienen los datos cambiantes del tag p que tiene la referencia seteada

    return (
        <div className="container">
            <h1>Layout Effect</h1>
            <hr />

            <blockquote className="blockquote text-right">
                <p ref={parrafo} className="mb-0">{quote}</p>
            </blockquote>

            <button type="button" className="btn btn-outline-primary" onClick={() => {

                increment( 1 );

            }}>Next quote</button>

            <pre className="mt-5">{JSON.stringify( boxSize, null, 3 )}</pre>

        </div>
    );

};
