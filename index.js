const db_juego = [
  {
    id: 0,
    pregunta: '¿Cual es el país mas pequeño del mundo',
    opt0: 'Estado Vaticano',
    opt1: 'Mónaco',
    opt2: 'San Marino',
    correcta: '0'
  },
  {
    id: 1,
    pregunta: '¿Cual es nombre de Thouma',
    opt0: 'Ricky',
    opt1: 'Ricardo',
    opt2: 'Richard',
    correcta: '2'
  }
];

const d = document;
let respuestas = [];
let cantiCorrectas = 0;
let numOpcionSelec = 0;

function cargarPreguntas() {
  const pregunta = db_juego[numOpcionSelec];

  // contenedor de pregunta
  const contenedor = d.createElement("div");
  contenedor.className = "contenedor-pregunta";
  contenedor.id = pregunta.id;

  // card title and question
  const h2 = d.createElement("h2");
  // h2.textContent = pregunta.id + 1 + "-" + pregunta.pregunta;
  h2.textContent = `${pregunta.id} 1 - ${pregunta.pregunta}`;
  contenedor.appendChild(h2);

  // card options
  const opciones = d.createElement("div");

  // generate question options 3 x c/question 
  const label1 = crearLabel("0", pregunta.opt0);
  const label2 = crearLabel("1", pregunta.opt1);
  const label3 = crearLabel("2", pregunta.opt2);

  // add labels to content option
  opciones.appendChild(label1);
  opciones.appendChild(label2);
  opciones.appendChild(label3);

  contenedor.appendChild(opciones);
  d.getElementById("juego").appendChild(contenedor);
}

function crearLabel(numOptRadio, textOption) {
  const label = d.createElement("label");
  label.id = "l" + numOpcionSelec + numOptRadio;

  const input = d.createElement("input");
  input.setAttribute("type", "radio");
  input.name = "p" + numOpcionSelec;
  // input.setAttribute("onClick", "seleccionar(" + numPregunta + "," + num + ")");
  input.setAttribute("onClick", `seleccionar(${numOpcionSelec},${numOptRadio})`);

  const span = d.createElement("span");
  span.textContent = textOption;

  const correccion = d.createElement("span");
  correccion.id = "p" + numOpcionSelec + numOptRadio;

  label.appendChild(input);
  label.appendChild(span);
  label.appendChild(correccion);

  return label;
}

// Render Cards
for (let i = 0; i < db_juego.length; i++) {
  cargarPreguntas();
  numOpcionSelec++;
}

// Save answer selection 
function seleccionar(pos, opElegida) {
  respuestas[pos] = opElegida;
}

// Button correct
let corregir = d.getElementById("corregir");
corregir.onclick = function () {
  // recorrido de arreglo con las respuestas
  for (let i = 0; i < db_juego.length; i++) {

    const pregunta = db_juego[i];

    if (pregunta.correcta == respuestas[i]) {
      cantiCorrectas++;
      let idCorreccion = "p" + i + pregunta.correcta;// crea el id 
      d.getElementById(i).className = "contenedor-pregunta correcta";
      d.getElementById(idCorreccion).innerHTML = "&check;";
      d.getElementById(idCorreccion).className = "acierto";
    } else {
      let id = "p" + i + respuestas[i];
      let idCorreccion = "p" + i + pregunta.correcta;// crea el id 
      d.getElementById(i).className = "contenedor-pregunta incorrecta";
      d.getElementById(id).innerHTML = "&#x2715;";
      d.getElementById(id).className = "no-acierto";
      d.getElementById(idCorreccion).innerHTML = "&check;";
      d.getElementById(idCorreccion).className = "acierto";
    }

  }

  let inputs = d.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }

  window.scrollTo(0, 0);

  let h2 = d.createElement("h2");
  h2.className = "resultado";
  h2.textContent = `${cantiCorrectas} Correctas - ${db_juego.length - cantiCorrectas}  Incorrectas`;
  d.getElementById("juego").appendChild(h2);

};
