const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.post('/clientes', clientesController.criarUsuario);
router.post('/clientes/login', clientesController.loginCliente);
router.put('/clientes/:id', clientesController.atualizarCliente);
router.delete('/clientes/:id', clientesController.deletarCliente);
router.put('/clientes/:id/senha', clientesController.trocarSenha);


module.exports = router;