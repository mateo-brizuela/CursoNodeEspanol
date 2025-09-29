const path = require('path');
const fs = require('fs');

// my modules
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) =>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

//const products = [];

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    /* save largo anterior
    save() {
        //products.push(this); ya no lo usamos porque vamos a almacenar los productos en archivos
        const p = path.join(rootDir, 'data','products.json') // direccion donde se almacenan los archivos

        // esta funcion es para leer un archivo, le pasamos la direccion luego
        // podemos tener un error o el contenido del archivo 
        fs.readFile(p,(err, fileContent)=>{
            let products = [];

            if(!err){
                products = JSON.parse(fileContent); // estamos usando el objeto JSOn que esta por defecto en node
                    // luego estamos usando el metodo parse que JSON.parse() sirve para convertir 
                    // un string en formato JSON a un objeto JavaScript. y agregamos todos los productos en el JSON
            }
            products.push(this);

            // estamos usando write file, para escribir el json
            // luego con json.stringify() estamos pasando el arreglo con todos los objetos y lo pasamos a texto 
            // parapoder escribirlos en el json
            fs.writeFile(p,JSON.stringify(products), (err)=>{
                console.log(err);
            }); 
        }); 
        
    }
*/
    save(){
        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), (err)=>{
                console.log(err);   
            });
        });
    }

    static fetchAll(cb){ // vamos a usar un callback ya que esta estrictura de datos es asincrona y no retorna nada
        getProductsFromFile(cb);
    }
}