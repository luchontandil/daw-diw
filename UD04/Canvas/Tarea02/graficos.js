const canvas = document.querySelector("canvas");
const width = canvas.getAttribute('width');
const height = canvas.getAttribute('height');

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

//ctx.arc(200,200,50,0.2,1 * Math.PI);
function circular() {

  let poderTotal = dioses.reduce((suma, {poder}) => suma+=poder, 0);
  let startAngle = -0.5 * Math.PI;
  let radius = (height/2)*0.9;
  let counterClockwise = false;

  dioses.forEach(dios => {
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
    case "1":
      circular();
      break;
    case "2":
      barras();
      break;
    case "3":
      rayas();
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
