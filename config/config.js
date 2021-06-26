// aca va toda la info de las credenciales para conectarse a la BBDD

const mysqlConfig = {  
    host     : 'localhost',                  // localhost esta en la computadora es el workbench local
    user     : 'root',                        // usuario de workbench
    password : 'Telechubi646',                //pass de workbench
    database : 'personas'    // Tambien puede ser utn                      //base de datos de workbench
};

module.exports = mysqlConfig;   // Así se logra exportar un el objeto mysqlConfig para que pueda ser usad (required) en otro archivo JS