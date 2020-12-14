import { useEffect, useState } from "react"

export const Message = () => {

    // Vamos a pintar en pantalla las coordenadas por lo que usamos useState

    const [coords, setCoords] = useState( { x: 0, y: 0 } );

    const{ x, y } = coords;

    useEffect( () => {

        console.log( 'Componente Message montado' );

        const mouseMove = ( e ) => {

            const coords2 = { x: e.x, y: e.y };

            setCoords( coords2 );

            console.log( coords2 ); // Se sigue ejecutando aunque el componente se desmonte

            // Si el componente se monta de nuevo tendré 2 listeners ejecutandose y así sucesivamente

        };

        window.addEventListener( 'mousemove', mouseMove );

        return () => {

            console.log( 'Componente Message desmontado' );

            // Tenemos que quitar el listener

            window.removeEventListener( 'mousemove', mouseMove );

        }

    }, [] );

    return (
        <div>
            <h3>Eres genial!</h3>
            <p>x: {x} | y: {y}</p>
        </div>
    );

};
