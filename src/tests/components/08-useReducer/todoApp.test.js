import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { TodoApp } from '../../../components/08-useReducer/TodoApp';
import { demoTodos } from '../../fixtures/demoTodos';

describe( 'Prueba en <TodoApp />', () => {

    const wrapper = shallow( <TodoApp /> );

    Storage.prototype.setItem = jest.fn();

    test( 'debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe agregar un TODO', () => {

        // Esto ya ha sido probado pero lo necesitamos para evaluar otras cosas como el local storage

        // Vamos a usar mount en vex de shallow, shallow es básico y se centra en el componente, mount
        // va más allá y tiene en cuenta los componente hijos y el entorno

        // Aunque funciona igual con shallow

        const wrapper2 = mount( <TodoApp /> );

        const addTodo = wrapper2.find( 'TodoAdd' ).prop( 'handleAddTodo' );

        // Tenemos que envolver addTodo con act pues estamos cambiando el state

        act( () => {

            addTodo( demoTodos[0] );

            addTodo( demoTodos[1] );

        } );

        expect( wrapper2.find( 'h2' ).text().trim() ).toBe( 'Nº de tareas 2' );

        expect( localStorage.setItem ).toHaveBeenCalledTimes( 2 ); // Parece que es llamado 1 vez al iniciarse el componente

    } );

    test( 'debe eliminar un TODO', () => {

        // Usamos el wrapper original con shallow y funciona igualmente

        const addTodo = wrapper.find( 'TodoAdd' ).prop( 'handleAddTodo' );

        addTodo( demoTodos[0] );

        const deleteTodo = wrapper.find( 'TodoList' ).prop( 'handleDelete' );

        deleteTodo( demoTodos[0].id );

        expect( wrapper.find( 'h2' ).text().trim() ).toBe( 'Nº de tareas 0' );

    } );



} );
