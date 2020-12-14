import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { NavBar } from './NavBar';

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <NavBar />
                
                <Switch>
                    <Route exact path="/about" component={AboutPage} />

                    <Route exact path="/login" component={LoginPage} />

                    {/* Se tiene que poner en último lugar de lo contrario se irá ahí siempre */}

                    <Route exact path="/" component={HomePage} />

                    {/* Aunque se puede poner el atributo exact y sólo se cumple si es exactamente y ya se podría poner en otro orden */}

                    <Route component={HomePage} />

                    {/* Funciona como el default de switch */}

                    {/* Otra manera de hacerlo es con Redirect */}

                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    );

};
