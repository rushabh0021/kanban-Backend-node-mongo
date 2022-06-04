/* const { removeOne, updateOne, getMany, getOne, createOne} = require('../../utility/crud'); */
const controller = require('../../utility/crud');
const { Task } = require('./task.model');

module.exports = {
    removeOne: controller.removeOne(Task),
    updateOne: controller.updateOne(Task),
    getMany: controller.getMany(Task),
    getOne: controller.getOne(Task),
    createOne: controller.createOne(Task)
}
