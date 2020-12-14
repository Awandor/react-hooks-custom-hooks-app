import { mount } from 'enzyme';
import { AppRouter } from '../../../components/09-useContext/AppRouter';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe( 'Prueba en <AppRouter />', () => {

    // Tenemos que crear un context de lo contrario falla

    const user = {
        id: '4321',
        name: 'Copérnico'
    };

    const wrapper = mount( <UserContext.Provider value={ { user: user } }><AppRouter /></UserContext.Provider> );
    
    test( 'Debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    } );
    
} );
