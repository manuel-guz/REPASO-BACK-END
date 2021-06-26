const express = require('express');
const mysql = require('mysql2');
const app = express();

const mysqlConfig = require('./config/config');
const connection = mysql.createConnection(mysqlConfig);

connection.connect((error)=>{
    if (error) {
        console.error(error);
    process.exit();// mata la app de node y el server ya no se quedara escuchando
    }
    console.log('Conectado correctamente');

});
// ENDPOINT de status de servidor
app.get('/api/health', function(req, res){
    res.json({message: 'App de login corriendo adecuadamente'});
});

//MIDDLEWARE para procesar el JSON que envia el front y lo pase a objeto JS
app.use(express.json());

//ENDPOINT para crear usuarios
app.post('/api/user',(req, res)=>{//por norma las rutas se escriben primero poniendo /api/asdfg
    const body= req.body;
    connection.query(`INSERT INTO usuarios VALUES (null, '${body.email}', '${body.password}', '${body.nombre}', '${body.edad}', '${body.foto_perfil}')`,(error, result)=>{ //generalmente aca tiene que haber la misma cantidad de columnas que en sql, el cliente puede llenarlas todas o no
        if (error){
            console.error(error);
            return res.json({ message: 'No se pudo crear un usuario'});
        };
        return res.json({message: 'El usuario ha sido creado con exito'});
        });
});

//validacion de usuarios (login), usamos un POST, porque el GET (teoricamente es el que se deberia usar), pasa la información por URL, y no es seguro que la info este a la vista de todos, por lo que se usa un post para que los datos vallan por body

app.post('/api/login', (req, res)=> {
    const body = req.body;
    console.log(body);
    connection.query(
        `SELECT id, email, nombre, edad, foto_perfil FROM usuarios WHERE email = '${body.email}' AND password = '${body.password}'`, (error, result)=>{
            if (error) {
                console.error(error);
                return res.json({message: 'Error inesperado'});
                
            }
            if (result.length> 0) {
                res.json({message: 'usuario logeado exitosamente', Data: result[0]}); // como siempre va a devolver nada o 1 usuario, por eso se pone result[0] para que no envie dentro de los { [] } unos corchetes de array si no que devuelva el primer elemento del array [0] que es el la info del primer usuario. esto nos deja la info sin corchetes limpia para acceder solo dentro de las lllaves de JSON
            }else{
                return res.json({message:'Usuario o contraseña incorrectos'});
            }
        }
    );
});








app.listen(5000, ()=>{
    console.log('El servior ya arrancó');
});