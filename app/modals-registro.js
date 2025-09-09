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