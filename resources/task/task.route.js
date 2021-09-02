const Router = require('express');
// const { removeOne, updateOne, getMany, getOne, createOne } = require('./task.controller');
const { getOne, createOne } = require('./task.controller');

const router = Router();

// /api/task
router
    .route('/')
    .get(getOne)
    .post(createOne)

/* router
    .route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(removeOne) */

module.exports = { taskRouter: router };