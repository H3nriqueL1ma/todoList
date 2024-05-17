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

export default createData;