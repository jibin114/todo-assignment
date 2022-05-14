var signInForm = document.getElementById('signInForm');

if(signInForm) {
  signInForm.addEventListener("submit", signIn);
}

function signIn(event) {
  var uName = document.getElementById('uName').value;
  var pwd = document.getElementById('pwd').value;
  var signInButton = document.getElementById('signInButton')

  if(uName.trim() == "admin" && pwd.trim() == 12345) {
    event.preventDefault();
    location.replace("./todo-page.html");
  } else {
    // alert("Invalid Credentials");
    signInButton.setCustomValidity('Invalid Credentials'); 
    signInButton.reportValidity(); 
    event.preventDefault();
  }
}


//Not very important; included to show custom alert box
var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
var alertTrigger = document.getElementById('liveAlertBtn');

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alertBox('Sign In with your credentials to view the TO-DO list!', 'danger', alertPlaceholder,closeAlertBox);
  })
}

function alertBox(message, type, position,callToClose) {
  if(position.innerText == "") {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="fw-bold  text-center alert alert-' + type + ' alert-dismissible" role="alert"> &nbsp; ' +  message + ' <button type="button" class="btn-close me-3" data-bs-dismiss="alert" aria-label="Close"></button></div>';

    position.append(wrapper);
  } else {
    try {
      callToClose(position);
    } catch (e) { }
  }
}

function closeAlertBox(position) {
  position.removeChild(position.lastChild);
}

//Show-hide password
function showPassword() {
  let userPass = document.getElementById("pwd");
  let viewPass = document.getElementById("viewPass");
  if ((userPass.type === "password") && !(userPass.value == "")) {
      viewPass.classList.remove("fa-eye");
      viewPass.classList.add("fa-eye-slash");
      userPass.type = "text";
  } else {
      viewPass.classList.remove("fa-eye-slash");
      viewPass.classList.add("fa-eye");
      userPass.type = "password";
  }
}
