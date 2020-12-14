import { useForm } from '../../hooks/useForm'
import { renderHook, act } from '@testing-library/react-hooks';

describe( 'Pruebas de custom Hook useForm', () => {

  test( 'Debe retornar valores por defecto un objeto vacío y 2 funciones', () => {

    // Hay que renderizar el Hook, usamos renderHook

    const { result } = renderHook( () => useForm() );

    // Como no le mandamos ningún argumento a useForm debería retornar un objeto vacío y 2 funciones

    // console.log( result.current );

    const [ formValues, HandleInputChange, reset ] = result.current;

    expect( formValues ).toStrictEqual( {} );
    expect( typeof HandleInputChange ).toBe( 'function' );
    expect( typeof reset ).toBe( 'function' );

  } );

  const initialState = {
    name: 'Dan Häggblom',
    email: 'test@test.es'
  };

  test( 'Debe retornar objeto con datos', () => {

    const { result } = renderHook( () => useForm( initialState ) );

    // console.log( result.current );

    expect( result.current[ 0 ] ).toStrictEqual( {
      name: 'Dan Häggblom',
      email: 'test@test.es'
    } );

  } );

  // Vamos a probar que las funciones funcionan correctamente

  test( 'Debe de cambiar el nombre', () => {

    // Hay que renderizar el Hook, usamos renderHook

    const { result } = renderHook( () => useForm( initialState ) );

    // console.log( result.current );

    const [ , handleInputChange ] = result.current;

    // Para poder ejecutar funciones dentro del test usamos act

    act( () => {

      const evento = {
        target: {
          name: 'name',
          value: 'Perico de los Palotes'
        }
      };

      handleInputChange( evento ); // OJO recibe un evento

    } );

    const [ formValues ] = result.current;

    // console.log( 'formValues', formValues );

    expect( formValues ).toStrictEqual( {
      name: 'Perico de los Palotes',
      email: 'test@test.es'
    } );

    // Otra manera 

    expect( formValues ).toStrictEqual( {...initialState, name: 'Perico de los Palotes' } );

  } );

  test( 'Debe de restablecer los valores iniciales después de cambiarlos', () => {

    const { result } = renderHook( () => useForm( initialState ) );

    const [ , handleInputChange, reset ] = result.current;

    // Para poder ejecutar funciones dentro del test usamos act

    act( () => {

      const evento = {
        target: {
          name: 'name',
          value: 'Perico de los Palotes'
        }
      };

      handleInputChange( evento ); // OJO recibe un evento

      reset();

    } );

    const [ formValues ] = result.current;

    // console.log( 'formValues', formValues );

    expect( formValues ).toStrictEqual( {
      name: 'Dan Häggblom',
      email: 'test@test.es'
    } );

    // Otra manera

    expect( formValues ).toStrictEqual( initialState );

  } );

} );
