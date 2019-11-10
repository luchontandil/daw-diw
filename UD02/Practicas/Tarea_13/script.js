window.onload = () => {
  let rota = false;
  let move = false;

  document.querySelector('#add').addEventListener('click', crearMono);
  document.querySelector('#rotar').addEventListener('click', rotar);
  document.querySelector('#vmove').addEventListener('click', vmove);
  document.querySelector('#STOP').addEventListener('click', stop);

  function stop() {
    rota = false;
    move = false;
    document.querySelectorAll('box').forEach(key => key.classList.remove('rotar'));
    document.querySelectorAll('box').forEach(key => key.classList.remove('mover'));
  }

  function rotar() {
    move=false;
    rota=true;
  }

  function vmove() {
    rota=false;
    move=true;
  }

  function crearMono() {
    rota = false;
    move = false;
    document.querySelector('container').innerHTML += "<box></box>";
    document.querySelectorAll('box').forEach(key => key.addEventListener('click', mover));
  }

  function mover() {
    if (!this.classList.contains('ultimate')) {
      rota = false;
      move = false;
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
    else if (this.classList.contains('ultimate') && rota) {
      rota = false;
      this.classList.add('rotar');
      this.classList.remove('mover');
    }
    else if (this.classList.contains('ultimate') && move) {
      move = false;
      this.classList.add('mover');
      this.classList.remove('rotar');
    }

  }

}
