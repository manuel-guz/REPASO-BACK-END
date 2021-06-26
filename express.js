const express=require('express');  // se comienza requieriendo express para inicializarlo
// DEPRECATED --->  const bodyParser = require('body-parser'); // se queriere bodyparser para poder obtener post o put del cliente encriptados como las passwords y que no queden expuestas en la barra url
const app= express(); //Se inicializa express, por nomenclatura se le llama "app" a las aplicaciónes de express, esto es una funcion constructora que nos va a generar un servidor



//Metodos:
//Expres a diferencia del ejemplo server.js que esta hacho con NODE, ya sabe que esta respoondiendo HTTP y hace todo automaticamente((por ejemplo responde el código 200 y el encabezado html header etc...))

app.get('/', function(req, res){  // metodo get para que el servidor se quede escuchando peticiones GET del lado del cliente, que son las que se hacen a travez del browser| se coloca '/' para que responda a cualquier petision que haga el cliente, y se le pasa una funcion que va a recibir un request y un response

    res.send('Hola mundo');   // El metodo send logra responde el string como respuesta a cualquier petision por parte del cliente  que recibe el get
    console.log('se requirió la pagina home');
});


//Express tambien tiene una capa de ENRUTAMIENTO, por lo que si se hace un get a otra direccion va a poder resolverla y responder
app.get('/contacto', function(req, res){
    
    const gente=[                               // ACA se intenta devolver los nombres pero en formato JSON que es la forma en que una API REST responde siempre
        'Berni',
        'Nico',
        'Dani',
        'Vane',
    ];
    /*--------------------------------------- JSON-->OBJETO || OBJETO-->JSON--------------------------------------
    const variableJson= JSON.stringify(gente); // Este objeto JSON.stringify()  permite transformar a JSON string, cualquier array que se le ingrese, en este caso el formato JSON es guardado dentro de la variable variableJson
    console.log(variableJson);   //Este JSON es solo para enviar al front y no se puede manipular en NODE, para eso hay que pasarlo a un objeto JS como un array js.
    const ObjetoJavaScript = JSON.parse(variableJson); // Tambbien existe la posibilidad de pasar de un JSON a un objeto javascript en este caso un array.
    console.log(ObjetoJavaScript); //Para manipular un JSON string hay que pasarlo a un objeto JS como por ejemplo un array.
    res.send(variableJson);  // COMO TODA API REST, DEVUELVE AL CLIENTE UN JSON
    */

    res.json(gente);  // No solo transforma un array JS a JSON string si no que tambien se encarga de modificar el header y todas las configs correspondientes para que esto funcione como si fuera una API REST de JSON ||Para evitar tener que transformar y destransformar en JSON para comunicarse con el front, express brinda un metodo conversor que realiza este trabajo, send.json(); transforma un objeto array que es manipulable en un string JSON para ser enviado al cliente
});





/*
app.post('/', function(req, res){     // Tambien se puede responder a una petición POST del lado del cliente.

    res.send('Respuesta a un POST');
});
*/
app.put('/', function(req, res){      // Lo mismo para un PUT
    res.send('Respuesta a un PUT');
});


app.delete('/', function(req, res){     //Lo mismo para un DELETE y cualquier vervo igual
    res.send('Respuesta a un DELETE');
});


//-------------------------USO DE REQUEST PARA OBTENER DATOS DEL CLIENTE a /consulta ---------------------------------------------

let gente=[        // esre array se pone global para que todas los endpoints puedan trabajar con él y let para que pueda ser modificada                   
    'Berni',
    'Nico',
    'Dani',
    'Vane',
];


//Es importante que el MIDDLEWARE se haga antes de cualquier funcion que la valla a desencadenar ya que express va registrando las rutas por orden

app.get('/consulta', function(req, res){

    const filtroNombre= req.query.nombre;  //En filtroNombre se guarda la request que viene del cliente (POSTMAN), postman manda al servidor una QUERY que se llama nombre y su valor es Nico en este caso.
    console.log(filtroNombre);  //Aca se logra mostrar en la consola el valor de la query que el cliente consulta al servidor
    
    let genteFiltrada;
// En el caso de que  la consulta del cliente este vacia, se retornará todo el array. Si la consulta tiene un nombre que este en el array, se devolvera ese nombre y en el caso que no coincida no se devolera nada.
    if (filtroNombre) {  // Poniendo solo la variable dentro de un if, JS revisa varias cosas: que la variable no sea undefined o null, y que si es un string NO este vacio
    genteFiltrada= gente.filter(g => {  // .filter()   recorre todos los elementos del array y si la funcion que le pasamos retorna true, genera otro array con todos los que haya retornado true
    return g === filtroNombre; });      // en este caso g toma el valor de cada elemento del array y retorna solo los elementos donde g es igual a filtroNombre (el valor de la query que envio el cliente). En caso de que g sea igual que filtoNombre, mete ese valor del array en la variable genteFiltrada
    }else{
    genteFiltrada=gente;
    }

    res.json(genteFiltrada);  //El servidor devulve a la pagina, el nombre  del array gente que matchea con el valor de la query que mando el cliente
}); 



//bodyParser esta fuera de uso pero funciona igual, debe haber una version mas nueva y actualizada
//app.use(bodyParser.json()); // Aca se puede ingresar una funcion que se desea ejecutar cada vez que se llame a otra función. Estas funciones se llaman MIDDLEWARE
//bodyParser.json()  es un complemento para que cuando se manda un post al servidor, express pueda leer el JSON que se envia en el body de la query

app.use(express.json()); // esta es la version que esta en uso, se lo pone para luego poder usar req.body


//En POSTMAN se manda un post con un parametro en la parte de Body y en formato JSON y se envia en json un parametro {"nombre":"Nico"} por ejemplo
app.post('/consulta', function(req, res){     // aca se recibe parametros del cliente que no se muestran en la barra URL
    //res.send('Usuario agregado'); //No se puede devolver 2 res. , la response tiene que ser 1. Si se pone un res.send, en el mismo endpoint no se puede poner luego un res.json.
    const body = req.body;         //(requiere el express.json())  Luego de que la middleware transforme a json el input del cliente, req.body transforma a un objeto JS el array y lo guarda en la variable body listo para ser manipulado
    gente.push(body.nombre);  // Push ingresa en el array gente un nuevo valor que en este caso es req.body que es el valor que mando por body el cliente
    res.json({message:'Persona ingresada exitosamente', cantidadPeronas: gente.length, nombreUsuario: body.nombre});//se devuelve formato JSON la cantidad de gente y el usuario nuevo
    
});  // cada vez que noremon reinicie el server, se van a borrar los usuarios agregados ya que el array cada vez que se vuelve a correr el codigo se pisa con los nombres codeados, esto se resuelve con una bbdd






app.delete('/consulta', function (req, res) { //Eliminarun parametro del array a travez del body de la query
    const genteABorrar = req.query.nombre;    // se obtiene el nombre que el cliente paso por parametro
    if (!genteABorrar) {  //Si esta vacia la query se retorna un msj
        return res.json({error: true, message: "Tiene que enviar una persona a borrar"});
    }

    gente=gente.filter(g => {      //si tiene un nombre, se filtra el array dejando todos los nombres que NO sean el que paso la query, de esta forma se lo borra filtrando el que se quiere borrar y sacandolo del array
        return g !== genteABorrar;// se retorna el array sin el parametro genteABorrar
    });

    res.json({message: 'Usuario ' + genteABorrar + ' eliminado exitosamente', cantidadPersonas: gente.length  });//se devuelve usuario borrado, cantidad totale del array
});


app.listen(4000, ()=> { console.log('Aplicación Express funcionando');}); //Se le pasa el puerto por donde va a estar escuchando las peticiones 