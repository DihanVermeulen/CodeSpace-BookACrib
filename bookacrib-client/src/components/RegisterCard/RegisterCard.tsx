import '../../utils/utils.css';
import { api } from '../../api/axios';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const RegisterCard: React.FC<props> = ({ setState }) => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('clicked submit');
        let usernameInput = document.querySelector('#username') as HTMLInputElement;
        let emailInput = document.querySelector('#email') as HTMLInputElement;
        let passwordInput = document.querySelector('#password') as HTMLInputElement;
        const data: any = JSON.stringify({
            userName: usernameInput.value,
            userEmail: emailInput.value,
            userPassword: passwordInput.value,
            userRole: "customer"
        });
        console.log(data);
        api.post('/register', data, {
            headers: {
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
                    <input id='email' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input id='password' className="input" type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">password</label>
                </div>
                <input type='submit' value='Create Account' />
            </form>
        </section>
    )
}