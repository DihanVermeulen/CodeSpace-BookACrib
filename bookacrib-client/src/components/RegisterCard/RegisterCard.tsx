import '../../utils/utils.css';
import { api } from '../../api/axios';
import { register } from '../../utils/utils';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const RegisterCard: React.FC<props> = ({ setState }) => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('clicked submit');
        let usernameInput = document.querySelector('#username') as HTMLInputElement;
        let emailInput = document.querySelector('#registerEmail') as HTMLInputElement;
        let passwordInput = document.querySelector('#registerPassword') as HTMLInputElement;
        const data: any = JSON.stringify({
            userName: usernameInput.value,
            userEmail: emailInput.value.trim(),
            userPassword: passwordInput.value,
            userRole: "customer"
        });
        register(data);
    }

    return (
        <section className="login-page--card">
            <a className='link' onClick={() => { setState(true) }}>Back to login</a> {/* Sets parent state to show login card to true */}
            <h1>Create Account</h1>
            <form id='registerForm' onSubmit={handleSubmit}>
                <div className='group'>
                    <input id='username' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Username</label>
                </div>
                <div className='group'>
                    <input id='registerEmail' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input id='registerPassword' className="input" type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">password</label>
                </div>
                <input type='submit' value='Create Account' />
            </form>
        </section>
    )
}