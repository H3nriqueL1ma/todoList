/* eslint-disable import/no-anonymous-default-export */
export function createData (url, data) {
    fetch(url, {
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
    .then(result => {
        return result;
    })
    .catch(error => {
        console.log("Error fetching data user: ", error);
    });

    return user;
}

export default { createData, readData };