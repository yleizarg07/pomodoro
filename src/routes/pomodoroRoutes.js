const express = require('express');
const router = express.Router();
const pomodoroController = require('../controllers/pomodoroController');

router.post('/sessoes', pomodoroController.criarSessao);
router.get('/tempo', pomodoroController.getTempo);
router.post('/tarefas', pomodoroController.criarTarefa);
router.get('/tarefas', pomodoroController.getTarefas);
router.put('/tarefas/:id', pomodoroController.atualizarTarefa);

module.exports = router;