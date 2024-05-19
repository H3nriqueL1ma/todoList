import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createData } from '../api/routes/routes';
import { useState } from 'react';

export default function RegisterContent () {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const url = "http://localhost:8000/user";

    async function SubmitForm (data) {
        if (data.confirmRegistered !== data.passwordRegistered) {
            setError("confirmRegistered", { type: "manual", message: "Senha incompátivel!"});
            return;
        }

        console.log("Dados da conta: ", data);

        const result = await createData(url, data);

        if (result.message === 409) {
            setErrorMessage("Credenciais já registradas!");
        } else {
            setErrorMessage("Usuário registrado com sucesso!");
        }
    }

    return (
        <>
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
                                    {...register("userNameRegistered")}
                                    maxLength={40}/>
                            </div>
                            <div>
                                <label htmlFor="email-register">E-mail</label><br/>
                                <input 
                                    type="text" 
                                    id="email-register" 
                                    placeholder="Seu e-mail" 
                                    {...register("emailRegistered")}
                                    maxLength={50}/>
                            </div>
                            <div>
                                <label htmlFor="password-register">Senha</label><br/>
                                <input 
                                    type="text" id="password-register" placeholder="Deve ter no mínimo 7 caracteres" {...register("passwordRegistered", {
                                        required: "Senha é obrigatória!",
                                        minLength: { value: 7, message: "Insira uma senha acima de 7 caracteres!" }
                                    })} />
                                {errors.passwordRegistered && <p className="error-message">{errors.passwordRegistered.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirme sua senha</label><br/>
                                <input 
                                    type="text" id="confirm-password" placeholder="Deve ter no mínimo 7 caracteres" {...register("confirmRegistered", {
                                        required: "Confirmação de senha é obrigatória!",
                                        minLength: { value: 7, message: "Insira uma senha acima de 7 caracteres!" }
                                    })} 
                                    maxLength={40} />
                                {errors.confirmRegistered && <p className="error-message">{errors.confirmRegistered.message}</p>}
                            </div>
                            <div>
                                <button id="submit">Registrar-se</button>
                            </div>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div id="new-user">
                            <Link to={"/login"}>Já tem uma conta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}