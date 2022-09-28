import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const loginSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post('/users/login', { ...user });

            localStorage.setItem('firstLogin', true);

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className='d-flex flex-column bg-light p-5 auth-content'>
            <Form className='d-flex flex-column align-items-center justify-content-center' onSubmit={loginSubmit}>
                <h2 className='mb-5'>Login</h2>

                <Form.Group className="mb-3" controlId="form=Email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput} />
                </Form.Group>

                <Form.Group className="mb-5" controlId="form=Email">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name='password' required placeholder='Password' value={user.password} onChange={onChangeInput} />
                </Form.Group>

                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Button className='me-2 auth-btn' variant="dark" type='submit'>Login</Button>
                    <Button className='auth-btn' variant="outline-dark" href="/register">Register</Button>
                </div>
            </Form>
        </div >
    );
}

export default Login;