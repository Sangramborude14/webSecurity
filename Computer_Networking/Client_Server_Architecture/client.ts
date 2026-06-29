interface ServerResponse {
    status: string;
    message: string;
    timestamp: string;
}

async function fetchData(): Promise<void>{
    const url = `http://localhost:3000/api/data`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: ServerResponse = await response.json();

        console.log(`Data recieved from server`)
        console.log(`Message: ${data.message}`)
        console.log(`Time: ${data.status}`)
    }catch(err){
        console.error(`Failed to fetch data`,err);``
    }
}

fetchData();