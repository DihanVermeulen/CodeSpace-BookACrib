import React from 'react';
import './LoginCard.css';
import '../../utils/utils.css';
import { login } from '../../utils/utils';
import { api } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const LoginCard: React.FC<props> = ({ setState }: props) => {
    let navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('submitted');
        let emailInput = document.querySelector('#loginEmail') as HTMLInputElement;
        let passwordInput = document.querySelector('#loginPassword') as HTMLInputElement;

        // Checks if user exists and password matches then logs user in and creates session
        api.get('/login', {
            params: {
                user_email: emailInput.value,
                user_password: passwordInput.value
            }
        })
            .then(res => {
                let resId: any;
                console.log(res.data);
                if (res.data) {
                    let resId: any;
                    for (let id of res?.data) {
                        resId = id.user_id;
                    };
                    console.log(resId);
                    login(resId, 1);
                    localStorage.setItem('loggedInAs', JSON.stringify(resId));
                    navigate('/');
                }
                else {
                    console.log('error in logging in');
                }
            })
    }

    return (
        <section className="login-page--card">
            <h1>Sign in</h1>
            <form id='loginForm' method='post' onSubmit={handleSubmit}>
                <div className='group'>
                    <input id='loginEmail' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input id='loginPassword' className='input' type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='label'>Password</label>
                </div>
                <input className='tertiary-button' type='submit' value='Login' />
            </form>
            <p>Need an account?</p>
            <a className='link' onClick={() => { setState(false) }}>Sign up</a>
        </section>
    )
}