// node modules
const path = require('path');
const fs = require('fs');

// my modules 
const rootPath = require('../utils/rootPath');
const dataPath = path.join(rootPath,'data','tasks.json');

const getTasksFromFile = (cb) =>{
    fs.readFile(dataPath,(err,fileContent)=>{
        if(err){
            return cb([]); // si hubo un error al leer el archivo devuelve un json vacio
        }
        cb(JSON.parse(fileContent)) // ejecuta el callback pasando todos los objetos en el json 
    });
}

module.exports = class Task {
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
        this.id = Date.now().toString();
        this.completed = false;
        this.createdAt = new Date();
    }

}