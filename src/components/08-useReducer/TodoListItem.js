export const TodoListItem = ( { index, todo, handleToggle, handleDelete } ) => {

    console.log( '  Me volví a generar :(  ' );

    return (
        <li key={todo.id} className="list-group-item">
            <span className={ `${todo.done && 'complete'}` } onClick={() => handleToggle( todo.id )}>{index + 1}. {todo.desc}</span>
            <button className="btn button-small btn-danger" onClick={() => handleDelete( todo.id )}>Borrar</button>
        </li>
    );

};
