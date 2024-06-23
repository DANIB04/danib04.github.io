const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = {
        'persona1': { password: 'password1', directory: 'persona1' },
        'persona2': { password: 'password2', directory: 'persona2' }
    };

    if (users[username] && users[username].password === password) {
        res.redirect(`/${users[username].directory}`);
    } else {
        res.send('Usuario o contraseña incorrectos. <a href="/">Volver a intentar</a>');
    }
});

app.get('/:userDir', (req, res) => {
    const userDir = req.params.userDir;
    const usersDirs = ['persona1', 'persona2'];

    if (usersDirs.includes(userDir)) {
        res.sendFile(path.join(__dirname, 'public', userDir, 'index.html'));
    } else {
        res.status(404).send('No se encontró el contenido.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
