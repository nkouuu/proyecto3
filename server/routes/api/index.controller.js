const express = require('express');
const router  = express.Router();

const authRoutes = require('./authentication.controller');
const recosRoutes = require('./recos.controller')
const replyRoutes = require('./reply.controller')
const usersRoutes = require('./users.controller')

router.use('/', authRoutes);
router.use("/recos",recosRoutes)
router.use("/replies",replyRoutes)
router.use("/users",usersRoutes)

module.exports = router;
