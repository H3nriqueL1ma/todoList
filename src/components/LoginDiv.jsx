import { Link } from 'react-router-dom';

export default function LoginContent () {
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
                            <label htmlFor="user-name">Usuário</label><br/>
                            <input type="text" id="user-name" placeholder="Seu usuário" autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label><br/>
                            <input type="text" id="password" placeholder="Sua senha"/>
                        </div>
                        <div id="new-user">
                            <Link to={"/register"}>Novo Usuário?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}