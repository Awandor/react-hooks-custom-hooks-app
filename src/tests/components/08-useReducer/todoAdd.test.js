import { shallow } from 'enzyme';
import { TodoAdd } from '../../../components/08-useReducer/TodoAdd';

describe( 'Prueba de <todoAdd />', () => {

    const handleAddTodo = jest.fn();

    const wrapper = shallow( <TodoAdd handleAddTodo={handleAddTodo} /> );

    test( 'debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        
    } );

    test( 'NO debe disparar handleAddTodo', () => {

        // Vamos a simular el submit del formulario, se puede hacer de varias maneras

        const submitForm = wrapper.find( 'form' ).prop( 'onSubmit' );

        // wrapper.find( 'button' ).at( 0 ).simulate( 'click', {} );

        submitForm( { preventDefault(){} } ); // Le mandamos un evento fake para que no de error

        expect( handleAddTodo ).toHaveBeenCalledTimes( 0 );
        
    } );

    test( 'debe disparar handleAddTodo', () => {

        // Vamos a simular el submit del formulario con contenido en el input

        const valor = 'Aprender Node';

        wrapper.find( 'input' ).simulate( 'change', {
            target: {
                value: valor,
                name: 'description'
            }
        } );

        const submitForm = wrapper.find( 'form' ).prop( 'onSubmit' );

        submitForm( { preventDefault(){} } ); // Le mandamos un evento fake para que no de error

        expect( handleAddTodo ).toHaveBeenCalled();

        // Para evaluar que la función haya sido disparada con un argumento

        expect( handleAddTodo ).toHaveBeenCalledWith( expect.any( Object ) );

        // Vamos a precisar más

        expect( handleAddTodo ).toHaveBeenCalledWith( {
            id: expect.any( Number ), // Así evitamos el problema de la generación del id con la fecha
            desc: valor,
            done: false
        } );

        // Reset del formulario

        expect( wrapper.find( 'input' ).prop( 'value' ) ).toBe( '' );
        
    } );
    
} );
