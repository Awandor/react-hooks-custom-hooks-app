import { useState } from "react";
import { MultipleCustomHooks } from "../03-examples/MultipleCustomHooks"

export const RealExampleRef = () => {

    const [ show, setShow ] = useState( false );

    return (
        <div className="container">
            <h1>Real Example useRef</h1>
            <hr />
            <div className="row">
                <div className="col">
                    {show && <MultipleCustomHooks />}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={() => {

                        setShow( !show );

                    }}>Toggle show</button>
                </div>
            </div>
        </div>
    );

};
