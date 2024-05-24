/* eslint-disable import/no-anonymous-default-export */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { readData } from '../api/routes/routes';
import { useState } from 'react';
import Icon from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff.js';
import { eye } from 'react-icons-kit/feather/eye.js';

export default function LoginContent () {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const url = "http://localhost:8000/user/login";

    const navigate = useNavigate();

    function handleToggle () {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    }
    
    async function SubmitForm (data) {
        if (data.usernameLogin === "") {
            setErrorMessage("Campo 'Usuário' em branco! Digite seu usuário.");
        } else if (data.passwordLogin === "") {
            setErrorMessage("Campo 'Senha' em branco! Digite sua senha.");
        } else {
            const user = await readData(url, data);

            if (user.message === 200) {
                localStorage.setItem("username", data.usernameLogin);
                navigate("/home");
            } else if (user.message === 401) {
                setErrorMessage("Senha incorreta!");
            } else {
                setErrorMessage("Usuário não registrado!");
            }
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
                                <input 
                                    type="text" 
                                    id="user-name" placeholder="Seu usuário" 
                                    autoFocus 
                                    {...register("usernameLogin")}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Senha</label><br/>
                                <div id="pass-span">
                                    <input 
                                        type={type} 
                                        id="password" 
                                        placeholder="Sua senha" 
                                        {...register("passwordLogin")}
                                    />
                                    <span className="span-eye" onClick={handleToggle}>
                                        <Icon icon={icon} size={23} />
                                    </span>
                                </div>
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