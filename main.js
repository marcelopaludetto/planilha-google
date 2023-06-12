lerArquivoCSV(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRc3B1mUCb_jDGxOSAvJMaH51Mr_Bk0HLhPolBO_ZCBhsnacEQVRyxSB6a3DUIoanJJIGSSvXeM5ZdP/pub?gid=0&single=true&output=csv"
)
  .then((valores) => {
    const titulos = valores.splice(0, 1);
    const nomes = valores.splice(0);
    console.log(nomes);

    var thead = document.querySelector(".tabela-titulo");
    var tbody = document.querySelector("#minha-tabela");

    for (var k = 0; k < titulos[0].length; k++) {
      var titulo = document.createElement("th");
      titulo.textContent = titulos[0][k];
      thead.appendChild(titulo);
    }
    for (var i = 0; i < nomes.length; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < nomes[0].length; j++) {
        var cell = document.createElement("td");
        cell.textContent = nomes[i][j];

        if (j == 3) {
          cell.classList.add("nota-matematica");
        }
        if (j == 0) {
          cell.classList.add("nome");
        }
        if (j == 2) {
          cell.classList.add("nota-portugues");
        }
        if (j == 4) {
          cell.classList.add("nota-historia");
        }

        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }

    let listaNome = Array.from(document.querySelectorAll(".nome")).map(
      (n) => n.innerText
    );
    let listaNotas = Array.from(
      document.querySelectorAll(".nota-matematica")
    ).map((n) => parseFloat(n.innerText));
    let listaNotas2 = Array.from(
      document.querySelectorAll(".nota-portugues")
    ).map((n) => parseFloat(n.innerText));
    let listaNotas3 = Array.from(
      document.querySelectorAll(".nota-historia")
    ).map((n) => parseFloat(n.innerText));
    grafico(listaNome, listaNotas, listaNotas2, listaNotas3);
  })

  .catch((error) => {
    console.error("Erro ao ler o arquivo:", error);
  });

async function lerArquivoCSV(arquivo) {
  try {
    const response = await fetch(arquivo);
    const data = await response.text();
    // Dividir o conteúdo do arquivo por linhas
    const linhas = data.split("\n");
    const valores = linhas.map((linha) => linha.split(","));
    return valores;
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
  }
}

var tagH2 = document.querySelector(".titulo-tabela");
tagH2.innerHTML = "Notas da Turma da 3ª série";

function grafico(listaNome, listaNotas, listaNotas2, listaNotas3) {
  let ctx = document.getElementById("grafico-principal").getContext("2d");
  let chart = new Chart(ctx, {
    type: "bar", // ou 'line' para um gráfico de linha
    data: {
      labels: listaNome,
      datasets: [
        {
          label: "Notas de Matemática",
          data: listaNotas,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Notas de Português",
          data: listaNotas2,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Notas de História",
          data: listaNotas3,
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          borderColor: "rgba(128, 0, 128)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
