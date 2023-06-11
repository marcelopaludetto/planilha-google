lerArquivoCSV(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRc3B1mUCb_jDGxOSAvJMaH51Mr_Bk0HLhPolBO_ZCBhsnacEQVRyxSB6a3DUIoanJJIGSSvXeM5ZdP/pub?gid=0&single=true&output=csv"
)
  .then((valores) => {
    const titulos = valores.splice(0, 1);

    const nomes = valores.splice(1);
    console.log(nomes[0].length);

    var thead = document.querySelector(".tabela-titulo");
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
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }
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
tagH2.innerHTML = 'Notas da Turma para o Vestibular';
var tbody = document.querySelector("#minha-tabela");

