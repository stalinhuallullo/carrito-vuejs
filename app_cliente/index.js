// node index.js
const express = require("express");
const bodyParser = require("body-parser");
const mongo = require('mongodb').MongoClient;
const cors = require("cors");
const app = express();


/*const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
};*/


const app_config = {
    db_url: 'mongodb://localhost:27017/',
    user: '',
    password: ''
}


app.use(cors());
app.use(bodyParser.json());


app.get("/", (request, res) => {
    
    mongo.connect(
        app_config.db_url,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        (err, client) =>{
            if(err){
                console.log("err", err);
                return null;
            }
            const db = client.db('test');
            let collection_clients  =  db.collection('clients');

            collection_clients.findOne({ nombres: 'Vittorio' })
                .then(items => {
                    if(!items){
                        collection_clients.insertOne({ nombres: 'Vittorio', apellidos: '' });

                        if(err){
                            console.log("err", err);
                            res
                                .status(200)
                                .json({ 
                                    status: "OK", 
                                    msj: "Se guardo correctamente" 
                                });
                        }

                    }
                    else{
                        res
                                .status(200)
                                .json({ 
                                    status: "OK", 
                                    msj: "Ya existe la persona" 
                                });
                    }
                    
                })
        }
    );

    


});

app.get("/ubigeo", (request, res) =>{
    res
        .status(200)
        .json({
            status: "ok",
            data: [
                { id: 1, name: 'Lima', parent: 0 },
                { id: 2, name: 'Arequipa', parent: 0 },
                { id: 3, name: 'Cajamarca', parent: 0 },
                { id: 4, name: 'Tacna', parent: 0 },
                { id: 5, name: 'Lima', parent: 1 },
                { id: 6, name: 'Callao', parent: 1 },
                { id: 7, name: 'Camana', parent: 2 },
                { id: 8, name: 'Arequipa', parent: 2 },
                { id: 9, name: 'San Isidro', parent: 6 }
            ]
        });
});

app.post("/registro", (request, res) => {

    var error = 0;
    var data = {};
    var nombres =  request.body.nombres;
    var apellidos =  request.body.apellidos;
    var correo =  request.body.correo;
    var celular =  request.body.celular;
    var fechaNac =  request.body.fechaNac;
    var genero =  request.body.genero;
    var dni =  request.body.dni;
    var departamento =  request.body.departamento;
    var provincia =  request.body.provincia;
    var distrito =  request.body.distrito;
    var estado =  request.body.estado;
    

    switch (true) {
        case nombres == "": error++; break;
        case apellidos == "": error++; break;
        case correo == "": error++; break;
        case celular == "": error++; break;
        case fechaNac == "": error++; break;
        case genero == "": error++; break;
        case dni == "": error++; break;
        case departamento == "": error++; break;
        case provincia == "": error++; break;
        case distrito == "": error++; break;
        case estado == "": error++; break;
        default: error = 0; break;
    }

    if(error > 0) {
        res.send({ 
            status: "ERROR",
            msj: "Por favor complete todos los campos para poder guardar."
        });
    }
    else{
        data = {
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            celular: celular,
            fechaNac: fechaNac,
            genero: genero,
            dni: dni,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            estado: estado
        };

        mongo.connect(
            app_config.db_url,
            {
                useUnifiedTopology: true, 
                useNewUrlParser: true
            },
            (err, client) =>{
                if(err){
                    return null;
                }
                const db = client.db('test');
                let collection_clients  =  db.collection('clients');
    
                collection_clients.findOne({ correo: correo })
                    .then(items => {
                        if(!items){
                            collection_clients.insertOne(data);
    
                            if(err){
                                res
                                    .status(200)
                                    .json({ 
                                        status: "OK", 
                                        msj: "Se guardo correctamente" ,
                                        data: data
                                    });
                            }
    
                        }
                        else{
                            res
                                .status(200)
                                .json({ 
                                    status: "OK", 
                                    msj: "Ya existe la persona",
                                    data: data
                                });
                        }
                        
                    })
            }
        );
    }
});




app.listen("8081", () => { console.log("Se inicio servicio"); });