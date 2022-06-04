const Router = require('express');
const boardRoutes = require('./board.controller');

const router = Router();

// /api/task
router
    .route('/')
    .get(boardRoutes.getMany)
    .post(boardRoutes.createOne)

router
    .route('/:id')
    .get(boardRoutes.getOne)
    .put(boardRoutes.updateOne)
    .delete(boardRoutes.removeOne)

module.exports = { boardRoutes: router };