import { useCounter } from '../../hooks/useCounter'
import { renderHook, act } from '@testing-library/react-hooks';

describe( 'Pruebas de custom Hook useCounter', () => {

    test( 'Debe retornar valores por defecto un número y 3 funciones', () => {

        // Hay que renderizar el Hook, usamos renderHook

        const { result } = renderHook( () => useCounter() );

        // Como no le mandamos ningún argumento a useCounter debería retornar el valor por defecto que es 1

        // console.log( result.current );

        expect( result.current.counter ).toBe( 1 );
        expect( typeof result.current.increment ).toBe( 'function' );
        expect( typeof result.current.decrement ).toBe( 'function' );
        expect( typeof result.current.reset ).toBe( 'function' );

    } );

    test( 'Debe retornar valor counter correcto', () => {

        const { result } = renderHook( () => useCounter( 100 ) );

        // Como le mandamos argumento a useCounter debería retornar el valor que es 100

        expect( result.current.counter ).toBe( 100 );

    } );

    // Vamos a probar que las funciones funcionan correctamente

    test( 'Debe incrementar el counter en 1 por defecto', () => {

        // Hay que renderizar el Hook, usamos renderHook

        const { result } = renderHook( () => useCounter( 100 ) );

        const { increment } = result.current;

        // Para poder ejecutar funciones dentro del test usamos act

        act( ()=>{

            increment();

            // Como no le mandamos ningún argumento a increment debería usar el valor por defecto que es 1 e incrementar counter en 1

        } );

        const { counter } = result.current;

        expect( counter ).toBe( 101 );
        
    } );

    test( 'Debe incrementar el counter con el valor que pasamos como argumento', () => {

        const { result } = renderHook( () => useCounter( 100 ) );

        const { increment } = result.current;

        act( ()=>{

            increment( 10 );

        } );

        const { counter } = result.current;

        expect( counter ).toBe( 110 );
        
    } );
    
    test( 'Debe disminuir el counter en 1 por defecto', () => {

        const { result } = renderHook( () => useCounter( 100 ) );

        const { decrement } = result.current;

        act( ()=>{

            decrement();

        } );

        const { counter } = result.current;

        expect( counter ).toBe( 99 );
        
    } );

    test( 'Debe disminuir el counter con el valor que pasamos como argumento', () => {

        const { result } = renderHook( () => useCounter( 100 ) );

        const { decrement } = result.current;

        act( ()=>{

            decrement( 10 );

        } );

        const { counter } = result.current;

        expect( counter ).toBe( 90 );
        
    } );

    test( 'Debe resetear el counter a su valor inicial después de haber cambiado', () => {

        const { result } = renderHook( () => useCounter( 100 ) );

        const { decrement, reset } = result.current;

        act( ()=>{

            decrement( 10 ); // Ahora counter vale 90

            decrement( 10 ); // counter sigue valiendo 90, no se ejecuta dos veces dentro de act, ver documentación

            reset(); // Ahora counter debe valer 100

        } );

        const { counter } = result.current;

        expect( counter ).toBe( 100 );
        
    } );


} );
