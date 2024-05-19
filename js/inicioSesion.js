document.getElementById("formularioInicioSesion").addEventListener("submit", function(event) {
    event.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var emailError=document.getElementById("emailError");
    var passwordError=document.getElementById("passwordError");
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailError.textContent="";
    passwordError.textContent="";

    if(password.trim() === "")
    {
        passwordError.textContent="La contraseña no puede estar vacía";
        return;
    }

    if(!regexEmail.test(email) || email.trim() === "")
    {
        emailError.textContent="El mail no cumple con el requisito";
        return ;
    }
    alert("El formulario se envió con exito");
})