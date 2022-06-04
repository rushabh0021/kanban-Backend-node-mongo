const Router = require('express');
const taskRoutes = require('./task.controller');

const router = Router();

// /api/task
router
    .route('/')
    .get(taskRoutes.getMany)
    .post(taskRoutes.createOne)

router
    .route('/:id')
    .get(taskRoutes.getOne)
    .put(taskRoutes.updateOne)
    .delete(taskRoutes.removeOne)

module.exports = { taskRouter: router };