window.onload = () => {
  document.querySelector('button').addEventListener('click', crearMono);

  function crearMono() {
    document.querySelector('container').innerHTML += "<box></box>";
    document.querySelectorAll('box').forEach(key => key.addEventListener('click', mover));
  }

  function mover() {
    if (!this.classList.contains('ultimate')) {
      if (this.classList.contains('evoluciona')) {
        this.classList.add('desevoluciona');
        this.classList.remove('evoluciona');
      }
      else if (this.classList.contains('desevoluciona')) {
        this.classList.add('ultimate');
        this.classList.remove('desevoluciona');
      }
      else {
        this.classList.add('evoluciona');
      }
    }
  }

}
