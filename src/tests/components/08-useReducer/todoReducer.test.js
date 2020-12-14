import { todoReducer } from '../../../components/08-useReducer/todoReducer';

/* const demoTodos = [ {
    id: 1,
    desc: 'Aprender React',
    done: false
  },
  {
    id: 2,
    desc: 'Aprender Mongo',
    done: false
  }
]; */

// Como lo vamos a reutilizar en otras pruebas lo modulamos

import { demoTodos } from '../../fixtures/demoTodos';

describe( 'Prueba de todoReducer', () => {

  test( 'debe retornar el estado por defecto', () => {

    const state = todoReducer( demoTodos, {} ); // enviamos una acción vacía para ver el resultado por defecto

    expect( state ).toEqual( demoTodos );

  } );

  test( 'debe añadir un TODO', () => {

    const action = {
      type: 'add',
      payload: {
        id: 3,
        desc: 'Aprender Ionic',
        done: false
      }
    };

    const state = todoReducer( demoTodos, action ); // enviamos una acción nueva

    expect( state ).toEqual( [ ...demoTodos, action.payload ] );

  } );

  test( 'debe borrar un TODO', () => {

    const action = {
      type: 'delete',
      payload: 2
    };

    const state = todoReducer( demoTodos, action ); // enviamos una acción nueva

    // console.log( state );

    // filter retorna un nuevo arreglo

    expect( state ).toEqual( demoTodos.filter( todo => todo.id !== action.payload ) );

  } );

  test( 'debe cambiar el valor de done a true', () => {

    const action = {
      type: 'toggle',
      payload: 1
    };

    const state = todoReducer( demoTodos, action ); // enviamos una acción nueva

    // console.log( state.filter( todo => todo.id === action.payload ) );

    const todo = state.filter( todo => todo.id === action.payload );

    expect( todo[ 0 ].done ).toBeTruthy();
    expect( demoTodos[ 1 ].done ).toBeFalsy();

  } );

  test( 'debe cambiar el valor de done a false', () => {

    const action = {
      type: 'toggle',
      payload: 1
    };

    // Vamos a forzar el estado inicial a que el primer objeto tenga done true

    demoTodos[ 0 ].done = true;

    const state = todoReducer( demoTodos, action ); // enviamos una acción nueva

    // state = todoReducer( demoTodos, action ); // NO funciona invocar más de una vez la función

    console.log( '2', state.filter( todo => todo.id === action.payload ) );

    const todo = state.filter( todo => todo.id === action.payload );

    expect( todo[ 0 ].done ).toBeFalsy();

  } );

} );
