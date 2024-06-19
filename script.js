function verificarContraseña() {
    const contraseña = prompt("Ingrese la contraseña:");
    if (contraseña === "Dani") {
        window.location.href = "C:/Users/bdani/OneDrive/Escritorio_Portatil/WEBS/DANIB04.github.io/Animes";
    } else {
        alert("Contraseña incorrecta. No tiene acceso.");
    }
}