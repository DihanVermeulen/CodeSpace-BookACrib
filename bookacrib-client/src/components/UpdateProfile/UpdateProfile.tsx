import '../../utils/utils.css';
import cancel from '../../assets/icons/cancel.svg';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import { deleteProfile } from '../../utils/functions';

export const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();

    const updateProfile = (newUsername: string, newPassword: string) => {
        api.get('/find-user', {
            params: {
                user_id: JSON.parse(localStorage.getItem('loggedInAs') as string)
            }
        }).then(res => {
            const data = JSON.stringify(
                {
                    user_email: res.data[0].user_email,
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
            navigate('/profile');
        });
    }

    const handleSubmit = () => {
        let username = (document.querySelector('#update-username') as HTMLInputElement).value;
        let password = (document.querySelector('#update-password') as HTMLInputElement).value;
        let confirmPassword = (document.querySelector('#update-password-confirm') as HTMLInputElement).value;

        let passwordsMatch: boolean = false;
        let usernameIsNotEmpty: boolean = false;

        if (username.length) {
            usernameIsNotEmpty = true;
        }

        console.log('password: ', password);
        console.log('confirm password: ', confirmPassword);

        if (password === confirmPassword) {
            console.log('passwords match');
            passwordsMatch = true;
        }

        if (passwordsMatch && usernameIsNotEmpty) {
            updateProfile(username, confirmPassword);
            navigate('/profile');
        }
    }

    return (
        <section id="update-profile" className="main-section--card color-black">
            <div className='flex-col align-center'>
                <img className='confirm-button' src={cancel} alt='confirm' onClick={() => { navigate('/profile') }} />
                <div className='group color-black text-center justify-center'>
                    <input id='update-username' autoFocus className="input color-black" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label color-black">Username</label>
                </div>
                <div className='group'>
                    <input id='update-password' className="input color-black" type="password" required />
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
                <button className='tertiary-button' onClick={handleSubmit}>Update</button>
                <button className='delete-button' onClick={() => {
                    deleteProfile(JSON.parse(localStorage.getItem('loggedInAs') as string));
                    localStorage.removeItem('loggedInAs');
                    navigate('/');
            }}>Delete</button>
            </div>
        </section >
    )
}