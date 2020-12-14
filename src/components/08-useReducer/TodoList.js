import { TodoListItem } from "./TodoListItem";

export const TodoList = ( { todos, handleToggle, handleDelete } ) => {

    // console.log( 'TodoList', todos );
    // console.log( 'handleToggle', handleToggle );

    return (
        <ul className="list-group list-group-flush">
            {

                /* todos.map( ( todo, i ) => (
                    <li key={todo.id} className="list-group-item">
                        <span className={ `${todo.done && 'complete'}` } onClick={() => handleToggle( todo.id )}>{i + 1}. {todo.desc}</span>
                        <button className="btn button-small btn-danger" onClick={() => handleDelete( todo.id )}>Borrar</button>
                    </li>
                ) ) */

                todos.map( ( todo, i ) => <TodoListItem key={todo.id} index={i} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} /> )
            }
        </ul>
    );

};
