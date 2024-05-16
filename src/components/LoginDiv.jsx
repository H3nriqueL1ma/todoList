

export default function LoginContent () {
    return (
        <>
            <div id="login-content" className="text-center">
                <div>
                    <img src="LogoUser.png" alt="logoUser" />
                </div>

                <div id="login-div" className="text-start p-4 pt-5 pb-5">
                    <h2>Login</h2>

                    <div className="p-4 pt-3 pb-3">
                        <div>
                            <label htmlFor="user-name">Usuário</label><br/>
                            <input type="text" placeholder="Seu usuário"/>
                        </div>
                        <div>
                            <label htmlFor="user-name">Senha</label><br/>
                            <input type="text" placeholder="Sua senha"/>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}