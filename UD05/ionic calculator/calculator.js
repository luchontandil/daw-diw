
function onLoad() {
    loadListeners();
    setStyle();
}

function loadListeners() {
  document.addEventListener("ionChange", setStyle);
  document.querySelectorAll('ion-col ion-button:not(#delete):not(#calc)').forEach(element => {
    element.addEventListener("click", add);});
  document.querySelector('#delete').addEventListener("click", del);
  document.querySelector('#calc').addEventListener("click", calc);
}

function setStyle() {
    document.querySelectorAll("ion-content ion-button").forEach(function(b) {
        b.expand = "block";
        b.strong = "true";
        b.fill = document.getElementById("type").value;
        b.size = document.getElementById("size").value;
    });
}
function setResult(value) {
    document.getElementById("result").innerHTML = value;
}
function getResult() {
    return(document.getElementById("result").innerHTML);
}
function add() {
    let key = this.innerText;
    var result = getResult();
    if (result!="0" || isNaN(key)) setResult(result + key);
    else setResult(key);
}
function calc() {
    var result = eval(getResult());
    setResult(result);
}
function del() {
    setResult(0);
}
