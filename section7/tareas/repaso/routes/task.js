// estas rutas contienen todas herramientas utiles para la administracion de tareas agregar tareas, modificarlas 
// y eliminarlas 

// node modules 

// third party modules 
const express = require('express');

//my modules 
const tasksController = require('../controller/tasksController');


const router = express.Router(); // creo el enrutador

router.get('/read-tasks', tasksController.getTasks);
router.get('/completed-tasks', tasksController.getCompletedTasks);
router.get('/add-task', tasksController.getAddTask);
router.post('/add-task', tasksController.postAddTask);
router.get('/edit-task/:id', tasksController.getEditTask);
router.post('/edit-task/:id', tasksController.postEditTask);
router.post('/delete-task/:id', tasksController.postDeleteTask);
router.post('/complete-task/:id', tasksController.postCompleteTask);


module.exports = router;