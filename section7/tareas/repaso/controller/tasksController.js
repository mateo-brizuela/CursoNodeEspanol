/** esto es solo para facilitar el desarrollo de los controladores
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

// node modules
const path = require('path');

// my modules
const rootPath = require('../utils/rootPath');
const Task = require('../models/task');


// controllers/tasksController.js
// Los demás métodos siguen igual por ahora
exports.getTasks = (req, res, next) => {
    Task.fetchAll((tasks) => { // 👈 Ahora es estático, no necesita instancia
        res.render('task-list', {
            pageTitle: 'Todas las Tareas - Gestor de Tareas',
            tasks: tasks // Ahora las tareas vienen con friendlyId
        });
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
    const task = new Task(req.body.title, req.body.description); // crea una nuva tarea desde el modelo(constructor)
    task.save(); // se guarda la tarea nueva en el arreglo y se escribe en el JSON 

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
  // Soporta /tasks/delete-task/:friendlyId o /tasks/delete-task/:id
  const friendlyId = req.params.friendlyId || req.params.id;

  Task.deleteByFriendlyId(friendlyId, (success) => {
    if (success) {
      return res.redirect('/tasks/read-tasks');
    }
    // Si no se encontró, devolvemos 404 o podés redirigir igual
    return res.status(404).send('Error: tarea no encontrada');
  });
};

exports.postCompleteTask = (req, res, next) => {
    // Marcar como completada
    res.send('funcion a desarrollar :)');
};