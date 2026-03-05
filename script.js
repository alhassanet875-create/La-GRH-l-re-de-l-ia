const form = document.getElementById("form");

// 🔹 Remplace par l'URL Web App Google Sheets que tu as obtenu
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxL28AgwosQE6gDiaaUy967idN-afCWxJ8QSgbopEEQSIFbUsZwwnxEf8Ys-vqm2O-CTQ/exec";

form.addEventListener("submit", function(e){
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({nom, prenom, email, telephone})
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "success"){
      document.getElementById("message").innerText = "Inscription réussie !";

      // QR Code avec nom + prénom + email
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), {
        text: `${nom} ${prenom} ${email}`,
        width: 128,
        height: 128
      });

      form.reset();
    }
  })
  .catch(err => console.error(err));
});