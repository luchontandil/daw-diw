/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/


let i = 0;

function avanzarBarra(item) {
  item.value = "100";
}

function startMigration() {
  const items = document.querySelectorAll('steps *:not(span)');

  while (i < items.length - 1) {
    items[i].addEventListener('transitionend', verSiguente);
    i++
  };

  i = -1;

  function verSiguente() {
    i++;
    if ((i + 2) % 3 == 0) {
      avanzarBarra(items[i]);
    }
    return items[i + 1].classList.add('transitioned');
  }

  document.querySelector('steplabel').classList.add("transitioned");
}

function init() {
  console.info(" * Init envirnoment ");
  // Set click function on button
  document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload = init;
