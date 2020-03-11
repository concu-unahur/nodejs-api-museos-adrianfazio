const superagent = require("superagent");
const fs = require("fs");

// No tiene parámetros porque es la primera.
function traerMuseosDeLaAPI() {
  superagent
    .get("https://www.cultura.gob.ar/api/v2.0/museos")
    .query({ format: "json" })
    .end(escribirMuseosEnArchivo);
}

// Estos parámetros son los que manda superagent al callback.
// El primero es el posible error, el segundo la respuesta HTTP.
function escribirMuseosEnArchivo(error, respuesta) {
  if (error) {
    throw error;
  }

  // Para ver qué datos vienen en el body, entrar a la URL que está
  // más abajo y mirar el formato de respuesta.
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} museos. Escribiendo en archivo...`);

  // Falta completar, esto solo escribe el nombre del primer museo.
  // OJO que `writeFile` pisa el archivo cada vez que escribe,
  // hay que armar el string completo antes de escribirlo.
  //museos.array.forEach(element => {
  //fs.writeFile("museos.txt", museos[0].nombre, avisarQueTerminamos);
  //});
  var i = 0;
  for (i in museos) {
    fs.appendFile("museos.txt", museos[i].nombre, avisarQueTerminamos);
    fs.appendFile("museos.txt", museos[i].direccion, avisarQueTerminamos);
    fs.appendFile("museos.txt", museos[i].telefono, avisarQueTerminamos);
    fs.appendFile("museos.txt", "\n", avisarQueTerminamos);
  }

  //for (var i=0; i<museos.length; i++){
  //  fs.writeFile("museos.txt", museos[indice].nombre, avisarQueTerminamos);
}
//Debe haber una línea por cada museo, con este formato:
// NOMBRE (DIRECCION). Por cualquier consulta comunicarse al TELEFONO

// Estos parámetros son los que manda fs.writeFile al callback.
// En este caso solo hay uno, el posible error. Si la escritura funciona, no se manda nada.
function avisarQueTerminamos(error) {
  if (error) {
    throw error;
  }

  console.log("Todo joya, andá a leer tu archivo");
}

// Este es nuestro programa.
// Para saber cómo continua hay que ver el código de la función y ver a cuál llama después.
traerMuseosDeLaAPI();
