function isVacio() {
  let errorDiv = document.querySelector(`#e${this.id}`);
  if (this.value == "") {
    errorDiv.style.visibility = "initial";
  } else {
    errorDiv.style.visibility = "hidden";
  }
}

function crear() {
  let container = document.querySelector("#contenedorFichas");
  let campos = document.querySelectorAll("input");
  let atributes = {};
  let valido = true;

  campos.forEach(nodo => {
    atributes[nodo.id] = nodo.value;
    if (nodo.value == "") {
      valido = false;
      document.querySelector(`#e${nodo.id}`).style.visibility = "initial";
    }
  });

  if (valido) {
  container.innerHTML += `
  <div style="clear:both">
  <div class="foto"> <img src="${atributes.imagen}"></img></div>
    <div class="datos">
      <div class="small cabecera">Nombre</div>
      <div class="medium cabecera">Apellidos</div>
      <div class="small dato">${atributes.nombre}</div>
      <div class="medium dato">${atributes.apellidos}</div>
      <div class="medium cabecera">Padres</div>
      <div class="small cabecera">Casa</div>
      <div class="medium dato">${atributes.padres}</div>
      <div class="small dato">${atributes.casa}</div>
      <div class="big cabecera">Título</div>
      <div class="big dato">${atributes.titulo}</div>
    </div>
  </div>`;
  }

}

function loadListeners() {
  //Inputs
  document.querySelector("#nombre").addEventListener("blur", isVacio);
  document.querySelector("#apellidos").addEventListener("blur", isVacio);
  document.querySelector("#casa").addEventListener("blur", isVacio);
  document.querySelector("#padres").addEventListener("blur", isVacio);
  document.querySelector("#titulo").addEventListener("blur", isVacio);
  document.querySelector("#imagen").addEventListener("blur", isVacio);

  //button crear
  document.querySelector(".btn").addEventListener("click", crear);

}

function init() {
  console.log("Iniciando...");
  loadListeners();

}

window.onload = init;
