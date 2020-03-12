const superagent = require("superagent");
const fs = require("fs");


// No tiene parámetros porque es la primera.
function traerMuseosDeLaAPI() {
  superagent
    .get("https://www.cultura.gob.ar/api/v2.0/museos")
    .query({ format: "json", limit: 29 })
    .end(escribirMuseosEnArchivo);
}

function traerOrganismosDeLaAPI() {
  superagent
    .get("https://www.cultura.gob.ar/api/v2.0/organismos")
    .query({ format: "json", limit: 147 })
    .end(escribirOrganismosEnArchivo);
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

  // Borro el archivo museos.txt para poder empezar a llenarlo con los nuevos museos.

  if (fs.existsSync('museos.txt')) {
      fs.unlinkSync('museos.txt');
      console.log('museos.txt borrado con exito!');
  }
 
  // Debe haber una línea por cada museo, con este formato:
  // NOMBRE (DIRECCION). Por cualquier consulta comunicarse al TELEFONO
  var i = 0;
  for (i in museos) {
    fs.appendFile("museos.txt", 
    "Museo: " +  
    museos[i].nombre+" (" +
    museos[i].direccion + ")"+
    ". Por cualquier consulta comunicarse al " + 
    museos[i].telefono+"\n", avisarQueTerminamos);
  }
}
// Estos parámetros son los que manda fs.writeFile al callback.
// En este caso solo hay uno, el posible error. Si la escritura funciona, no se manda nada.

function escribirOrganismosEnArchivo(error, respuesta) {
  if (error) {
    throw error;
  }
  const cantidad = respuesta.body.count;
  const organismos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} Organismos. Escribiendo en archivo...`);
  // console.log(organismos);
 
  if (fs.existsSync('organismos.txt')) {
      fs.unlinkSync('organismos.txt');
      console.log('organismos.txt borrado con exito!');
  }
// Organismo: Dirección de Relaciones Institucionales (Alvear 1690). 
// Por cualquier consulta comunicarse al (011) 4129-2400
  var i = 0;
  for (i in organismos) {
    fs.appendFile("organismos.txt", 
    "Organismo: " +  
    organismos[i].nombre + " (" + 
    organismos[i].direccion + ")" + ". Por cualquier consulta comunicarse al " + 
    organismos[i].telefono+"\n", avisarQueTerminamos);
  }
}

function avisarQueTerminamos(error) {
  if (error) {
    throw error;
  }

  console.log("Todo joya, andá a leer tu archivo");
}

// Este es nuestro programa.
// Para saber cómo continua hay que ver el código de la función y ver a cuál llama después.
traerMuseosDeLaAPI();
traerOrganismosDeLaAPI();

