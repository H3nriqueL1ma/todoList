import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createData } from '../api/routes/routes';

export default function RegisterContent () {
    const {register, handleSubmit} = useForm()

    const url = "http://localhost:8000/user";
    
    function SubmitForm (data) {
        if (data.confirmRegistered !== data.passwordRegistered) {
            return window.alert("Senha incompátivel!");
        }

        console.log("Dados da conta: ", data);

        const result = createData(url, data);

        if (!result) {
            return window.alert("Credenciais já registradas!");
        }

        return window.alert("Usuário registrado com sucesso!");
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
                                    type="text" id="password-register" placeholder="Deve ter no mínimo 7 caracteres" {...register("passwordRegistered")} 
                                    required 
                                    minLength={7}
                                    maxLength={40}/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirme sua senha</label><br/>
                                <input 
                                    type="text" id="confirm-password" placeholder="Deve ter no mínimo 7 caracteres" {...register("confirmRegistered")} 
                                    required 
                                    minLength={7}
                                    maxLength={40}/>
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