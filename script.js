const questions = [
    {
        q: "Según Nilsson, ¿cuál es la definición de Inteligencia Artificial?",
        options: [
            "La ciencia de hacer máquinas que piensen como humanos.",
            "La IA se dedica principalmente a la inteligencia en artefactos, de los cuales muchos son computacionales.",
            "Es la rama que busca imitar la red neuronal biológica.",
            "Un sistema capaz de resolver cualquier problema lógico."
        ],
        correct: [1],
        exp: "Nilsson define la IA centrándose en artefactos computacionales inteligentes (Pág 51)."
    },
    {
        q: "¿En qué etapa del proceso KDD se realiza el descubrimiento de patrones?",
        options: ["Pre-procesamiento", "Selección", "Minería de Datos", "Interpretación"],
        correct: [2],
        exp: "La Minería de Datos es la etapa específica donde se aplican algoritmos para extraer patrones (Pág 51)."
    },
    {
        q: "¿Qué tarea consiste en aprender una función que asigne una instancia a una de varias clases definidas?",
        options: ["Regresión", "Clasificación", "Agrupamiento", "Asociación"],
        correct: [1],
        exp: "La clasificación asigna instancias a categorías o clases predefinidas (Pág 52)."
    },
    {
        q: "En el aprendizaje supervisado...",
        options: [
            "No se conoce la respuesta correcta de los ejemplos.",
            "El sistema aprende sin guía externa.",
            "Cada ejemplo de entrenamiento incluye la respuesta correcta o clase.",
            "Solo se usan datos numéricos."
        ],
        correct: [2],
        exp: "Se llama supervisado porque el modelo cuenta con la 'etiqueta' o respuesta correcta para aprender (Pág 52)."
    },
    {
        q: "Indica cuáles de las siguientes afirmaciones son correctas respecto al aprendizaje de conceptos:",
        options: [
            "Los problemas se resuelven a veces como una búsqueda en un espacio de hipótesis.",
            "El tamaño de los datos de entrenamiento no influye en el resultado.",
            "Se pueden encontrar en la práctica distintas descripciones de un concepto.",
            "El sobreajuste consiste en generalizar demasiado."
        ],
        correct: [0, 2], // MULTIPLE!
        exp: "Es una búsqueda en espacio de hipótesis y existen múltiples descripciones válidas. El sobreajuste es lo contrario a generalizar (Pág 53)."
    },
    // ... (Se completarían las 10 preguntas siguiendo este formato)
];

let currentIdx = 0;
let selectedOptions = [];

const homeMenu = document.getElementById('home-menu');
const quizContainer = document.getElementById('quiz-container');
const answerGrid = document.getElementById('answer-buttons');
const verifyBtn = document.getElementById('verify-btn');
const nextBtn = document.getElementById('next-btn');

document.getElementById('start-exam').addEventListener('click', () => {
    homeMenu.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion();
});

function showQuestion() {
    const question = questions[currentIdx];
    selectedOptions = [];
    
    document.getElementById('question-number').innerText = `Pregunta ${currentIdx + 1} de ${questions.length}`;
    document.getElementById('progress').style.width = `${((currentIdx + 1) / questions.length) * 100}%`;
    document.getElementById('question-text').innerText = question.q;
    
    // Mostrar instrucción si es múltiple
    document.getElementById('multi-instruction').classList.toggle('hidden', question.correct.length === 1);
    
    answerGrid.innerHTML = '';
    question.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(i, btn);
        answerGrid.appendChild(btn);
    });

    verifyBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    document.getElementById('feedback-area').classList.add('hidden');
}

function selectOption(idx, btn) {
    const isMultiple = questions[currentIdx].correct.length > 1;
    
    if (!isMultiple) {
        selectedOptions = [idx];
        Array.from(answerGrid.children).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    } else {
        if (selectedOptions.includes(idx)) {
            selectedOptions = selectedOptions.filter(i => i !== idx);
            btn.classList.remove('selected');
        } else {
            selectedOptions.push(idx);
            btn.classList.add('selected');
        }
    }
}

verifyBtn.onclick = () => {
    const question = questions[currentIdx];
    if (selectedOptions.length === 0) return alert("Selecciona al menos una opción");

    const isCorrect = JSON.stringify(selectedOptions.sort()) === JSON.stringify(question.correct.sort());
    
    Array.from(answerGrid.children).forEach((btn, i) => {
        btn.disabled = true;
        if (question.correct.includes(i)) btn.classList.add('correct');
        else if (selectedOptions.includes(i)) btn.classList.add('wrong');
    });

    document.getElementById('feedback-area').classList.remove('hidden');
    const status = document.getElementById('feedback-status');
    status.innerText = isCorrect ? "¡CORRECTO!" : "INCORRECTO";
    status.style.color = isCorrect ? "var(--success)" : "var(--danger)";
    document.getElementById('explanation-text').innerText = question.exp;

    verifyBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
};

nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) showQuestion();
    else {
        alert("Has terminado el examen.");
        location.reload();
    }
};