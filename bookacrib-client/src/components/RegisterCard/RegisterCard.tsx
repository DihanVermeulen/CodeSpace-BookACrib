interface props {
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const RegisterCard: React.FC<props> = ({setState}) => {
    return (
        <section className="login-page--card">
            <div onClick={() => {setState(true)}}>Go back</div>
        </section>
    )
}