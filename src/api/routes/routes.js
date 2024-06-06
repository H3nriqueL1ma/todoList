/* eslint-disable import/no-anonymous-default-export */
export async function createData (url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(response => { return response; })
    .catch(error => console.log("Error updating data: ", error));

    return res;
}

export async function readData (url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => { return response; })
    .catch(error => console.log("Error fetching data user: ", error));

    return res;
}

export async function createTask (url, data) {
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch(error => console.log("Error fetching create data task: ", error));
}

export async function readTasks (url, username) {
    const tasks = await fetch(`${url}?username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(response => { return response; })
    .catch(error => console.log("Error fetching read data task: ", error));

    return tasks;
}

export async function deleteTask_ (url, taskID) {
    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskID })
    })
    .catch(error => console.log("Error fetching delete data task: ", error))
}

export async function readStatusTask (url, taskID, status) {
    const statusTask = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskID, status })
    })
    .then(response => response.json())
    .then(response => { return response; })
    .catch(error => console.log("Error fetching read status task: ", error));

    return statusTask;
}

export default { createData, readData, createTask, readTasks, deleteTask_, readStatusTask };