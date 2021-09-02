/* const { removeOne, updateOne, getMany, getOne, createOne} = require('../../utility/crud'); */
const { getOne, createOne } = require('../../utility/crud');
const { Task } = require('./task.model');

/* module.exports = {
    removeOne: removeOne(Task),
    updateOne: updateOne(Task),
    getMany: getMany(Task),
    getOne: getOne(Task),
    createOne: createOne(Task)
} */
module.exports = {
     getOne: getOne(Task),
    createOne: createOne(Task)
 };