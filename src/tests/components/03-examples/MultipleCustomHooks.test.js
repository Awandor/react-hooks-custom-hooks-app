import { MultipleCustomHooks } from '../../../components/03-examples/MultipleCustomHooks'
import { shallow } from 'enzyme';
import { useFetch } from '../../../hooks/useFetch';
import { useCounter } from '../../../hooks/useCounter';

jest.mock( '../../../hooks/useFetch' );
jest.mock( '../../../hooks/useCounter' );

// Podríamos falsear los datos de otros custom Hooks de la misma manera


describe( 'Prueba de <MultipleCustomHooks />', () => {

    // Como useCounter no lo vamos a alterar, definimos el mock antes de cada test con beforeEach

    beforeEach( () => {

        useCounter.mockReturnValue( {
            counter: 10,
            increment: () => { }
        } );
    
    } );

    test( 'debe mostrarse correctamente', () => {

        useFetch.mockReturnValue( {
            data: null,
            loading: true,
            error: null
        } );

        const wrapper = shallow( <MultipleCustomHooks /> );

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe mostrar los datos', () => {

        // Vamos a empezar por el custom Hook useFetch, pero vamos a decirle a Jest que no queremos comprobar
        // si useFetch funciona, ya lo hemos comprobado, sólo nos interesa la información que va a retornar

        // Para ello vamos a pasar useFetch por un mock, esto hace que en ESTE ARCHIVO cuando use useFetch
        // va a utilizar unaimplementación que me voy a inventar, como es en este archivo tengo que implementarlo
        // también en la prueba anterior

        useFetch.mockReturnValue( {
            data: [ {
                author: 'Dan Häggblom',
                quote: 'Hola mundo'
            } ],
            loading: false,
            error: null
        } );

        const wrapper = shallow( <MultipleCustomHooks /> );

        // En vez de tomar una foto podemos buscar por elementos HTML

        expect( wrapper.find( '.alert' ).exists() ).toBeFalsy();
        expect( wrapper.find( '.mb-0' ).exists() ).toBeTruthy();
        expect( wrapper.find( '.mb-0' ).text().trim() ).toBe( 'Hola mundo' );
        expect( wrapper.find( 'footer' ).text().trim() ).toBe( 'Dan Häggblom' );

        // expect( wrapper ).toMatchSnapshot();

    } );

} );
