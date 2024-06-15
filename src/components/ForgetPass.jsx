/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorModal from './errorsAndLoadings/ErrorModal.jsx';
import { createData, readData } from "../api/routes/routes.js";
import { useNavigate } from "react-router-dom";
import { eyeOff } from 'react-icons-kit/feather/eyeOff.js';
import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye.js';

export function Forget () {
    const { register, handleSubmit } = useForm();
    const [textModal, setTextModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    async function SubmitForm(data) {
        const url = `http://localhost:8080/user/email-verify/${data.email}`;

        if (data.email === "") {
            setTextModal("Campo 'E-mail' em branco! Digite seu e-mail.");
            setShowModal(true);
        } else {
            const res = await readData(url, data);

            if (res.message === 200) {
                localStorage.setItem("email", data.email);
                navigate("/forget-password/new-credentials")
            } else {
                setTextModal("E-mail não existe!");
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
                    <i className="bi bi-lock"></i>
                </div>

                <div id="login-div" className="text-start">
                    <h2 className="ms-3">Esqueceu a senha</h2>
                    <div id="login-text">
                        <form onSubmit={handleSubmit(SubmitForm)}>
                            <div>
                                <label htmlFor="email">E-mail</label><br/>
                                <input 
                                    type="text" 
                                    id="email" placeholder="Seu e-mail" 
                                    autoFocus 
                                    {...register("email")}
                                />
                            </div>
                            <div>
                                <button id="submit">Próximo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ForgetVerify () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [textModal, setTextModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const navigate = useNavigate();
    const url = "http://localhost:8000/user/reset-pass";

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

    async function SubmitForm(data) {
        if (data.newPassword === "") {
            setTextModal("Campo 'Nova Senha' em branco! Digite sua senha.");
            setShowModal(true);
        } else if (data.confirm === "") {
            setTextModal("Campo 'Confirme sua senha' em branco! Digite sua senha.");
            setShowModal(true);
        } else {
            if (data.newPassword !== data.confirm) {
                setTextModal("Senha incompátivel!");
                setShowModal(true);
                return;
            }

            const storedEmail = localStorage.getItem("email");

            const newData = {
                newPass: data.newPassword,
                email: storedEmail
            }

            const res = await createData(url, newData);

            if (res.message === 200) {
                navigate("/login");
            } else {
                setTextModal("E-mail não encontrado!");
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
                    <i className="bi bi-key"></i>
                </div>

                <div id="login-div" className="text-start">
                    <h2 className="ms-3">Novas Credenciais</h2>
                    <div id="login-text">
                        <form onSubmit={handleSubmit(SubmitForm)}>
                        <div>
                                <label htmlFor="password-register">Nova Senha</label><br/>
                                <div id="pass-span" className="d-flex">
                                    <input 
                                        type={type}
                                        id="password-register" 
                                        placeholder="Deve ter no mínimo 7 caracteres" 
                                        {...register("newPassword", {
                                            required: "Nova Senha é obrigatória!",
                                            minLength: { value: 7, message: "Insira uma senha acima de 7 caracteres!" }
                                        })}
                                    />
                                    <span className="span-eye" onClick={handleToggle}>
                                        <Icon id="icon-eye" icon={icon} size={23} />
                                    </span>
                                </div>
                                {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
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
                                {errors.confirm && <p className="error-message">{errors.confirm.message}</p>}
                            </div>
                            <div>
                                <button id="submit">Atualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default { Forget, ForgetVerify }