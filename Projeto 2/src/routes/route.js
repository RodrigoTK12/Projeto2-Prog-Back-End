const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const ticketController = require('../controllers/ticketController')
const compraController = require('../controllers/compraController')
const { verifyToken, verifyAdmin } = require('../utils/authMiddleware')

router.get('/register', (req, res) => res.render('register'))
router.post('/register', userController.registrarUsuario)
router.get('/login', (req, res) => res.render('login'))
router.post('/login', userController.login)
router.get('/logout', userController.logout)

router.get('/home', verifyToken, ticketController.listarIngressos)
router.post('/comprar', verifyToken, compraController.realizarCompra)

router.post('/admin/ingresso', verifyToken, verifyAdmin, ticketController.criarIngresso)

module.exports = router