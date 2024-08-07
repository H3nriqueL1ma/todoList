import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { readData } from '../api/routes/routes';
import { useEffect, useState } from 'react';
import Icon from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff.js';
import { eye } from 'react-icons-kit/feather/eye.js';
import ErrorModal from './errorsAndLoadings/ErrorModal.jsx';
import { encodeCredentials } from './functionsForHome/functionsHome.js';

export default function LoginContent () {
    const { register, handleSubmit } = useForm();
    const [textModal, setTextModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const url = "https://spring-todolist-api.azurewebsites.net/user/login";

    const navigate = useNavigate();

    function isEdge () {
        return window.navigator.userAgent.indexOf("Edg") > 1;
    }

    useEffect(() => {
        const input = document.querySelector("#password");

        if (isEdge()) {
            const span = document.querySelector(".span-eye");
            const eye = document.querySelector("#icon-eye");

            span.setAttribute("display", "none");
            eye.style.setProperty("display", "none");
        } else {
            input.style.setProperty("padding-right", "40px", "important");
        }
    }, []);

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
        if (data.username === "") {
            setTextModal("Campo 'Usuário' em branco! Digite seu usuário.");
            setShowModal(true);
        } else if (data.password === "") {
            setTextModal("Campo 'Senha' em branco! Digite sua senha.");
            setShowModal(true);
        } else {
            const encodedCredentials = encodeCredentials(data.username, data.password);
            localStorage.setItem("credentials", encodedCredentials);
            const res = await readData(url);

            if (res === 200) {
                localStorage.setItem("username", data.username);
                navigate("/home");
            } else if (res === 401 || res.status === 401) {
                setTextModal("Senha incorreta ou Usuário não registrado!")
                setShowModal(true);
            }
        }
    }

    return (
        <>
            <ErrorModal 
                show={showModal} 
                handleClose={ () => setShowModal(false) }
                text={textModal}
            />

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
                                    {...register("username")}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Senha</label><br/>
                                <div id="pass-span">
                                    <input 
                                        type={type} 
                                        id="password" 
                                        placeholder="Sua senha" 
                                        {...register("password")}
                                    />
                                    <span className="span-eye" onClick={handleToggle}>
                                        <Icon id="icon-eye" icon={icon} size={23} />
                                    </span>
                                </div>
                                <div id="forget-pass">
                                    <Link to={"/forget-password"}>Esqueci minha senha</Link>
                                </div>
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