const canvas = document.querySelector("canvas");
const width = canvas.getAttribute('width');
const height = canvas.getAttribute('height');
const colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'yellow'];

const dioses = [
  {nombre:"Cthulhu",poder:1000,color:"green"},
  {nombre:"Nyarlatothep",poder:600,color:"red"},
  {nombre:"Azazoth",poder:1400,color:"grey"},
  {nombre:"Pepe",poder:800,color:"purple"}
];


let ctx = canvas.getContext("2d");

function guardar() {
  var link = document.getElementById('link');
  link.setAttribute('download', 'Grafico.png');
  link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();
}

function getRamdomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getInputs() {
  let inputs = [];

  let claves = document.querySelectorAll(`input.left`);
  let values = document.querySelectorAll(`input.right`);

  claves.forEach(clave => {
  let output;
  value = document.querySelector(`input.left[name=${clave.name}] + input.right`);
  // console.log(clave.value);
  // console.log(value.value);
    if (clave.value != '' && value.value != '' && value.value > 0 && value.value < Number.MAX_SAFE_INTEGER) {
      output = {};
      output['nombre'] = clave.value
      output['poder'] = parseInt(value.value);
      output['color'] = getRamdomColor();
      inputs.push(output);
    }

  });

return inputs
}

//ctx.arc(200,200,50,0.2,1 * Math.PI);
function circular() {

  inputs = getInputs();

  if (typeof inputs !== 'undefined' && inputs.length > 0) {
    items = inputs;
  }
  else {
    items = dioses;
  }

  let poderTotal = items.reduce((suma, {poder}) => suma+=poder, 0);
  let startAngle = -0.5 * Math.PI;
  let radius = (height/2)*0.9;
  let counterClockwise = false;

  items.forEach(dios => {
      let endAngle= ((2*Math.PI*dios.poder)/poderTotal)+startAngle;

      ctx.beginPath();
      ctx.moveTo( width/2, height/2);
      ctx.arc( width/2, height/2, radius, startAngle, endAngle);
      ctx.lineWidth = 2;
      ctx.fillStyle = dios.color;
      ctx.lineTo(width/2, height/2);
      ctx.fill();

      //Text
      var midAngle = startAngle + (endAngle - startAngle) / 2;
      var labelRadius = width/4 * 0.8;
      var x = width/2 + (labelRadius) * Math.cos(midAngle);
      var y = height/2 + (labelRadius) * Math.sin(midAngle);

      //Centro del texto
      ctx.translate(x,y);
      if(midAngle>0.5*Math.PI) midAngle-=(Math.PI);
      ctx.rotate(midAngle);
      ctx.fillStyle = 'black';
      ctx.textAlign = "center";
      ctx.font = "20px Arial";
      ctx.fillText(dios.nombre, -3, -3);
      ctx.rotate(-midAngle);
      ctx.translate(-x,-y);

      startAngle=endAngle;
    });
}

function barras() {
  inputs = getInputs();

  if (typeof inputs !== 'undefined' && inputs.length > 0) {items = inputs}
  else {items = dioses}

  let poderTotal = items.reduce((suma, {poder}) => suma+=poder, 0);
  let cantidad = items.length;
  let espacio = width/(cantidad+(cantidad-1));
  let numero = 0.5;

  items.forEach(item => {
    // Linea
    ctx.beginPath();
    ctx.moveTo((espacio)*numero,height*0.95);
     // let altura = Math.round(width*dios.poder/(poderTotal+20))
    ctx.lineTo((espacio)*numero, Math.abs(height-(height*item.poder)/(poderTotal))-20);
    ctx.lineWidth = espacio*0.8;
    ctx.strokeStyle = `${item.color}`;
    ctx.stroke();
    numero+=2;
  });


}
// Linea
// ctx.beginPath();
// ctx.moveTo(width/2,height/2);
// ctx.lineTo(width/2, (height)*0.1);
// ctx.lineWidth = 1;
// ctx.fillStyle = 'black';
// ctx.stroke();

function borrarTodo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function buildGrafico(){
  let tipoDeGrafico = document.querySelector("select").value;
  borrarTodo();
  switch (tipoDeGrafico) {
    case "1": circular();
      break;
    case "2": barras();
      break;
    case "3": rayas();
      break;
  }
}

function loadListeners(){
    document.querySelector("input[name='grafiqueame']").addEventListener("click",buildGrafico);
    document.querySelector("select").addEventListener("change",buildGrafico);
    document.querySelector("#guardar").addEventListener("click",guardar);
}


function init(){
    console.log(" * Init ");
    loadListeners();

}

window.onload=init;
