<?php
// Datos de usuarios y contraseñas
$users = [
    'dani' => '1234',
    'lidia' => '1234'
];

// Obtener datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Verificar credenciales
if (isset($users[$username]) && $users[$username] === $password) {
    // Redirigir según el usuario
    if ($username === 'user1') {
        header('Location: https://www.youtube.com/');
    } elseif ($username === 'user2') {
        header('Location: https://www.amazon.com/');
    }
    exit();
} else {
    echo "Usuario o contraseña incorrectos.";
}
?>
