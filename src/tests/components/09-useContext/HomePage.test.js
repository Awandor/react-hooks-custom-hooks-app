import { mount } from 'enzyme';
import { HomePage } from '../../../components/09-useContext/HomePage';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe( 'Prueba en <HomePage />', () => {

    // const wrapper = shallow( <HomePage /> );

    // Tenemos que crear un context de lo contrario falla

    const user = {
        name: 'Albert Einstein',
        email: 'test@test.es'
    };


    // const wrapper = shallow( <UserContext.Provider value={ { user: user } }> <HomePage /> </UserContext.Provider> );

    const wrapper = mount( <UserContext.Provider value={ { user: user } }> <HomePage /> </UserContext.Provider> );

    test( 'debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

        // Si revisamos el snapshot no vemos el contenido de HomePage, esto es porque usamos shallow y sólo muestra el
        // componente y no sus hijos y aquí el componente principal es <UserContext.Provider> que envuelve a <HomePage />
        
    } );
    
    
} );
