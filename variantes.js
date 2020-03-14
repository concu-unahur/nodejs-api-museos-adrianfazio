const superagent = require("superagent");
const fs = require("fs");

function traerMuseosDeLaAPI() {
  superagent
    .get("https://www.cultura.gob.ar/api/v2.0/museos")
    .query({ format: "json", limit: 5 })
    .end(escribirMuseosEnArchivo, console.log('Bajando museos'));
}

function traerOrganismosDeLaAPI() {
  superagent
    .get("https://www.cultura.gob.ar/api/v2.0/organismos")
    .query({ format: "json", limit: 10 })
    .end(escribirOrganismosEnArchivo, console.log('Bajando organismos'));
}

function escribirMuseosEnArchivo(error, respuesta) {
  if (error) {
    throw error;
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} museos. Escribiendo en archivo...`);

  for (var i=0; i<museos.length-1; i++) {
    fs.appendFile("variantes.txt", 
    "Museo: " + museos[i].nombre+" (" + museos[i].direccion + ")"+
    ". Por cualquier consulta comunicarse al " + museos[i].telefono+"\n", 
    avisarQueEscribeMuseo);
  }
  var i=museos.length-1;
  fs.appendFile("variantes.txt", 
  "Museo: " +  museos[i].nombre+" (" + museos[i].direccion + ")"+
  ". Por cualquier consulta comunicarse al " + museos[i].telefono+"\n",
  traerOrganismosDeLaAPI);
}

function avisarQueEscribeMuseo(aviso){
  if (aviso) {
    throw aviso;
  }
  console.log('Escribiendo museo en archivo')
}

function escribirOrganismosEnArchivo(error, respuesta) {
  if (error) {
    throw error;
  }
  const cantidad = respuesta.body.count;
  const organismos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} Organismos. Escribiendo en archivo...`);
  for (var i=0; i<organismos.length; i++) {
    fs.appendFile("variantes.txt", 
    "Organismo: " + organismos[i].nombre+" (" + organismos[i].direccion + ")"+
    ". Por cualquier consulta comunicarse al " + organismos[i].telefono+"\n",
    avisarQueEscribeOrganismo);
  }
}

function avisarQueEscribeOrganismo(aviso){
  if (aviso) {
    throw aviso;
  }
  console.log('Escribiendo organismo en archivo')
}

function avisarQueTerminamos(error) {
  if (error) {
    throw error;
  }
  console.log("Todo joya, andá a leer tu archivo");
}

traerMuseosDeLaAPI();

//traerOrganismosDeLaAPI();

