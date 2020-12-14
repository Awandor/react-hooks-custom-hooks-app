/* import { memo } from "react";

export const Small = memo( ( { value } ) => {

    console.log( 'Me han vuelto a llamar :(' );

    return (
        <small>{value}</small>
    );

} ); */

// Es más común verlo así

import React from 'react';

export const Small = React.memo( ( { value } ) => {

    console.log( 'Me han vuelto a llamar :(' );

    return (
        <small>{value}</small>
    );

} );
