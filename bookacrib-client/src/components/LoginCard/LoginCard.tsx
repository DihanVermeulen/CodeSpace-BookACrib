import './LoginCard.css';

export const LoginCard = () => {
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
                <span className='bar'></span>
            </form>
        </section>
    )
}