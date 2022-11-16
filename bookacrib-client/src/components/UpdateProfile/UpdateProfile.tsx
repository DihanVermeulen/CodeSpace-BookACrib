import '../../utils/utils.css';
import confirm from '../../assets/icons/confirm.svg';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';

export const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();

    const updateProfile = (newUsername: string, newPassword: string, email: string) => {
        const data = JSON.stringify(
            {
                user_email: email,
                new_username: newUsername,
                new_password: newPassword
            }
        );
        api.put('/update-profile', data, {
            headers: {
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => console.log(res));
    }

    return (
        <section id="update-profile" className="main-section--card color-black">
            <div className='flex-col align-center'>
                <img className='confirm-button' src={confirm} alt='confirm' onClick={() => {
                    // navigate('/profile');
                    updateProfile((document.querySelector('#update-username') as HTMLInputElement).value, 
                    (document.querySelector('#update-password-confirm') as HTMLInputElement).value,
                    "dihan.vermeulen12@gmail.com"
                    );
                }} />
                <div className='group color-black text-center justify-center'>
                    <input id='update-username' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label color-black">Username</label>
                </div>
                <div className='group'>
                    <input id='update-password' className="input" type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label color-black">Password</label>
                </div>
                <div className='group color-black'>
                    <input id='update-password-confirm' className="input color-black" type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label color-black">Confirm Password</label>
                </div>
            </div>
        </section>
    )
}