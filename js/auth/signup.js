//Implémenter une javascript de ma page

(function () {
  const inputNom = document.getElementById("NomInput");
  const inputPrenom = document.getElementById("PrenomInput");
  const inputMail = document.getElementById("EmailInput");
  const inputPassword = document.getElementById("PasswordInput");
  const inputValidationPassword = document.getElementById("ValidatePasswordInput");
  const btnValidation = document.getElementById("btn-validation-inscription");
  const formInscription = document.getElementById("formulaireInscription");

  inputNom.addEventListener("keyup", validateForm);
  inputPrenom.addEventListener("keyup", validateForm);
  inputMail.addEventListener("keyup", validateForm);
  inputPassword.addEventListener("keyup", validateForm);
  inputValidationPassword.addEventListener("keyup", validateForm);

  btnValidation.addEventListener("click", InscrireUtilisateur);
  //Function permettant de valider tout le formulaire

  function validateForm() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const mailOK = validateMail(inputMail); //appel à la vérification du mail au bon format
    const passwordOK = validatePassword(inputPassword); //appel à la vérification du PWD au bon format
    const passwordConfirmOK = validateConfirmationPassword(inputPassword, inputValidationPassword); //appel à la vérification entre les 2 PWD identiques

    if (
      nomOK &&
      prenomOK &&
      mailOK &&
      passwordOK &&
      passwordConfirmOK
    ) // si les 3 éléments sont ok alors enable btn inscription//
    {
      btnValidation.disabled = false;
      return true;
    } else {
      btnValidation.disabled = true;
      return false;
    }
  }

  //Function permettant de vérifier que les 2 password sont identiques

  function validateConfirmationPassword(inputPassword, inputValidationPassword) {
    if (inputPassword.value == inputValidationPassword.value) {
      // entre le 1er format donné par le user et le format confirmé
      inputValidationPassword.classList.add("is-valid"); // green
      inputValidationPassword.classList.remove("is-invalid");
      return true;
    } else {
      inputValidationPassword.classList.remove("is-valid");
      inputValidationPassword.classList.add("is-invalid"); // red
      return false;
    }
  }

  //Function permettant de vérifier le format du password

  function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
      //match: est-ce qu'il y a bien un match
      // entre le format donné par le user et le format regex
      input.classList.add("is-valid"); // green
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid"); // red
      return false;
    }
  }

  //Function permettant de vérifier le format du mail

  function validateMail(input) {
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
      //match: est-ce qu'il y a bien un match
      // entre le format donné par le user et le format regex
      input.classList.add("is-valid"); // green
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid"); // red
      return false;
    }
  }
  function validateRequired(input) {
    if (input.value != "") {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      //c'est bon et c'est en green checked
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      //Ce n'est pas bon et en red cross
      return false;
    }
  }

  function InscrireUtilisateur() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formInscription);

    const name = dataForm.get("name");
    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      firstName: dataForm.get("nom"),
      lastName: dataForm.get("prenom"),
      email: dataForm.get("email"),
      password: dataForm.get("password"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "registration", requestOptions)
      .then((response) => {
        if (response.ok) {
          //
          return response.json();
        } else {
          alert("Vos informations ne permettent pas de vous inscrire");
          return;
        }
      })
      //excution fléchée pour plusieurs lignes
      .then((result) => {
        alert("Insciption validée! Connectez-vous àvotre compte!");
        document.location.href = "/signin";
      })
      .catch((error) => console.error(error));
  }
})();
