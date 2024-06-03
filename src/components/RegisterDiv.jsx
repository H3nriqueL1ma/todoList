import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createData } from '../api/routes/routes';
import { useEffect, useState } from 'react';
import Icon from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff.js';
import { eye } from 'react-icons-kit/feather/eye.js';
import ErrorModal from './errors/ErrorModal.jsx';

export default function RegisterContent () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [textModal, setTextModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const url = "http://localhost:8000/user";

    const navigate = useNavigate();

    function isEdge () {
        return window.navigator.userAgent.indexOf("Edg") > 1;
    }

    useEffect(() => {
        const input = document.querySelector("#password-register");

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
        } else if (data.email === "") {
            setTextModal("Campo 'E-mail' em branco! Digite seu e-mail.");
            setShowModal(true);
        } else if (data.password === "") {
            setTextModal("Campo 'Senha' em branco! Digite sua senha.");
            setShowModal(true);
        } else if (data.confirm === "") {
            setTextModal("Campo 'Confirme sua senha' em branco! Confirme sua senha.");
            setShowModal(true);
        } else {
            if (data.confirm !== data.password) {
                setTextModal("Senha incompátivel!");
                setShowModal(true);
                return;
            }

            const newData = {
                username: data.username,
                email: data.email,
                password: data.password
            }
    
            const res = await createData(url, newData);
    
            if (res.message === 409) {
                setTextModal("Usuário ou e-mail já registrado!");
                setShowModal(true);
            } else if (res.message === 404) {
                setTextModal("Domínio de e-mail não existe!");
                setShowModal(true);
            } else {
                navigate("/login");
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
                    <h2 className="ms-3">Registre-se</h2>

                    <div id="login-text">
                        <form onSubmit={handleSubmit(SubmitForm)}>
                            <div>
                                <label htmlFor="user-name-register">Usuário</label><br/>
                                <input 
                                    type="text" 
                                    id="user-name-register" 
                                    placeholder="Seu usuário" 
                                    autoFocus 
                                    {...register("username")}
                                    maxLength={40}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-register">E-mail</label><br/>
                                <input 
                                    type="text" 
                                    id="email-register" 
                                    placeholder="Seu e-mail" 
                                    {...register("email")}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="password-register">Senha</label><br/>
                                <div id="pass-span" className="d-flex">
                                    <input 
                                        type={type}
                                        id="password-register" 
                                        placeholder="Deve ter no mínimo 7 caracteres" 
                                        {...register("password", {
                                            required: "Senha é obrigatória!",
                                            minLength: { value: 7, message: "Insira uma senha acima de 7 caracteres!" }
                                        })}
                                    />
                                    <span className="span-eye" onClick={handleToggle}>
                                        <Icon id="icon-eye" icon={icon} size={23} />
                                    </span>
                                </div>
                                {errors.passwordRegistered && <p className="error-message">{errors.passwordRegistered.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirme sua senha</label><br/>
                                <input 
                                    type={type} 
                                    id="confirm-password" 
                                    placeholder="Deve ter no mínimo 7 caracteres" 
                                    {...register("confirm", {
                                        required: "Confirmação de senha é obrigatória!",
                                        minLength: { value: 7, message: "Insira uma senha acima de 7 caracteres!" }
                                    })}
                                />
                                {errors.confirmRegistered && <p className="error-message">{errors.confirmRegistered.message}</p>}
                            </div>
                            <div>
                                <button id="submit">Registrar-se</button>
                            </div>
                        </form>
                        <div id="new-user">
                            <Link to={"/login"}>Já tem uma conta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}