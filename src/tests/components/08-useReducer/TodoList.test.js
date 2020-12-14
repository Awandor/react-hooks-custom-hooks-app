import { shallow } from 'enzyme';
import { TodoList } from '../../../components/08-useReducer/TodoList';

import { demoTodos } from '../../fixtures/demoTodos';

describe( 'Pruebas de <TodoList />', () => {

    // const { id, desc } = demoTodos[0];

    const wrapper = shallow( <TodoList todos={demoTodos} handleToggle={() => { }} handleDelete={() => { }} /> );

    test( 'debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe tener dos <TodoListItem />', () => {

        const todoListItem = wrapper.find( 'TodoListItem' );

        console.log( 'TodoListItem: ', todoListItem ); // ShallowWrapper {}

        console.log( 'typeof: ', typeof todoListItem ); // Me dice que es un objeto, sin embargo es un arreglo?
        
        console.log( 'TodoListItem length: ', todoListItem.length );

        expect( todoListItem.length ).toBe( demoTodos.length );

    } );

    test( 'debe tener cada <TodoListItem /> una propiedad que es una función', () => {

        const todoListItem = wrapper.find( 'TodoListItem' );

        console.log( 'props: ', todoListItem.at( 0 ).props() );

        console.log( 'prop handleDelete: ', todoListItem.at( 0 ).prop( 'handleDelete' ) );

        expect( todoListItem.at( 0 ).prop( 'handleDelete' ) ).toEqual( expect.any( Function ) );
    
} );


} );
