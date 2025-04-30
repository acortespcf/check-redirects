const fs = require("fs");
const axios = require("axios");
const xlsx = require("xlsx");
const csvParser = require("csv-parser");

const inputFile = "./redirects.csv";
const outputFile = "./redirect_results.xlsx";

async function checkRedirect(url) {
  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    return response.request.res.responseUrl || url;
  } catch (error) {
    return error.response?.request?.res?.responseUrl || "Error";
  }
}

async function processRedirects() {
  const results = [];
  const rows = [];

  // Leer CSV y almacenar filas en un array
  await new Promise((resolve, reject) => {
    fs.createReadStream(inputFile)
      .pipe(csvParser())
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  const total = rows.length;

  // Procesar las URLs en serie para evitar problemas de concurrencia
  for (let i = 0; i < total; i++) {
    const row = rows[i];
    const urlOrigen = row["URL Origen"];
    const urlDestino = row["URL Destino"];

    const urlFinal = await checkRedirect(urlOrigen);
    const status = urlFinal === urlDestino ? "Correcto" : "Error";

    results.push({
      "URL Origen": urlOrigen,
      "URL Destino": urlDestino,
      "URL Final": urlFinal,
      "Estado Redirect": status,
    });

    console.log(
      `Progreso: ${(((i + 1) / total) * 100).toFixed(2)}% (${i + 1}/${total})`
    );
  }

  // Guardar resultados en Excel
  const worksheet = xlsx.utils.json_to_sheet(results);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Redirects");
  xlsx.writeFile(workbook, outputFile);
  console.log("Archivo XLS generado:", outputFile);
}

processRedirects();
