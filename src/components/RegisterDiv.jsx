import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import createData from '../api/routes/routes';

export default function RegisterContent () {
    const {register, handleSubmit} = useForm()

    const url = "http://localhost:8000/createdData";
    
    function SubmitForm (data) {
        console.log(data);

        if (data.confirmRegistered !== data.passwordRegistered) {
            return window.alert("Senha incompátivel!");
        }

        console.log("Conta criada.");

        createData(url, data);
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
                                <label htmlFor="user-name-register">Usuário</label><br/>
                                <input 
                                    type="text" 
                                    id="user-name-register" 
                                    placeholder="Seu usuário" 
                                    autoFocus 
                                    {...register("userNameRegistered")}/>
                            </div>
                            <div>
                                <label htmlFor="email-register">E-mail</label><br/>
                                <input 
                                    type="text" 
                                    id="email-register" 
                                    placeholder="Seu e-mail" 
                                    {...register("emailRegistered")}/>
                            </div>
                            <div>
                                <label htmlFor="password-register">Senha</label><br/>
                                <input 
                                    type="text" id="password-register" placeholder="Deve ter no mínimo 7 caracteres" {...register("passwordRegistered")} 
                                    required 
                                    minLength={7}/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirme sua senha</label><br/>
                                <input 
                                    type="text" id="confirm-password" placeholder="Deve ter no mínimo 7 caracteres" {...register("confirmRegistered")} 
                                    required 
                                    minLength={7}/>
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