/* eslint-disable import/no-anonymous-default-export */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginContent from './LoginDiv';
import RegisterContent from './RegisterDiv';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Screen () {
    useEffect(() => {
        const userNameInput = document.querySelector("#user-name").value;
        const passwordInput = document.querySelector("#password").value;

        const userNameRegisterInput = document.querySelector("#user-name-register").value;
        const emailRegisterInput = document.querySelector("#email-register").value;
        const passwordRegisterInput = document.querySelector("#password-register").value;
        const confirmPassRegisterInput = document.querySelector("#confirm-password").value;

        const data = {
            userNameRegistered: userNameRegisterInput,
            passwordRegistered: passwordRegisterInput,
            confirmPassRegistered: confirmPassRegisterInput
        }

        fetch("/updatedData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Response is not OK!");
            }

            console.log("Data updated.");
        })
        .catch(error => {
            console.log("Error updating data: ", error);
        });
    }, []); 

    return (
        <>
            <Container className="p-0">
                <Row className="m-0">
                    <nav id="menu-nav" className="d-flex align-items-center">
                        <div id="menu-content">
                            <img src="icon-todo-2.png" alt="IconToDo" className="ms-2" />
                        </div>
                    </nav>

                    <div id="text" className="text-center m-auto">
                        <h1>Finalmente organize seu trabalho sem dificuldades!</h1>
                        <h5 className="m-auto">Alcance a organização e sua tranquilidade com o ToDo List.</h5>
                        <div id="button" className="m-auto">
                            <Link target="_blank" rel="noopener noreferrer" className="w-100 h-100 d-flex align-items-center justify-content-center" to={"/login"}>Use agora</Link>
                        </div>
                    </div>
                </Row>
                <Row className="m-0">
                    <div id="image">

                    </div>
                </Row>
            </Container>
        </>
    );
}

export function ScreenLogin () {
    return (
        <>
            <Container id="container" className="p-0">
                <Row className="m-0">
                    <Col id="content" xl={4}>
                        <LoginContent />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export function ScreenRegister () {
    return (
        <>
            <Container id="container" className="p-0">
                <Row className="m-0">
                    <Col id="content" xl={4}>
                        <RegisterContent />
                    </Col>
                </Row>
            </Container>            
        </>
    );
}

export default { Screen, ScreenLogin, ScreenRegister }