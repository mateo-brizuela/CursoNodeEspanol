/** esto es solo para facilitar el desarrollo de los controladores
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

// node modules
const path = require('path');

// my modules
const rootPath = require('../utils/rootPath');


// controllers/tasksController.js
// Los demás métodos siguen igual por ahora
exports.getTasks = (req, res, next) => {
    res.render('task-list', {
        pageTitle: 'Todas las Tareas - Gestor de Tareas',
        tasks: [] // Array vacío por ahora
    });
};
exports.getCompletedTasks = (req, res, next) => {
    // Ver tareas completadas
    res.send('funcion a desarrollar :)');
};


exports.getAddTask = (req, res, next) => {
    res.render('add-task', {
        pageTitle: 'Agregar Tarea - Gestor de Tareas',
        actionUrl: '/tasks/add-task',
    });
};

exports.postAddTask = (req, res, next) => {
    // Procesar nueva tarea
    const { title, description } = req.body;
    console.log('Nueva tarea:', { title, description });
    
    // Redirigir después de guardar
    res.redirect('/tasks/read-tasks');
};


exports.getEditTask = (req, res, next) => {
    // Formulario para editar
    res.send('funcion a desarrollar :)');
};

exports.postEditTask = (req, res, next) => {
    // Procesar edición
    res.send('funcion a desarrollar :)');
};

exports.postDeleteTask = (req, res, next) => {
    // Eliminar tarea
    res.send('funcion a desarrollar :)');
};

exports.postCompleteTask = (req, res, next) => {
    // Marcar como completada
    res.send('funcion a desarrollar :)');
};