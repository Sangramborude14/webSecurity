import http from 'http';

const PORT = 3000;

const server = http.createServer((req: any, res: any) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === 'api/data' && req.method == 'GET') {
        const responseData = {
            status: 'sucess',
            message: 'Hello from the TypeScript Server!',
            timestamp: new Date().toISOString()
        };

        res.writeHead(200);
        res.end(JSON.stringify(responseData))
    } else {
        res.writeHead(200);
        res.end(JSON.stringify({ error: 'Not Found' }))
    }
})