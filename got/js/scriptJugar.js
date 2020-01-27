let gotUrl = "got.json";
let personajes = [];


function loadListeners() {
  document.querySelector("#comprobar").addEventListener("click", comprobar);
}

function loadPersonajes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      personajes = JSON.parse(this.responseText).got;
    }
  };
  xhttp.open("GET", gotUrl, false);
  xhttp.send();
  verPersonajes();
}

function verPersonajes() {
  let container = document.querySelector('#contenedorFotos');
  let familias = [];
  let familiasList = "";

  personajes.forEach(personaje => {
    familias.indexOf(personaje.familia) === -1 ? familias.push(personaje.familia) :null;
  });

  familias.forEach(familia => {
    familiasList += `<option value="${familia}">${familia}</option>`;
  });

  container.innerHTML = "";
  personajes.forEach(personaje => {

    container.innerHTML += `
    <div class="col-xs-6 col-sm-3 contenedorJuego">
    <img class="img-thumbnail" id="${personaje.familia}" src="${personaje.imagen}">
    <select class="form-control">
      <option>Selecciona familia...</option>
      ${familiasList}
    </select></div>`;
  });
}

function comprobar() {
  let containers = document.querySelectorAll('.contenedorJuego');
  let fallos = 0;
  let aciertos = 0;

  containers.forEach(contenedor => {
    let familiaItem = contenedor.querySelector('img').id;
    let familiaSelected = contenedor.querySelector('.form-control').value;

    if(familiaItem == familiaSelected){
      aciertos++;
    }
    else{
      fallos++;
    }
  });

  alert("Aciertos: " + aciertos + " Fallos: " + fallos);
}

function init() {
  console.log("Iniciando...");
  loadListeners();
  loadPersonajes();
}

window.onload = init;
