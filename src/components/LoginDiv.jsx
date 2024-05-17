import { Link } from 'react-router-dom';

export default function LoginContent () {
    return (
        <>
            <div id="login-content" className="text-center">
                <div id="image-login">
                    <img src="LogoUser.png" alt="logoUser" />
                </div>

                <div id="login-div" className="text-start">
                    <h2 className="ms-3">Login</h2>

                    <div id="login-text">
                        <form>
                            <div>
                                <label htmlFor="user-name">Usuário</label><br/>
                                <input type="text" id="user-name" placeholder="Seu usuário" autoFocus/>
                            </div>
                            <div>
                                <label htmlFor="password">Senha</label><br/>
                                <input type="text" id="password" placeholder="Sua senha"/>
                            </div>
                            <div>
                                <button id="submit">Entrar</button>
                            </div>
                        </form>
                        <div id="new-user">
                            <Link to={"/register"}>Novo Usuário?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}