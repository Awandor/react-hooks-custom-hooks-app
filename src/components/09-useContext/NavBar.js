import { Link, NavLink } from "react-router-dom"

export const NavBar = () => {

    /* return (
        <nav>
            <ul>
                <li>
                    <Link to="./">Home</Link>
                </li>
                <li>
                    <Link to="./about">About</Link>
                </li>
                <li>
                    <Link to="./login">Login</Link>
                </li>
            </ul>
        </nav>
    ); */

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link className="navbar-brand" to="./">useContext</Link>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="./">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="./about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="./login">Login</NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    );

};
