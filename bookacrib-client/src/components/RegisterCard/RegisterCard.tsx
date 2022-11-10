import '../../utils/utils.css';

interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const RegisterCard: React.FC<props> = ({ setState }) => {
    return (
        <section className="login-page--card">
            <a className='link' onClick={() => { setState(true) }}>Back to login</a> {/* Sets parent state to show login card to true */}
            <h1>Create Account</h1>
            <form method='post'>
                <div className='group'>
                    <input id='email' autoFocus className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
                <div className='group'>
                    <input id='password' className="input" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">password</label>
                </div>
            </form>
        </section>
    )
}