const express=require('express');  // se comienza requieriendo express para inicializarlo
// DEPRECATED --->  const bodyParser = require('body-parser'); // se queriere bodyparser para poder obtener post o put del cliente encriptados como las passwords y que no queden expuestas en la barra url
const app= express(); //Se inicializa express, por nomenclatura se le llama "app" a las aplicaciónes de express, esto es una funcion constructora que nos va a generar un servidor

const mysql = require('mysql2'); //modulo mysql para conctarnos

const mysqlConfig = require ('./config/config');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(function(error){                         // levanta la conexión  contra workbench
    if (error) {
        console.log("se produjo un error" + error.stack ); 
        return;                                           
    }else{
        console.log("La conexion contra WORKBENCH fue exitosa!");  
    }
});  


app.get('/empleados', (req, res)=>{
    connection.query('SELECT * FROM empleados', function (error, resultado) {
            if (error) {
            console.error(error);
            return;
            }
            res.json(resultado);
    });
});


app.listen(4000, ()=>{
    console.log('La aplicación express se inicio exitosamente');
});
