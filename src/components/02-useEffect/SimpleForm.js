import { useEffect, useState } from "react";
import { Message } from "./Message";

export const SimpleForm = () => {

    const [formState, setFormState] = useState( { name: '', email: '' } );

    const { name, email } = formState;

    useEffect( ()=>{

        console.log( 'hey!!' );

    }, [] );

    useEffect( ()=>{

        console.log( 'El estado del formulario ha cambiado' );

    }, [formState] );

    useEffect( ()=>{

        console.log( 'El estado del email ha cambiado' );

    }, [email] );

    /* const handleInputChange = ( e )=>{

        console.log( e.target );

    }; */

    // Desestructuramos

    const handleInputChange = ( { target } )=>{

        // console.log( target );

        // target.name es el atributo name del input, así podemos reutilizar la misma función para varios inputs

        setFormState( { ...formState, [target.name]: target.value } )

    };

    return (
        <div className="container">
            <h1>Simple Form</h1>
            <hr/>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                {/* Si establecemos el value así, necesitamos implementar el onChange */}
                <input className="form-control" type="text" name="name" autoComplete="off" value={name} onChange={handleInputChange} />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" name="email" autoComplete="off" value={email} onChange={handleInputChange} />
            </div>

            {( name === '123' ) && <Message />} 
        </div>
    );

};
