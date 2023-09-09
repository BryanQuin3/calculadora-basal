const CALCULAR = document.getElementById("calcular");
const ERROR = document.getElementById("error");
const MET = document.getElementById("met");
const VOL = document.getElementById("vol");
const FLU = document.getElementById("flu");
const MAN = document.getElementById("man");

CALCULAR.addEventListener("click", () => {
  const DATO = Number(document.getElementById("peso").value);
  VOL.style.display = "none";
  //validamos que se cargue un dato:
  if (DATO > 0) {
    ERROR.style.display = "none";
    if (DATO > 30) {
      const [volumenDiario1500, volumenDiario2000] = calcSC(DATO);
      MET.innerText = "Método de superficie corporal";
      FLU.innerHTML = volumenDiario1500 + "cc Volumen Diario 1500";
      MAN.innerHTML = volumenDiario2000 + "cc Volumen Diario en 2000";
    } else {
      const [volumenDiario, flujo] = calcFlujo(DATO);
      MET.innerText = "Método Holliday-Segar";
      let mM2 = flujo * 1.5;
      VOL.innerText = "Volumen Diario " + volumenDiario + "cc";
      FLU.innerHTML = "Mantenimiento " + flujo + " cc/hr";
      MAN.innerHTML = "m+m/2 " + Math.floor(mM2) + " cc/hr";
      VOL.style.display = "block";
    }
    FLU.style.display = "block";
    MAN.style.display = "block";
    MET.style.display = "block";
  } else {
    ERROR.style.display = "block";
    FLU.style.display = "none";
    MAN.style.display = "none";
    MET.style.display = "none";
  }
});

function calcFlujo(peso) {
  let resto = peso;
  let volumenDiario = 0;

  if (resto > 20) {
    let aux = resto - 20;
    volumenDiario += aux * 20;
    resto -= aux;
  }
  if (resto > 10) {
    let aux = resto - 10;
    volumenDiario += aux * 50;
    resto -= aux;
  }
  volumenDiario += resto * 100;
  let flujo = Math.round(volumenDiario / 24);
  return [volumenDiario, flujo];
}

function calcSC(peso) {
  const superficieCorporal = (peso * 4 + 7) / (peso + 90);
  volumenDiario1500 = Math.floor(superficieCorporal * 1500);
  volumenDiario2000 = Math.floor(superficieCorporal * 2000);
  return [volumenDiario1500, volumenDiario2000];
}

//agregar clase dark cuando el theme esté checked
theme.addEventListener("change", () => {
  // Alternar la clase "dark" en el body
  document.body.classList.toggle("dark");
});
