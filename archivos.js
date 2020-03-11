// Esta es la manera "vieja" de importar código en NodeJS
// (en otros ejemplos veremos la nueva)
const fs = require("fs");

// En la API estándar de NodeJS las funciones de callback tienen *siempre*
// como primer parámetro algo que puede o no ser un error. Por ende, hay
// que hacer este chequeo horrendo de más abajo:
function procesarArchivo(error, datos) {
  if (error !== null) {
    console.error("Algo salió mal :(");
    console.error(error);
  } else {
    // El trim le vuela los espacios de más,
    // y el split separa las líneas
    // ('\n' es el caracter que representa al Enter)
    const lineas = datos.trim().split("\n");

    // Forma cheta de armar un string interpolado,
    // notar que se arma con backticks (``) y no con comillas ('')
    console.log(`El archivo tiene ${lineas.length} líneas`);
  }
}

// El segundo parámetro es necesario para que NodeJS sepa que queremos leerlo como String
// Si no lo pasamos devuelve un Buffer (una chorrera de bytes).
fs.readFile("./assets/gatitos.txt", "utf8", procesarArchivo);

console.log(
  "Esta línea se ejecuta inmediatamente después de la anterior, puede que se haya leído el archivo o puede que no"
);
