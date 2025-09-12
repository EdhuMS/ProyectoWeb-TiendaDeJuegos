document.getElementById("linkToLogin").addEventListener("click", function (e) {
    e.preventDefault();
    let registroModal = bootstrap.Modal.getInstance(document.getElementById("modalRegistro"));
    registroModal.hide();
    let loginModal = new bootstrap.Modal(document.getElementById("modalLogin"));
    loginModal.show();
});

document.getElementById("linkToRegister").addEventListener("click", function (e) {
    e.preventDefault();
    let loginModal = bootstrap.Modal.getInstance(document.getElementById("modalLogin"));
    loginModal.hide();
    let registroModal = new bootstrap.Modal(document.getElementById("modalRegistro"));
    registroModal.show();
});

function goBack() {
    if (history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}

document.querySelectorAll('.toggle-password').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const passwordInput = this.closest('.input-group').querySelector('.password-input');

    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
  });
});