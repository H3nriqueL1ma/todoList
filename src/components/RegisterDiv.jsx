import { Link } from 'react-router-dom';

export default function RegisterContent () {
    return (
        <>
            <div id="login-content" className="text-center">
                <div id="logo-todo-login" className="text-start position-absolute">
                    <img src="icon-todo.png" alt="logoTodo-Login" />
                </div>

                <div>
                    <img src="LogoUser.png" alt="logoUser" />
                </div>

                <div id="login-div" className="text-start p-4 pt-4 pb-5">
                    <h2>Login</h2>

                    <div id="login-text">
                        <div>
                            <label htmlFor="user-name-register">Usuário</label><br/>
                            <input type="text" id="user-name-register" placeholder="Seu usuário" autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="email-register">E-mail</label><br/>
                            <input type="text" id="email-register" placeholder="Sua senha"/>
                        </div>
                        <div>
                            <label htmlFor="password-register">Senha</label><br/>
                            <input type="text" id="password-register" placeholder="Deve ter no mínimo 7 caracteres"/>
                        </div>
                        <div>
                            <label htmlFor="confirm-password">Confirme sua senha</label><br/>
                            <input type="text" id="confirm-password" placeholder="Deve ter no mínimo 7 caracteres"/>
                        </div>
                        <div id="new-user">
                            <Link to={"/login"}>Já tem uma conta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}