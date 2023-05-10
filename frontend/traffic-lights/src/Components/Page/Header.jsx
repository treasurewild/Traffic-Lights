import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo.svg';
import { Navbar, Button } from 'react-bootstrap';


const Header = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const logOut = () => {

        localStorage.clear();
        navigate('/');
    }

    return (
        <Navbar className="header d-flex justify-content-between navbar bg-light p-2">
            <Navbar.Brand className="navbar-brand" href="/">
                <img src={logo} alt="Logo" width="90" height="30" className="d-inline-block align-text-top" />
                Traffic Lights
            </Navbar.Brand>
            {user?.accessToken &&
                <div>
                    <Navbar.Text>You are logged in as: <strong>{user.name} </strong></Navbar.Text>
                    <Button variant='secondary' size='sm' onClick={logOut}>Log Out</Button>
                </div>
            }
        </Navbar>
    )
}

export default Header