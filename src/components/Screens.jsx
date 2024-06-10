/* eslint-disable array-callback-return */
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
import { createTask, deleteTask_, readStatusTask, readTasks } from '../api/routes/routes';
import { useEffect, useState } from 'react';
import { Forget, ForgetVerify } from './ForgetPass';
import setButtonClasses from './functionsForHome/functionsHome';
import Loading from './errorsAndLoadings/LoadingAnimation';

const URL_CREATE = "http://localhost:8080/user/task";
const URL_READ = "http://localhost:8080/user/task/read-user-tasks";
const URL_READ_ACTIVE = "http://localhost:8080/user/task/read-user-tasks/active";
const URL_READ_COMPLETE = "http://localhost:8080/user/task/read-user-tasks/complete";
const URL_READ_STATUS = "http://localhost:8080/user/task/read-user-tasks/status";


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
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    let tasksQnt = tasks.filter(item => item.completed === false).length;

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            const storedTasks = JSON.parse(localStorage.getItem("tasks"));
            if (storedTasks) {
                setTasks(storedTasks);
                setIsLoading(false);
            } else {
                loadTasks(storedUsername);
            }
        } else {
            navigate("/");
        }

        const allTasksButton = document.querySelector("#all-tasks");
        const activeTasksButton = document.querySelector("#active-tasks");
        const completeTasksButton = document.querySelector("#complete-tasks");

        function handleAllTasksClick() {
            setButtonClasses(allTasksButton, [activeTasksButton, completeTasksButton]);
            loadTasks(storedUsername);
        }

        function handleActiveTasksClick() {
            setButtonClasses(activeTasksButton, [allTasksButton, completeTasksButton]);
            loadActiveTasks(storedUsername);
        }

        function handleCompleteTasksClick() {
            setButtonClasses(completeTasksButton, [allTasksButton, activeTasksButton]);
            loadCompleteTasks(storedUsername);
        }

        if (allTasksButton && activeTasksButton && completeTasksButton) {
            allTasksButton.addEventListener("click", handleAllTasksClick);
            activeTasksButton.addEventListener("click", handleActiveTasksClick);
            completeTasksButton.addEventListener("click", handleCompleteTasksClick);
        }

        return () => {
            if (allTasksButton && activeTasksButton && completeTasksButton) {
                allTasksButton.removeEventListener("click", handleAllTasksClick);
                activeTasksButton.removeEventListener("click", handleActiveTasksClick);
                completeTasksButton.removeEventListener("click", handleCompleteTasksClick);
            }
        }
    }, [navigate]);

    async function handleStatusClick(taskId, event) {
        const statusTaskButtonI = event.currentTarget.querySelector("i");
        const classOne = "bi-check-square";
        const classTwo = "bi-check-square-fill";
        let statusTask;

        if (statusTaskButtonI && classOne && classTwo) {
            if (statusTaskButtonI.classList.contains(classOne)) {
                statusTaskButtonI.classList.remove(classOne);
                statusTaskButtonI.classList.add(classTwo);
                statusTask = true;
            } else {
                statusTaskButtonI.classList.remove(classTwo);
                statusTaskButtonI.classList.add(classOne);
                statusTask = false;
            }

            const updatedTasks = tasks.map(t => {
                if (t.taskId === taskId) {
                    return { ...t, completed: statusTask }
                } else {
                    return t;
                }
            });
    
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
    
            try {
                await readStatusTask(URL_READ_STATUS, taskId, statusTask);
            } catch (error) {
                console.error("Failed to update task status: ", error);
            }
        }
    }

    function handleTemp () {
        localStorage.clear();
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }
 
    async function SubmitTask (data) {
        const taskData = { ...data, username }
        try {
            await createTask(URL_CREATE, taskData);
            await loadTasks(username);
        } catch (error) {
            console.error('Failed to submit task:', error);
        }
    }

    async function loadTasks (username) {
        setIsLoading(true);
        try {
            const userTasks = await readTasks(URL_READ, username);
            setTasks(userTasks || []);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadActiveTasks (username) {
        setIsLoading(true);
        try {
            const userTasks = await readTasks(URL_READ_ACTIVE, username);
            setTasks(userTasks || []);
        } catch (error) {
            console.error("Failed to load active tasks: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadCompleteTasks (username) {
        setIsLoading(true);
        try {
            const userTasks = await readTasks(URL_READ_COMPLETE, username);
            setTasks(userTasks || []);
        } catch (error) {
            console.error("Failed to load complete tasks: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteTask (taskID) {
        const url_delete = `http://localhost:8080/user/task/delete-user-task/${taskID}`;
        try {
            await deleteTask_(url_delete, taskID);
            await loadTasks(username);
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
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
                <Row className="m-0 d-block">

                    
                    <div id="tasks" className="m-auto p-3">
                        {isLoading ? (
                            <Loading/>
                        ) : (
                            <table id="table" className="m-auto">
                                {tasks.length === 0 ? (
                                    <p className="text-center">Nenhuma tarefa encontrada</p>
                                ) : (
                                    <tbody>
                                        {tasks.map(task => (
                                            <tr key={task.taskId} id="task">
                                                <td id="status-content">
                                                    <button 
                                                        id="status" 
                                                        onClick={(event) => handleStatusClick(task.taskId, event)}
                                                    >
                                                        <i id="status-i" className={`bi ${task.completed ? 'bi-check-square-fill' : 'bi-check-square'}`}></i>
                                                    </button>
                                                </td>
                                                <td id="text-task" style={ {textDecoration: !task.completed ? "none" : "line-through"} }>
                                                    {task.taskContent}
                                                </td>
                                                <td id="delete-content">
                                                    <button 
                                                        id="delete" 
                                                        onClick={() => deleteTask(task.taskId)} 
                                                        disabled={task.completed}
                                                        style={ {visibility: !task.completed ? "visible" : "hidden"} }
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table> 
                        )}
                    </div>
                    <Row className="m-auto p-3" id="tasks-options">
                        <Col xs={4}>
                            <p className="m-0">{tasksQnt} Itens restantes</p>
                        </Col>
                        <Col id="tasks-types" xs={8}>
                            <button id="all-tasks" className="selected">Todos</button>
                            <button id="active-tasks">Ativos</button>   
                            <button id="complete-tasks">Completados</button>       
                        </Col>
                    </Row>
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