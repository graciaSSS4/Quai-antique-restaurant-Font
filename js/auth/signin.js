//Implémenter une javascript de ma page

(function () {
  const inputEmail = document.getElementById("EmailInput");
  const inputPassword = document.getElementById("PasswordInput");
  const btnSingin = document.getElementById("btnSingin");
  const signinForm = document.getElementById("signinForm");

  btnSingin.addEventListener("click", checkCredentials);

  function checkCredentials() {
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(signinForm);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      username: dataForm.get("Email"),
      password: dataForm.get("Password"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          inputEmail.classList.add("is-invalid");
          inputPassword.classList.add("is-invalid"); // red
        }
      })

      .then((result) => {
        //Il faudra récupérer le vrai token
        const token = result.apiToken;
        setToken(token);

        //placer ce token en cookie
        setCookie(roleCookieName, result.roles[0], 7);
        window.location.replace("/");
      })
      .catch((error) => console.error(error));
  }
})();
