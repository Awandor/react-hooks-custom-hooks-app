import { useForm } from "../../hooks/useForm";

export const TodoAdd = ( { handleAddTodo } ) => {

    const [ { description }, handleInputChange, resetForm ] = useForm( {
        description: '' // tiene que ser el nombre del input
    } );

    const handleSubmit = ( e ) => {

        e.preventDefault(); // evitar el refresco de la página

        if( description.trim().length <= 1 ){

            return;
        
        }

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        handleAddTodo( newTodo );

        resetForm();

    };

    return (
        <>
            <h4>Agregar TODO</h4>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="text" name="description" placeholder="Algo" autoComplete="off" value={description} onChange={handleInputChange} />

                <button className="btn btn-success mt-2 btn-block" type="submit">Agregar</button>
            </form>
        </>
    );

};
