const mongoose = require("mongoose");
const dburl = require('../config/config');

module.exports = {
    connect: (url = dburl.url, opts = {}) => {
        return mongoose.connect(
            url,
            { ...opts, useNewUrlParser: true }
        )
    }
}
