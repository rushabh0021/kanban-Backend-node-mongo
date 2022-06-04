const controller = require('../../utility/crud');
const { Board } = require('./board.model');

module.exports = {
    removeOne: controller.removeOne(Board),
    updateOne: controller.updateOne(Board),
    getMany: controller.getMany(Board),
    getOne: controller.getOne(Board),
    createOne: controller.createOne(Board)
}
