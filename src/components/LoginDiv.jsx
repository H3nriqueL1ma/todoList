import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { readData } from '../api/routes/routes';
import { useState } from 'react';

export default function LoginContent () {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const url = "http://localhost:8000/user/verify-user-credentials";
    
    async function SubmitForm (data) {
        const user = await readData(url, data);

        if (user.message === 200) {
            setErrorMessage("Acesso autorizado!");
        } else if (user.message === 401) {
            setErrorMessage("Senha incorreta!");
        } else {
            setErrorMessage("Usuário não registrado!");
        }
    }

    return (
        <>
            <div id="login-content" className="text-center">
                <div id="image-login">
                    <img src="LogoUser.png" alt="logoUser" />
                </div>

                <div id="login-div" className="text-start">
                    <h2 className="ms-3">Login</h2>

                    <div id="login-text">
                        <form onSubmit={handleSubmit(SubmitForm)}>
                            <div>
                                <label htmlFor="user-name">Usuário</label><br/>
                                <input type="text" id="user-name" placeholder="Seu usuário" autoFocus {...register("usernameLogin")}/>
                            </div>
                            <div>
                                <label htmlFor="password">Senha</label><br/>
                                <input type="text" id="password" placeholder="Sua senha" {...register("passwordLogin")}/>
                            </div>
                            <div>
                                <button id="submit">Entrar</button>
                            </div>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div id="new-user">
                            <Link to={"/register"}>Novo Usuário?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}