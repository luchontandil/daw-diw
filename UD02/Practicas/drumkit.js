document.onkeydown = function(ev) {
  const btn = document.querySelector(`.btn[data-key='${ev.which}']`);
  if(btn!=null){
    const btnSound = document.querySelector(`audio[data-key='${ev.which}']`);
    btnSound.currentTime = 0;
    btnSound.play();
    btn.classList.add('pressed');
    btn.addEventListener('transitionend',rmPressed);
    function rmPressed() {
      this.classList.remove('pressed');
      this.removeEventListener('transitionend',()=>{}); // perdon :(
    }
  }
}
