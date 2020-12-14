import { shallow } from 'enzyme';
import { TodoListItem } from '../../../components/08-useReducer/TodoListItem';

import { demoTodos } from '../../fixtures/demoTodos';

describe( 'Pruebas en <TodoListItem />', () => {

    // Usamos el método fn() de Jest para decir que es una función y saber varias cosas, si fue llamada, cuántas veces, etc

    const handleDelete = jest.fn();

    const handleToggle = jest.fn();

    const { id, desc } = demoTodos[0];

    const wrapper = shallow( <TodoListItem key={id} index={0} todo={demoTodos[0]} handleToggle={handleToggle} handleDelete={handleDelete} /> );

    test( 'Debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe llamar la función borrar', () => {

        // Con simulate simulamos eventos y como segundo argumento toma un objeto donde eviamos datos

        wrapper.find( 'button' ).at( 0 ).simulate( 'click', {} );

        expect( handleDelete ).toHaveBeenCalledWith( demoTodos[0].id );

    } );

    test( 'debe llamar la función toggle', () => {

        // Con simulate simulamos eventos y como segundo argumento toma un objeto donde enviamos datos

        wrapper.find( 'span' ).at( 0 ).simulate( 'click', {} );

        expect( handleToggle ).toHaveBeenCalledWith( demoTodos[0].id );

    } );

    test( 'debe mostrar el texto correctamente', () => {

        const text = wrapper.find( 'span' ).at( 0 ).text().trim();

        // console.log( text );

        expect( text ).toBe( `1. ${desc}` );

    } );

    test( 'debe mostrar la clase complete', () => {

        demoTodos[0].done = true;

        const wrapper2 = shallow( <TodoListItem key={id} index={0} todo={demoTodos[0]} handleToggle={handleToggle} handleDelete={handleDelete} /> );

        const text = wrapper2.find( 'span' ).at( 0 );

        // console.log( 'span: ', text );

        expect( text.hasClass( 'complete' ) ).toBeTruthy();

    } );

} );
