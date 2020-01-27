let gotUrl = "got.json";
let personajes = [];


function loadPersonajes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(JSON.parse(this.responseText).ip);
      personajes = JSON.parse(this.responseText).got;
    }
  };
  xhttp.open("GET", gotUrl, false);
  xhttp.send();
}

function verPersonajes() {
  let container = document.querySelector('#contenedorFichas');
  container.innerHTML = "";
  personajes.forEach(personaje => {
    container.innerHTML += `
    <div style="clear:both">
    <div class="foto"> <img src="${personaje.imagen}"></img></div>
      <div class="datos">
        <div class="small cabecera">Nombre</div>
        <div class="medium cabecera">Apellidos</div>
        <div class="small dato">${personaje.nombre}</div>
        <div class="medium dato">${personaje.apellidos}</div>
        <div class="medium cabecera">Padres</div>
        <div class="small cabecera">Casa</div>
        <div class="medium dato">${personaje.padres}</div>
        <div class="small dato">${personaje.familia}</div>
        <div class="big cabecera">Título</div>
        <div class="big dato">${personaje.titulo}</div>
      </div>
    </div>`;
  });
}

function init() {
  console.log("Iniciando...");
  loadPersonajes();
  verPersonajes();

}

window.onload = init;
