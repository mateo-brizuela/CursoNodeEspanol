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
        this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9); // ID único técnico
        this.friendlyId = null; // Número amigable para el usuario (se asigna al guardar)
        this.completed = false;
        this.createdAt = new Date();
    }

    save(){
        getTasksFromFile((tasks)=>{
            // Si no tiene friendlyId, asignar el siguiente número secuencial
            if (this.friendlyId === null) {
                this.friendlyId = this._getNextFriendlyId(tasks);
            }
            
            tasks.push(this);
            fs.writeFile(dataPath, JSON.stringify(tasks), (err) => {
                if (err) {
                    console.error('❌ Error guardando tarea:', err);
                } else {
                    console.log('✅ Tarea guardada correctamente');
                }
            });
        });
    }

    // Método privado para calcular el siguiente friendlyId
    _getNextFriendlyId(tasks) {
        if (tasks.length === 0) return 1;
        
        // Encontrar el máximo friendlyId existente
        const maxId = Math.max(...tasks.map(task => task.friendlyId || 0));
        return maxId + 1;
    }

    // Método estático para obtener todas las tareas (sin crear instancia)
    static fetchAll(cb) {
        getTasksFromFile(cb);
    }

    // Método estático para encontrar tarea por friendlyId
    static findByFriendlyId(friendlyId, cb) {
        getTasksFromFile((tasks) => {
            const task = tasks.find(t => t.friendlyId === parseInt(friendlyId));
            cb(task);
        });
    }

    // metodo estatico para eliminar una tarea por su friendlyId
    // metodo estatico para eliminar una tarea por su friendlyId
static deleteByFriendlyId(friendlyId, cb) {
    getTasksFromFile((tasks) => {
        const targetId = parseInt(friendlyId);
        
        // Filtrar la tarea a eliminar - VERSIÓN CORREGIDA
        const filteredTasks = tasks.filter(task => {
            // Asegurarnos de que task.friendlyId sea un número válido
            const taskId = parseInt(task.friendlyId);
            return taskId !== targetId;
        });

        // Verificar si se eliminó alguna tarea
        if (filteredTasks.length === tasks.length) {
            console.log('❌ No se encontró la tarea con ID:', friendlyId);
            console.log('📋 Tareas disponibles:', tasks.map(t => ({ id: t.friendlyId, title: t.title })));
            return cb(false); // No se encontró la tarea
        }

        // Guardar el array filtrado
        fs.writeFile(dataPath, JSON.stringify(filteredTasks), (err) => {
            if (err) {
                console.error('❌ Error eliminando tarea:', err);
                cb(false);
            } else {
                console.log('✅ Tarea eliminada correctamente. ID:', friendlyId);
                cb(true);
            }
        });
    });
}
}