import { shallow } from 'enzyme';
import { RealExampleRef } from '../../../components/04-useRef/RealExampleRef';


describe( 'Prueba de <RealExampleRef />', () => {

    test( 'debe mostrarse correctmente', () => {

        const wrapper = shallow( <RealExampleRef /> );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( 'MultipleCustomHooks' ).exists() ).toBeFalsy();
        
    } );

    test( 'debe mostrar el componente <MultipleCustomHooks />', () => {

        const wrapper = shallow( <RealExampleRef /> );

        // Con simulate simulamos eventos y como segundo argumento toma un objeto donde eviamos datos

        wrapper.find( 'button' ).at( 0 ).simulate( 'click', {} );

        const textoParrafo = wrapper.find( '.col' ).at( 0 ).text().trim();

        // console.log( textoParrafo );

        expect( textoParrafo ).toBe( '<MultipleCustomHooks />' );
        expect( wrapper.find( 'MultipleCustomHooks' ).exists() ).toBeTruthy();
        
    } );

    test( 'debe ocultar el componente <MultipleCustomHooks />', () => {

        const wrapper = shallow( <RealExampleRef /> );

        // Al simular el click de nuevo debería ocultar el componente

        wrapper.find( 'button' ).at( 0 ).simulate( 'click', {} );
        wrapper.find( 'button' ).at( 0 ).simulate( 'click', {} );

        const textoParrafo = wrapper.find( '.col' ).at( 0 ).text().trim();

        console.log( textoParrafo );

        expect( textoParrafo ).toBe( '' );
        expect( wrapper.find( 'MultipleCustomHooks' ).exists() ).toBeFalsy();
        
    } );
    
} );
