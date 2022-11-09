import React from 'react';
import './LoginCard.css';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const LoginCard: React.FC<props> = ({setState}: props) => {
    return (
        <section className="login-page--card">
            <h1>Sign in</h1>
            <form method='get'>
                <div className='group'>
                    <input className="input" type="text" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input className='input' type="text" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='label'>Password</label>
                </div>
            </form>
            <p>Need an account?</p>
            <div onClick={() => {setState(false)}}>Sign up</div>
        </section>
    )
}