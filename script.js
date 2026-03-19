const form = document.getElementById("form");
const btn = document.getElementById("btn");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  btn.innerText = "Envoi en cours...";
  btn.disabled = true;

  const data = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbzB1QIvdp54CV_ZYSYUoqlIfOJbC6lIaX8pHIJYqiteEXMVjxoaA4etIY648A3SlnchUQ/exec", {
    method: "POST",
    body: data
  })
  .then(res => {
    successMsg.style.display = "block";
    form.reset();
    btn.innerText = "S'inscrire";
    btn.disabled = false;
    setTimeout(() => { successMsg.style.display = "none"; }, 5000);
  })
  .catch(err => {
    alert("❌ Erreur lors de l'envoi");
    btn.innerText = "S'inscrire";
    btn.disabled = false;
  });
});
