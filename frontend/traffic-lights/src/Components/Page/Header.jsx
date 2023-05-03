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
        <Navbar className="header navbar bg-light p-2">
            <Navbar.Brand className="navbar-brand" href="/">
                <img src={logo} alt="Logo" width="90" height="30" className="d-inline-block align-text-top" />
                Traffic Lights
            </Navbar.Brand>
            {user?.accessToken &&
                <>
                    <Navbar.Text>You are logged in as: {user.name}</Navbar.Text>
                    <Button variant='secondary' size='sm' className='m-1' onClick={logOut}>Log Out</Button>
                </>
            }
        </Navbar>
    )
}

export default Header