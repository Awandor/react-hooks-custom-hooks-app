export const todoReducer = ( state = [], action ) => {

  switch ( action.type ) {
    case 'add':
      return [ ...state, action.payload ];

      // break; // No hace falta break porque retornamos

    case 'delete':

      // console.log( action.payload );

      // filter retorna un nuevo arreglo

      return state.filter( todo => todo.id !== action.payload );

    case 'toggle':

      /* return state.map( todo => {

        if ( todo.id === action.payload ) {

          return {...todo, done: !todo.done };

        } else {

          return todo; // Si no retornamos nada el map va a retornar undefined

        }

      } ); */

      return state.map( todo => ( todo.id === action.payload ) ? {...todo, done: !todo.done } : todo );

    default:
      return state; // si no hay acción retorna el estado
  }

};
