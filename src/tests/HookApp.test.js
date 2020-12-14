import { HookApp } from '../HookApp';
import { shallow } from 'enzyme';

// import { render } from '@testing-library/react';

describe( 'Pruebas en <HookApp />', () => {

    // Este test se hace con Enzyme

    test( 'debe mostrar <HookApp /> correctamente', () => {

        // const expected = 'Hola mundo';

        const wrapper = shallow( <HookApp /> );

        expect( wrapper ).toMatchSnapshot();

    } );








    /* // Este test requiere @testing-library/jest-dom/extend-expect en setupTest,js

    test( 'debe de renderizar "Hola soy Goku" en pantalla', () => {

        const expected = 'Hola soy Goku';

        // Vamos a renderizar lo que devuelve el componente

        const wrapper = render( <PrimeraApp goku={expected} /> );

        expect( wrapper.getByText( expected ) ).toBeInTheDocument();

    } );

    

    test( 'debe mostrar numeros enviados por props', () => {

        const expected = 'Hola soy Goku';

        const num = 123;

        const wrapper = shallow( <PrimeraApp goku={expected} numeros={num} /> );

        let textoParrafo = wrapper.find( 'p' ).text();

        textoParrafo = Number( textoParrafo );

        console.log( textoParrafo );

        expect( textoParrafo ).toBe( num );

    } ); */

} );





