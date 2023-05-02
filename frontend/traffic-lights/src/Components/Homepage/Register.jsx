import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { register } from '../../Utils/auth.service';

const Register = () => {

    const [user, setUser] = useState({
        handle: ``,
        name: ``,
        email: ``,
        password: `` // Password sent as plaintext??
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const registerHandler = async (e) => {
        e.preventDefault();

        const res = await register(user.handle, user.name, user.email, user.password);
    };

    return (
        <div>
            <Form className='m-2' onSubmit={registerHandler}>
                <h3>Register</h3>
                <FloatingLabel controlId="name" label="Name" className="mb-1">
                    <Form.Control type='text' placeholder='Name' name='name' value={user.name} onChange={handleChange} required />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Email address" className="mb-1">
                    <Form.Control type='email' placeholder='Email' name='email' value={user.email} onChange={handleChange} required />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-1">
                    <Form.Control type='password' placeholder='Password' name='password' value={user.password} onChange={handleChange} required />
                </FloatingLabel>
                <Button className='mt-1 btn-primary' type='submit'>
                    Sign In
                </Button>
            </Form>
        </div>
    )
}

export default Register