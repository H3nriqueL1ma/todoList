/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginContent from './LoginDiv';
import RegisterContent from './RegisterDiv';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask_, readTasks } from '../api/routes/routes';
import { useEffect, useState } from 'react';
import { Forget, ForgetVerify } from './ForgetPass';

export function Screen () {
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
                            <Link className="w-100 h-100 d-flex align-items-center justify-content-center" to={"/login"}>Use agora</Link>
                        </div>
                    </div>
                </Row>
                <Row className="m-0">
                    <div id="image" className="text-center col">
                        <img src="screenPlatform.png" id="image-initial-screen"/>
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
                    <Col>
                        <div id="title" className="text-start p-5">
                            <h1>Bem-vindo ao ToDo List!</h1>
                            <h5>Faça o login para acessar sua conta.</h5>
                        </div>
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
                    <Col>
                        <div id="title" className="text-start p-5">
                            <h1>Bem-vindo ao ToDo List!</h1>
                            <h5>Crie sua conta de Usuário.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>            
        </>
    );
}

export function ScreenHome () {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const { register, handleSubmit } = useForm();
    const url_create = "http://localhost:8080/user/task";
    const url_read = "http://localhost:8080/user/task/read-user-tasks";
    const [tasks, setTasks] = useState({});
    const [tasksArray, setTasksArray] = useState();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            loadTasks(storedUsername)
        } else {
            navigate("/");
        }
    }, [loadTasks, navigate]);

    function handleTemp () {
        localStorage.clear();
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }
 
    async function SubmitTask (data) {
        const taskData = { ...data, username }
        console.log(taskData)
        await createTask(url_create, taskData);
        await loadTasks(username);
    }

    async function loadTasks (username) {
        const userTasks = await readTasks(url_read, username);
        
        if (userTasks === null || userTasks === undefined) {
            setTasks({});
        } else {
            setTasks(userTasks);
            setTasksArray([tasks.taskId, tasks.taskContent])
            console.log(tasksArray)
        }
    }

    async function deleteTask (taskID) {
        const url_delete = `http://localhost:8080/user/task/delete-user-task/${taskID}`;
        await deleteTask_(url_delete, taskID);
        await loadTasks(username);
    }

    return (
        <>
            <Container id="container-home" className="p-0">
                <Row id="row-title-input" className="m-0">
                    <Col>
                        <div className="text-center mt-5 mb-5">
                            <div id="div-title" className="text-start">
                                <h1 id="title-todo">To Do</h1>
                            </div>
                            <form className="d-flex justify-content-center" onSubmit={handleSubmit(SubmitTask)}>
                                <input id="new-todo" placeholder="Crie uma nova ToDo..." type="text" className="pe-5 ps-5" autoFocus {...register("taskUser")}/>
                                <button id="submit-todo">Adicionar</button>
                            </form>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5 id="hello-user" className="ms-3">Bem-vindo(a), {username}!</h5>
                            <div className="me-3">
                                <Link onClick={handleTemp}>Sair</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="m-0">
                    <div id="tasks" className="m-auto p-3">
                        <table id="table" className="m-auto">
                        {tasksArray.map(task => (
                                <tr key={task.taskId} id="task">
                                    <td id="text-task">{task.taskContent}</td>
                                    <td>
                                        <button id="delete" onClick={() => deleteTask(task.taskId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export function ScreenForget () {
    return (
        <>
            <Container id="container" className="p-0">
                <Row className="m-0">
                    <Col id="content" xl={4}>
                        <Forget />
                    </Col>
                    <Col>
                        <div id="title" className="text-start p-5">
                            <h1>Bem-vindo ao ToDo List!</h1>
                            <h5>Mude a sua senha.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>  
        </>
    );
}

export function ScreenForgetVerify () {
    return (
        <>
            <Container id="container" className="p-0">
                <Row className="m-0">
                    <Col id="content" xl={4}>
                        <ForgetVerify />
                    </Col>
                    <Col>
                        <div id="title" className="text-start p-5">
                            <h1>Bem-vindo ao ToDo List!</h1>
                            <h5>Mude a sua senha.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>  
        </>
    );
}



export default { Screen, ScreenLogin, ScreenRegister, ScreenHome, ScreenForget, ScreenForgetVerify }