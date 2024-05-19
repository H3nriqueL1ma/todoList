/* eslint-disable import/no-anonymous-default-export */
export async function createData (url, data) {
    const user = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(error => console.log("Error updating data: ", error));

    return user;
}

export async function readData (url, data) {
    const user = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(error => {
        console.log("Error fetching data user: ", error);
    });

    return user;
}

export default { createData, readData };