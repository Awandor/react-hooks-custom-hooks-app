// import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export const FormWithCustomHook = () => {

    // const [formState, setFormState] = useState( { name: '', email: '', password: '' } );

    const [ formValues, handleInputChange ] = useForm( { name: '', email: '', password: '' } );

    // const { name, email, password } = formState;

    const { name, email, password } = formValues;

    useEffect( () => {

        console.log( 'email ha cambiado' );

    }, [ email ] );

    // Desestructuramos

    /* const handleInputChange = ( { target } )=>{

        // console.log( target );

        // target.name es el atributo name del input, así podemos reutilizar la misma función para varios inputs

        setFormState( { ...formState, [target.name]: target.value } )

    }; */

    const handleSubmit = ( e ) => {

        e.preventDefault();

        console.log( formValues );

    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Form with custom Hook</h1>
                <hr />

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    {/* Si establecemos el value así, necesitamos implementar el onChange */}
                    <input className="form-control" type="text" name="name" autoComplete="off" value={name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" autoComplete="off" value={email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" autoComplete="off" value={password} onChange={handleInputChange} />
                </div>

                <button className="btn btn-primary" type="submit">Guardar</button>
            </form>
        </div>
    );

};
