console.log('es una app con NODE');


//------------------------------CREACIÓN DE PAQUETES------------------------------__--------------------------------------- 
const mysql = require('mysql2'); // requiere el MODULO mysql que descargó de NPM, se llama a travez de la variable mysql, Se utiliza mysql2 por cuestiones de autenticación

const http= require('http'); // requiere el MODULO HTTP para crear un servidor web


const mysqlConfig = require('./config/config'); // con esto se importa los datos de la bbdd de config.js  
//_________________________________________________________________________________________________________________






//------------------------------CREACIÓN DE OONEXIONES Y SERVIDORES------------------------------------------------------------------
// metodo que crea la conexion y pide algunos argumentos
const connection = mysql.createConnection(mysqlConfig);//ingresa la info de la bbdd que esta en la carpeta config/config.js

const server= http.createServer((request, response)=> {  //Aca se crea en la const server, un servidor http (web) que requiere de un request listener que es la arrow function que toma como parametro a request (por si necesita datos del cliente) y response(lo que se le va a responder al cliente cuando le pregunte algo al server).

    //Se arma por pedazos una respuesta http (header + body), que le va a mandar el servidor al browser para que este lo interprete
    
    //ESTE es el header 
    response.writeHead(200, {'Content-Type': 'text-html'});   //esto escribe el header de la respuesta que devuelve el server|| 200 significa que la peticion es correcta y que la request fue exitosa. Luego se le pasa un objeto con un header

    //ESTE es el body donde se va a poner en STRINGS todo lo que se va a devolver al cliente
    response.write(`

        <html>
            <head>
                <title>Mi primera pagina con NODE</title>
            </head>

            <body>
                Hola mundo
            </body>
        </html>

    `);

        response.end();  //Finliza la respuesta del servidor al cliente
});

//_________________________________________________________________________________________________________________






//------------------------------INICIO DE LA CONECCION A LA BBDD---------------------------------------------------
connection.connect(function(error){                         // levanta la conexión  contra workbench
    if (error) {
        console.log("se produjo un error" + error.stack ); //error.stack devuelve el error en varios arrays apilados
        return;    // corta la ejecución del programa y no deja que salga el console.log siguiente
    }else{
        console.log("La conexion fue exitosa!");  //si todo ssale bien,  se manda por console un ok
    }
});  




server.listen(3000);     // Se inicia el servidor que queda escuchando por el puerto 3000
console.log('Servidor http iniciado, escuchando por el port 3000');


//_________________________________________________________________________________________________________________









//-------------------------BLOQUE DE PETISION QUERY SQL A BASE DE DATOS WORKBENCH-----------------------------------------

connection.query('SELECT * FROM empleados', function (error, resultados) {  //la petision a la base de datos se realiza con con la variable antes creada "const connection" el metodo  es: connection.query('ACA VA LA CONSULTA SQL', function (error, resultados) { ACA se pasa por console el error si lo hay y el resultado si lo hay}); 
    if (error) {                                                          //Si hay error lo tira por consola
        console.log("se produjo un error" + error.stack );         //error.stack devuelve el error en varios arrays apilados
    }else{
        console.log('ACA ESTA LA TABLA EMPLEADOS');
       resultados.forEach(resultado=> {           // resultados vienen en filas, en un bloque de arrays y hay que printearlos a travez de un bucle // en este foEach cada fila de 'resultados' se va a ir carcando en 'resultado' y en cada vuelta, 'resultado' va a ser printeado hasta haber recorrido todo 'resultados', osea 'resultado' se valua en una fila diferenta cada vuelta del bucle.
        console.log(resultado);  });           //aca se printea cada row de el bloque que entrega 'resultados', 'resultado' se valua con 1 fila por cada vuelta hasta completar el bloque y por cada vuelta printea una fila               
    }                                             
}); 
//__________________________________________________________________________________________________________________




















connection.end(); //Si hay un metodo para que la conexion se abra, tabien hay uno para que se cierre