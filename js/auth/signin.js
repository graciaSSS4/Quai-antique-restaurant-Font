//Implémenter une javascript de ma page

const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSingin");

btnSingin.addEventListener("click", checkCredentials);

function checkCredentials() {
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    if (EmailInput.value == "test@gmail.com" && PasswordInput.value == "123") {
        alert("Vous êtes bien connecté !");

        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);
        
        //placer ce token en cookie
        

        window.location.replace("/");

    } else {
        EmailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");  // red

    }
}

