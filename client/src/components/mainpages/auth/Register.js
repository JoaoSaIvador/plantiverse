import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/users/register', { ...user });

            localStorage.setItem('firstLogin', true);


            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className='d-flex flex-column bg-light p-5 auth-content'>
            <Form className='d-flex flex-column align-items-center justify-content-center' onSubmit={registerSubmit}>
                <h2 className='mb-5'>Register</h2>

                <Form.Group className="mb-3" controlId="form=Email">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form=Email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput} />
                </Form.Group>

                <Form.Group className="mb-5" controlId="form=Email">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name='password' required placeholder='Password' value={user.password} onChange={onChangeInput} />
                </Form.Group>

                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Button className='me-2 auth-btn' variant="dark" type='submit'>Register</Button>
                    <Button className='auth-btn' variant="outline-dark" href="/login">Login</Button>
                </div>
            </Form>
        </div >
    );
}

export default Register;