// 🔹 Remplace par l'URL Web App Google Sheets JSON
const SHEET_JSON_URL = "https://script.google.com/macros/s/AKfycbxL28AgwosQE6gDiaaUy967idN-afCWxJ8QSgbopEEQSIFbUsZwwnxEf8Ys-vqm2O-CTQ/exec";

const table = document.getElementById("table");
const total = document.getElementById("total");
const ctx = document.getElementById("chart").getContext("2d");
let chart;

function fetchData(){
  fetch(SHEET_JSON_URL)
  .then(res => res.json())
  .then(data => {
    table.innerHTML = "";

    let stats = {};

    data.forEach(p => {
      table.innerHTML += `
        <tr>
          <td>${p.nom}</td>
          <td>${p.prenom}</td>
          <td>${p.email}</td>
          <td>${p.telephone}</td>
          <td>${new Date(p.date).toLocaleString()}</td>
        </tr>
      `;

      let day = new Date(p.date).toLocaleDateString();
      stats[day] = (stats[day] || 0) + 1;
    });

    total.innerText = data.length;

    // Graphique
    if(chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(stats),
        datasets: [{
          label: "Inscriptions",
          data: Object.values(stats),
          backgroundColor: "#2563eb"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  });
}

// Actualiser toutes les 10 secondes
fetchData();
setInterval(fetchData, 10000);