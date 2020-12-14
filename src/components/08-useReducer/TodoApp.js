import { /* useCallback, */ useEffect, useReducer } from 'react';
import './styles.css';
import { todoReducer } from './todoReducer';

// import { useForm } from '../../hooks/useForm';
import { TodoList } from './TodoList';
import { TodoAdd } from './TodoAdd';

/* const initialState = [ {
    id: new Date().getTime(),
    desc: 'Aprender React',
    done: false
} ]; */

const init = () =>{

    /* return [ {
        id: new Date().getTime(),
        desc: 'Aprender React',
        done: false
    } ]; */

    return JSON.parse( localStorage.getItem( 'todos' ) ) || []; // para manejar el null

};

export const TodoApp = () => {

    // 1. Creamos el useReducer
    // reducer el la función reducer vista anteriormente
    // initialstate es el estado inicial que podemos mandar
    // init es una función para inicializar el state en caso de que ese state sea procesado o haga varias acciones, vamos a hacerlo con y sin init
    // dispatch ejecuta acciones hacia el reducer, si hacemos cambios en el state React reacciona redibujando en pantalla el cambio

    // const [state, dispatch] = useReducer(reducer, initialState, init);

    // 2. Empezamos de manera más sencilla y creamos initialState fuera del componente

    // 3. El reducer lo creamos en un archivo independiente pues puede crecer mucho

    // 4. En la desestructuración ponemos nombre todos

    // const [ todos, dispatch ] = useReducer( todoReducer, initialState );
    const [ todos, dispatch ] = useReducer( todoReducer, [], init );

    // console.log( 'todos', todos );

    // custmo Hook useForm, handleInputChange lo colocamos en el input

    /* const [ formValues, handleInputChange ] = useForm( {
        description: ''
    } ); */

    // console.log( 'formValues', formValues );

    // Como formValues es un objeto con la propiedad description podemos aplicar desestructuración

    /* const [ { description }, handleInputChange, resetForm ] = useForm( {
        description: '' // tiene que ser el nombre del input
    } ); */

    // Nos lo llevamos a TodoApp.js

    useEffect( ()=>{

        // localStorage sólo guarda strings

        localStorage.setItem( 'todos', JSON.stringify( todos ) );

    }, [ todos ] );


    // console.log( 'description', description ); // Se lo aplicamos al value del input

    /* const handleSubmit = ( e ) => {

        e.preventDefault(); // evitar el refresco de la página

        // Validamos que haya contenido

        if( description.trim().length <= 1 ){

            return;
        
        }

        console.log( description );

        // Objeto nueva tarea

        const newTodo = {
            id: new Date().getTime(),

            // desc: 'Nueva tarea',
            desc: description, // podemos establecerlo directamente porque cada vez que se hace un cambio React vuelve a ejecutar TodoApp
            done: false
        }

        // Acción que se envía al reducer

        const action = {
            type: 'add',
            payload: newTodo
        };

        dispatch( action );

        resetForm();

    } */

    const handleDelete = ( todoId ) => {

        console.log( 'handleDelete', todoId );

        const action = {
            type: 'delete',
            payload: todoId
        };

        dispatch( action );

    };

    const handleToggle = ( todoId ) => {

        console.log( 'handleToggle', todoId );

        const action = {
            type: 'toggle',
            payload: todoId
        };

        dispatch( action );

    };

    // Parece que no hace falta usar useCallback

    /* const handleDelete = useCallback(
        ( todoId ) => {

            dispatch( { type: 'delete', payload: todoId } );

        },
        [ ]
    );

    const handleToggle = useCallback(
        ( todoId ) => {

            dispatch( { type: 'toggle', payload: todoId } );

        },
        [ ]
    ); */

    const handleAddTodo = ( newTodo )=>{

        dispatch( { type:'add', payload: newTodo } );

    };

    return (
        <div className="container">
            <h1>Todo App</h1>
            <hr />

            <h2 className="mb-3">Nº de tareas <small>{todos.length}</small></h2>

            <div className="row">
                <div className="col-7">

                    {/* <ul className="list-group list-group-flush">
                        {
                            todos.map( ( todo, i ) => (
                                <li key={todo.id} className="list-group-item">
                                    <span className={ `${todo.done && 'complete'}` } onClick={() => handleToggle( todo.id )}>{i + 1}. {todo.desc}</span>
                                    <button className="btn button-small btn-danger" onClick={() => handleDelete( todo.id )}>Borrar</button>
                                </li>
                            ) )
                        }
                    </ul> */}

                    <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />

                </div>
                <div className="col-5 text-center">
                    {/* <h4>Agregar TODO</h4>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="description" placeholder="Algo" autoComplete="off" value={description} onChange={handleInputChange} />

                        <button className="btn btn-success mt-2 btn-block" type="submit">Agregar</button>
                    </form> */}

                    <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
        </div>
    );

};
