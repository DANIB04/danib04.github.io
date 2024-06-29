<?php
// Datos de usuarios y contraseñas
$users = [
    'user1' => 'password1',
    'user2' => 'password2'
];

// Obtener datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Verificar credenciales
if (isset($users[$username]) && $users[$username] === $password) {
    // Redirigir según el usuario
    if ($username === 'user1') {
        header('Location: index_user1.html');
    } elseif ($username === 'user2') {
        header('Location: index_user2.html');
    }
    exit();
} else {
    echo "Usuario o contraseña incorrectos.";
}
