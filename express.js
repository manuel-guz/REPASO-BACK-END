const express=require('express');  // se comienza requieriendo express para inicializarlo

const app= express(); //Se inicializa express, por nomenclatura se le llama "app" a las aplicaciónes de express, esto es una funcion constructora que nos va a generar un servidor

//Metodos:
//Expres a diferencia del ejemplo server.js que esta hacho con NODE, ya sabe que esta respoondiendo HTTP y hace todo automaticamente((por ejemplo responde el código 200 y el encabezado html header etc...))

app.get('/', function(req, res){  // metodo get para que el servidor se quede escuchando peticiones GET del lado del cliente, que son las que se hacen a travez del browser| se coloca '/' para que responda a cualquier petision que haga el cliente, y se le pasa una funcion que va a recibir un request y un response

    res.send('Hola mundo');   // El metodo send logra responde el string como respuesta a cualquier petision por parte del cliente  que recibe el get
    console.log('se requirió la pagina home');
});


//Express tambien tiene una capa de ENRUTAMIENTO, por lo que si se hace un get a otra direccion va a poder resolverla y responder
app.get('/contacto', function(req, res){
    res.send('Esta es la pagina contacto');
});



app.listen(4000, ()=> { console.log('Aplicación Express funcionando');}); //Se le pasa el puerto por donde va a estar escuchando las peticiones 