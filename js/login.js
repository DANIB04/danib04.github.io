document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const correctUsername = "admin";
    const correctPassword = "1234";

    if (username === correctUsername && password === correctPassword) {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid username or password!";
    }
});
