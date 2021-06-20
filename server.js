const { log } = require('console');
const http= require('http');

const server= http.createServer(function(require, response){

    response.writeHead(200, {'Content-Type':'text/html'});

    response.write(`
    <html>
        <body>
            <h1>Este es el server funcionando</h1>
        </body>
    </html>
    
    `);

response.end();

});

server.listen(3000);

console.log('Servidor inicializado');