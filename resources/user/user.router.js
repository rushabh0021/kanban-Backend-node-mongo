const { me, updateMe } = require('./user.controller');
const { Router } = require('express');


const router = Router();

router.get('/', me);
router.put('/', updateMe);

module.exports =  router ;

