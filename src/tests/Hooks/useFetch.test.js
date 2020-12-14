import { useFetch } from '../../hooks/useFetch'
import { renderHook } from '@testing-library/react-hooks';

describe( 'Prueba de useFetch', () => {

    test( 'debe retornar los datos por defecto', () => {

        // Hay que renderizar el Hook, usamos renderHook

        const url = `https://www.breakingbadapi.com/api/quotes/1`;

        const { result } = renderHook( () => useFetch( url ) );

        // Como no esperamos a obtener resultados y lo hacemos de manera síncrona debemos obtener los valores por defecto

        const { data, loading, error } = result.current;

        // console.log( data );

        expect( data ).toBe( null );
        expect( loading ).toBe( true );
        expect( loading ).toBeTruthy();
        expect( error ).toBe( null );

    } );

    test( 'debe retornar los datos esperados', async() => {

        // Hay que renderizar el Hook, usamos renderHook

        const url = `https://www.breakingbadapi.com/api/quotes/1`;

        // Es asíncrono así que usamos waitForNextUpdate que retorna una promesa por lo que podemos usar async y await

        const { result, waitForNextUpdate } = renderHook( () => useFetch( url ) );

        await waitForNextUpdate();

        const { data, loading, error } = result.current;

        // console.log( data );

        const { quote_id, quote, author, series } = data[0];

        // console.log( 'typeof: ', typeof quote_id );

        expect( data.length ).toBe( 1 );
        expect( typeof quote_id ).toBe( 'number' );
        expect( quote_id ).toBe( 1 );
        expect( loading ).toBe( false );
        expect( loading ).toBeFalsy();

        expect( error ).toBe( null );

    } );

    test( 'debe retornar mensaje de error al fallar', async() => {

        // Vamos a usar una api que retorna errores

        const url = `https://reqres.in/api99/users?page=2`;

        // Es asíncrono así que usamos waitForNextUpdate que retorna una promesa por lo que podemos usar async y await

        const { result, waitForNextUpdate } = renderHook( () => useFetch( url ) );

        await waitForNextUpdate();

        const { data, error, loading } = result.current;

        console.log( loading );

        expect( data ).toBe( null );
        expect( loading ).toBe( false );
        expect( loading ).toBeFalsy();

        expect( error ).toBe( 'No se pudo cargar los datos' );

    } );


} );
