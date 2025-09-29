/** esto es solo para facilitar el desarrollo de los controladores
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

// este controller tiene todos los controladores de las secciones publicas de la pagina// como la bienvenida 

// Node modules
const path = require('path');

// my modules 
const rootPath = require('../utils/rootPath');

exports.getWelcome = (req, res, next) => {
    res.render('welcome', {
        pageTitle: 'Gestor de Tareas',
        pageDescription: 'Organiza tu vida, alcanza tus metas'
    });
};