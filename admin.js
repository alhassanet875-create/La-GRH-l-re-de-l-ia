// ID de ton Google Sheet et nom de la feuille
const SHEET_URL = "https://docs.google.com/spreadsheets/d/TON_ID_SHEET/edit"; // Pour référence

// On utilise Google Sheets API ou fetch via Web App (une autre Web App qui renvoie JSON)
// Ici exemple simple via fetch si tu modifies le script Apps Script pour renvoyer JSON

fetch("https://script.google.com/macros/s/AKfycbzB1QIvdp54CV_ZYSYUoqlIfOJbC6lIaX8pHIJYqiteEXMVjxoaA4etIY648A3SlnchUQ/exec?action=get")
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#inscrits tbody");
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${item.Nom}</td><td>${item.Email}</td><td>${item.Telephone}</td><td>${item.Date}</td>`;
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    alert("Erreur chargement des inscrits");
    console.error(err);
  });
