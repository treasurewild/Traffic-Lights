import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Register from './Register';
import SignIn from './SignIn';

const UserPanel = () => {

    const [showSignIn, setShowSignIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggle = (target) => {
        if (target === setShowSignIn) {
            setShowRegister(false);
            setShowSignIn(!showSignIn);
        }

        if (target === setShowRegister) {
            setShowSignIn(false);
            setShowRegister(!showRegister);
        }
    }

    return (
        <div className='alert alert-secondary'>
            <h3>Teacher</h3>
            <Button className='m-1 btn-secondary' size='sm' onClick={() => toggle(setShowSignIn)} >Sign In</Button>
            <Button className='m-1 btn-secondary' size='sm' onClick={() => toggle(setShowRegister)}>Register</Button>

            {showSignIn && <SignIn />}
            {showRegister && <Register />}
        </div>
    )
}

export default UserPanel