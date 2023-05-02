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
        <>
            <Button className='m-1' size='sm' onClick={() => toggle(setShowSignIn)}>Sign In</Button>
            <Button className='m-1' size='sm' onClick={() => toggle(setShowRegister)}>Register</Button>

            {showSignIn && <SignIn />}
            {showRegister && <Register />}
        </>
    )
}

export default UserPanel