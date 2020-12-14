import { mount } from 'enzyme';
import { LoginPage } from '../../../components/09-useContext/LoginPage';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe( 'Prueba en <LoginPage />', () => {

    // Tenemos que crear un context de lo contrario falla

    const setUser = jest.fn();

    const wrapper = mount( <UserContext.Provider value={ { setUser: setUser } }> <LoginPage /> </UserContext.Provider> );

    
    
    test( 'debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        
    } );

    test( 'debe ejecutarse setUser con el argumento esperado', () => {

        const algo = {
            id:3333,
            name: 'Anders'
        };

        wrapper.find( 'button' ).simulate( 'click' );

        console.log( 'button', wrapper.find( 'button' ) );

        expect( setUser ).toHaveBeenCalledWith( algo );
        
    } );
    
    
} );
