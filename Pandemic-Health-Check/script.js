async function load_model() {
    model = await tf.loadLayersModel('tfjs/model.json');
}
function predict(values) {
    let output = model.predict(tf.tensor2d(values, [1,20]));
    let prediction = Array.from(output.dataSync());
    let i = prediction.indexOf(Math.max(...prediction));

    pred.children[0].innerHTML = 'Disease Prediction: ' + result[i];
    pred.children[1].innerHTML = 'Confidence: ' + Math.floor(prediction[i] * 100) + '%';
    pred.children[2].style.display = 'block';
}

function next() {
    if(![questions[index].children[1].children[0], questions[index].children[2].children[0]].some(c => c.checked)) {
        return;
    }
    questions[index].style.display = 'none';
    index++;
    questions[index].style.display = 'block';
}
function prev() {
    questions[index].style.display = 'none';
    index--;
    questions[index].style.display = 'block'
}

function enable() {
    questions[index].children[5].style.color = 'black'
    let interval = setInterval(() => {
        next();
        clearInterval(interval);
    }, 300);
}

var submit = function(event) {
    event.preventDefault();
    
    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData);
    let values = Object.values(formObject);
    values = values.map(Number);

    predict(values);
};

var model;
load_model();

const result = ['Allery', 'Cold', 'Covid', 'Flu']
const fields = ['DO YOU HAVE FEVER','MUSCLE_ACHES','TIREDNESS','SORE_THROAT','RUNNY_NOSE','STUFFY_NOSE','FEVER','NAUSEA','VOMITING','DIARRHEA','SHORTNESS_OF_BREATH','DIFFICULTY_BREATHING','LOSS_OF_TASTE','LOSS_OF_SMELL','ITCHY_NOSE','ITCHY_EYES','ITCHY_MOUTH','ITCHY_INNER_EAR','SNEEZING','PINK_EYE']

const questions = document.getElementsByClassName('question');
const pred = document.getElementById('prediction');

let index = 0
questions[0].style.display = 'block';
questions[0].children[4].style.display = 'none';
questions[20].children[4].style.display = 'none';


var form = document.getElementById("form");
form.addEventListener("submit", submit, true);

