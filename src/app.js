const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const cookie = require('express-session/session/cookie');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

const clientesRoutes = require('./routes/clientesRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');

app.use('/', clientesRoutes);
app.use('/api', pomodoroRoutes);

app.get('/cadastro', (req, res) => {
    res.render('pages/cadastro');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/paginaPrincipal', (req, res) => {
    res.render('pages/paginaPrincipal', { tempo: '25:00' }); // Exemplo
});

app.get('/paginaSecundaria', (req, res) => {
    res.render('pages/paginaSecundaria');
});

app.get('/configurar', (req, res) => {
    res.render('pages/configurar');
});

module.exports = app;