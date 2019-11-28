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


app.get("/instalador", (request, res) => {

    mongo.connect(
        app_config.db_url,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        (err, client) =>{
            if(err) return null;

            const db = client.db('tienda');
            let collection_clients  =  db.collection('productos');

            
            collection_clients.findOne({ slug: 'las-nuevas-mujeres-camiseta' })
                .then(items => {
                    if(!items){
                        const data = [
                            {
                              "_id": "5dd4917d4d15e41630edbd32",
                              "name": "ROCKBROS pantalones",
                              "price": 25.00,
                              "image": "buzos/ROCKBROS-pantalones.jpg",
                              "gender": "2",
                              "category": "2",
                              "slug": "rockbros-pantalones"
                            },
                            {
                              "_id": "5dd4927d2c34f911ac041871",
                              "name": "ROCKBROS Culote Largo",
                              "price": 19.99,
                              "image": "buzos/ROCKBROS-Culote-Largo.jpg",
                              "gender": "2",
                              "category": "2",
                              "slug": "rockbros-culote-largo"
                            },
                            {
                              "_id": "5dd4935a48831e17786a9988",
                              "name": "Ropa Deportiva transpirable",
                              "price": 14.66,
                              "image": "buzos/Ropa-Deportiva-transpirable.jpg",
                              "gender": "1",
                              "category": "2",
                              "slug": "ropa-deportiva-tanspirable"
                            },
                            {
                              "_id": "5dd493e5c514753a00352350",
                              "name": "Conjunto de deporte para correr",
                              "price": 7.99,
                              "image": "buzos/Conjunto-de-deporte-para-correr.jpg",
                              "gender": "1",
                              "category": "2",
                              "slug": "conjunto-de-deporte-para-correr"
                            },
                            {
                              "_id": "5dd4947a2bb1c4089089c6a8",
                              "name": "Camisetas Polo informales",
                              "price": 10.10,
                              "image": "polos/Camisetas-Polo-informales.webp",
                              "gender": "2",
                              "category": "3",
                              "slug": "camisetas-polo-informales"
                            },
                            {
                              "_id": "5dd494e338b8d91d0c91ed9e",
                              "name": "Camiseta de Polo de oficina",
                              "price": 12.47,
                              "image": "polos/Camiseta-de-Polo-de-oficina.jpg",
                              "gender": "2",
                              "category": "3",
                              "slug": "camiseta-de-polo-de-oficina"
                            },
                            {
                              "_id": "5dd4958bc706f022bc1d1ac0",
                              "name": "Camiseta mujer 2019 mujer rayas",
                              "price": 9.37,
                              "image": "polos/Camiseta-mujer-2019-mujer-rayas.jpg",
                              "gender": "1",
                              "category": "3",
                              "slug": "camiseta-mujer-2019-mujer-rayas"
                            },
                            {
                              "_id": "5dd4968683f66234ac09d289",
                              "name": "Las nuevas mujeres camiseta",
                              "price": 9.37,
                              "image": "polos/Las-nuevas-mujeres-camiseta.webp",
                              "gender": "1",
                              "category": "3",
                              "slug": "las-nuevas-mujeres-camiseta"
                            }
                          ];
                        collection_clients.insert(data);

                        res
                                .status(200)
                                .json({ 
                                    status: "OK", 
                                    msj: "Se guardo correctamente" 
                                });

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


app.get("/product", (request, res) =>{

    mongo.connect(
        app_config.db_url,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        (err, client) =>{
            if(err) return null;

            var  mongoPromise = () => {
                return new Promise((resolve, reject) =>{
                    client.db('tienda').
                        collection("productos").
                        find( {  } )
                        .toArray(function(err, data){
                            err ? reject(err) : resolve(data);
                        });
                });
            };

            var callMongoPromise = async () => {
                try {
                var result =  await (mongoPromise());
                res
                    .status(200)
                    .json({ 
                        status: "OK", 
                        data: result
                    });
                } catch (excepcion) {
                        console.log("error");
                }
            };

            callMongoPromise().then((result) => {
                result
            });

        }
    );

});


app.post("/product/filter", (request, res) =>{

    var error = 0;
    var data = {};
    var arrayCategory =  request.body.category;
    var arrayGender =  request.body.gender;
    var price =  request.body.price;


    mongo.connect(
        app_config.db_url,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        (err, client) =>{
            if(err) return null;

            console.log("arrayCategory => ", arrayCategory);
            console.log("arrayGender => ", arrayGender);
            
            var range = null;
            switch(price){
                case "1": range = {$gte : 0, $lte : 10}; break;
                case "2": range = {$gte : 10, $lte : 15}; break;
                case "3": range = {$gte : 15}; break;
            }

            var data = {};
            if(arrayCategory.length > 0) data.category = {$in : arrayCategory};
            if(arrayGender.length > 0) data.gender = {$in : arrayGender};
            if(range != null) data.price = range;
            

            var  mongoPromise = () => {
                return new Promise((resolve, reject) =>{
                    client.db('tienda')
                        .collection("productos")
                        .find( data )
                        .toArray(function(err, data){
                            err ? reject(err) : resolve(data);
                        });
                });
            };

            var callMongoPromise = async () => {
                var result =  await (mongoPromise());
                res
                    .status(200)
                    .json({ 
                        status: "OK", 
                        tipo: "Filtro", 
                        data: result
                    });
            };

            callMongoPromise().then((result) => {
                result
            });

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
    var dni =  request.body.dni;
    var correo =  request.body.correo;

    var celular =  request.body.celular;
    var direccion =  request.body.direccion;
    var numTarjeta =  request.body.numTarjeta;
    var genero =  request.body.genero;
    
    var departamento =  request.body.departamento;
    var provincia =  request.body.provincia;
    var distrito =  request.body.distrito;

    var productos =  request.body.productos;
    

    switch (true) {
        case nombres == "": error++; break;
        case apellidos == "": error++; break;
        case dni == "": error++; break;
        case correo == "": error++; break;
        
        case celular == "": error++; break;
        case direccion == "": error++; break;
        case numTarjeta == "": error++; break;
        case genero == "": error++; break;
        
        case departamento == "": error++; break;
        case provincia == "": error++; break;
        case distrito == "": error++; break;
        default: error = 0; break;
    }

    if(error > 0) {
        res.send({ 
            status: "ERROR",
            msj: "Por favor complete todos los campos para poder guardar."
        });
    }
    else{
        var ordenCompra = "orden-" + Math.floor(Math.random() * 999999);
        data = {
            orderCompra: ordenCompra,
            nombres: nombres,
            apellidos: apellidos,
            dni: dni,
            correo: correo,

            celular: celular,
            direccion: direccion,
            numTarjeta: numTarjeta,
            genero: genero,

            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            productos: productos
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
                const db = client.db('tienda');
                let collection_clients  =  db.collection('orden_compra');
                    collection_clients.insertOne(data);
               
                        res
                            .status(200)
                            .json({ 
                                status: "OK", 
                                msj: "Se guardo correctamente",
                                ordenCompra: ordenCompra
                            });
            }
        );
    }
});





app.listen("8085", () => { console.log("Se inicio servicio"); });