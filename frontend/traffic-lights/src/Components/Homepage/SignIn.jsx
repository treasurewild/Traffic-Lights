import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { signIn } from '../../Utils/auth.service';
import { useNavigate } from 'react-router-dom';
import { getLessons } from '../../Utils/lessonAPI';

const SignIn = ({ setLessons }) => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: ``,
        password: ``
    });
    const [message, setMessage] = useState();

    const handleChange = e => {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    };

    const signInHandler = async (e) => {
        e.preventDefault();

        const result = await signIn(login.email, login.password);

        if (result.accessToken) {
            navigate('/teacher');
        } else
            setMessage(result.error);

    }

    return (
        <>
            <Form onSubmit={signInHandler}>
                <h3>Sign In</h3>
                <FloatingLabel controlId="email" label="Email" className="mb-1">
                    <Form.Control type='text' placeholder='Email' name='email' value={login.email} onChange={handleChange} required />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-1">
                    <Form.Control type='password' placeholder='Password' name='password' value={login.password} onChange={handleChange} required />
                </FloatingLabel>
                {message && (
                    <>
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </>
                )}
                <Button className='mt-1 btn-primary' type='submit'>
                    Sign In
                </Button>
            </Form>

        </>
    )
}

export default SignIn