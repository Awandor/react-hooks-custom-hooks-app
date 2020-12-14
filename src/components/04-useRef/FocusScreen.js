import { useRef } from "react";

export const FocusScreen = () => {

    const inputRef = useRef( /* initialValue */ );

    const handleClick = ( e )=>{

        // document.querySelector( 'input' ).focus();

        // document.querySelector( 'input' ).select(); // Pone el foco al seleccionar lo escrito

        // Con el inputRef ya puedo acceder al elemento

        inputRef.current.select();

    };
    
    return (
        <div className="container">
            <h1>Focus Screen</h1>
            <hr/>

            <div className="form-group">
                <label>Nombre</label>
                <input ref={inputRef} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={handleClick}>Focus</button>
            </div>
        </div>
    );

};
