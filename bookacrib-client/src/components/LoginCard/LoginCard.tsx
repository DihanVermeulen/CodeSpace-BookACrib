import React from 'react';
import './LoginCard.css';
import '../../utils/utils.css';
import { login } from '../../utils/utils';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log('submitted');
    login();
}

export const LoginCard: React.FC<props> = ({setState}: props) => {
    return (
        <section className="login-page--card">
            <h1>Sign in</h1>
            <form id='loginForm' method='post' onSubmit={handleSubmit}>
                <div className='group'>
                    <input id='email' autoFocus className="input" type="text" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input id='password' className='input' type="text" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='label'>Password</label>
                </div>
                <input type='submit' value='Login' />
            </form>
            <p>Need an account?</p>
            <a className='link' onClick={() => {setState(false)}}>Sign up</a>
        </section>
    )
}