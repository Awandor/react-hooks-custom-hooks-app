// Creamos un estado inicial

const initialState = [ {
  id: 1,
  todo: 'Comprar pan',
  done: false
} ];

// Creamos un reducer, que recibe el state y la acción que va a modificar el state y por defecto siempre vamos a retornar el state
// al argumento state le damos por defecto el valor de initialState

const todoReducer = ( state = initialState, action ) => {

  // La primera vez que se ejecuta no hay action por lo que debemos ponerla como opcional en el if

  if ( action?.type === 'agregar' ) {

    // Esta acción no puede ser asíncrona ni depender de cosas externas tiene que resolverse con lo que se tiene internamente

    return [ ...state, action.payload ];

  }

  return state;

}

// Esto es un reducer porque retorna algo

let todos = todoReducer();

// Supongamos que quiero añadir un todo al arreglo de todos

// No podemos usar push porque modificaría el arreglo y por tanto modificaría el state

// En general no se usa push cuando trabajamos con React

const newTodo = {
  id: 2,
  todo: 'lavar el coche',
  done: false
};

// Vamos a enviar el newTodo como acción a todoReducer, no lo hacemos diréctamente sino a través de un objeto

const agregarTodoAction = {
  type: 'agregar', // siempre tiene que tener la propiedad type
  // newTodo
  payload: newTodo // se puede poner cualquier nombre a la propiedad pero es habitual payload o el mismo objeto
};

todos = todoReducer( todos, agregarTodoAction );

console.log( todos );
