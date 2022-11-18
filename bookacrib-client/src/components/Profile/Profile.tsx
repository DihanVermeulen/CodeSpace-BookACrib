import { useNavigate } from 'react-router-dom';
import update from '../../assets/icons/update.svg';
import './Profile.css';

export const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(JSON.parse(localStorage.getItem('loggedInAs') as any)).then((data) => {
            setUser(data[0]);
        });
    }, [])

    return (
        <section id='profile' className="main-section--card">
            <img className='update-button' src={update} alt="update" onClick={() => {
                navigate('/update-profile');
            }} />
            <h2>Username</h2>
            <h3>Email</h3>
            <div className='flex-row justify-center'>
                <div className='badge'>Current bookings: </div>
                <div className='badge'>Previous bookings: </div>
                <div className='badge'>Total bookings: </div>
            </div>
        </section>
    )
}