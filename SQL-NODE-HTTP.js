const mysql = require('mysql2');
const http= require('http');
const { log } = require('console');
const mysqlConfig= require('./config/config');  // trae la info del archivo config.js
// metodo que crea la conexion y pide algunos argumentos
const connection = mysql.createConnection(mysqlConfig);// ingresa la info de la bbdd que esta en la carpeta config/config.js

connection.connect(function(error){                         // levanta la conexión  contra workbench
    if (error) {
        console.log("se produjo un error con la conexion a WORKBENCH" + error.stack ); //error.stack devuelve el error en varios arrays apilados
        return;                                            // para que la funcion devuelda el error
    }else{
        console.log("La conexion con WORKBENCH fue exitosa!");  //si todo ssale bien,  se manda por console un ok
    }
});  


/*

connection.query('SELECT * FROM empleados', function (error, resultados) {  //la petision a la base de datos se realiza con con la variable antes creada "const connection" el metodo  es: connection.query('ACA VA LA CONSULTA SQL', function (error, resultados) { ACA se pasa por console el error si lo hay y el resultado si lo hay}); 
    if (error) {                                                          //Si hay error lo tira por consola
        console.log("se produjo un error" + error.stack );         //error.stack devuelve el error en varios arrays apilados
    }else{
        console.log('ACA ESTA LA TABLA EMPLEADOS');
       resultados.forEach(resultado=> {           // resultados vienen en filas, en un bloque de arrays y hay que printearlos a travez de un bucle // en este foEach cada fila de 'resultados' se va a ir carcando en 'resultado' y en cada vuelta, 'resultado' va a ser printeado hasta haber recorrido todo 'resultados', osea 'resultado' se valua en una fila diferenta cada vuelta del bucle.
        console.log(resultado);  });           //aca se printea cada row de el bloque que entrega 'resultados', 'resultado' se valua con 1 fila por cada vuelta hasta completar el bloque y por cada vuelta printea una fila               
    }                                             
}); 
*/
//------------------------------------------------------HTTP------------------------------------------------------------
let queryHTML="";

const server= http.createServer((request, response)=> { 
    connection.query('SELECT * FROM empleados', function (error, resultados){
        if (error) {                                                          
            console.log("se produjo un error" + error.stack );   
            }

            let queryHTML="";
            resultados.forEach(resultado=>{
                queryHTML+= `<div>${resultado.nombre}</div>`;
            });
            
            const peticionURL= request.url;                               // guarda la direccion url que ide el cliente al servidor
            response.writeHead(200, {'Content-Type': 'text-html'});  
    response.write(`
        <html>
            <head>
                <title>Mi primera pagina con NODE</title>
            </head>
            <body>
                Hola mundo
                ${queryHTML}
                <h1>Nuestra url es ${peticionURL}</h1>
            </body>
        </html>
    `);
        response.end();  
            
    }); 
    
});




server.listen(3000);     // Se inicia el servidor que queda escuchando por el puerto 3000
console.log('Servidor http iniciado, escuchando por el port 3000');








//connection.end(); //Si hay un metodo para que la conexion se abra, tabien hay uno para que se cierre
