//funcion para obtener las categorias
function getCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => printCategories(data.trivia_categories))
}

//funcion para imprimir las opciones de categorias
function printCategories(categories) { 
    const categoriesContainer = document.getElementById('category-selector');
    categories.forEach(category => { 
        categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}

//funcion con la que obtendremos las preguntas
function getQuestions() {
    const totalQuestions = document.getElementById('questions').value
    const categories = document.getElementById('category-selector').value
    const difficulties = document.getElementById('difficult-selector').value
    const types = document.getElementById('type-selector').value
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${categories}&difficulty=${difficulties}&type=${types}`)
        .then(response => response.json())
        .then(data => printData(data))
}

//funcion para imprimir las tarjetas de preguntas en el html
function printData(data) {
    const questionContainer = document.getElementById('questions-container');
    questionContainer.innerHTML = "";

    data.results.forEach((element, index) => {
        const answer01 = `<label class="form-check-label"><input class="form-check-input" type="radio" name="card-${index}" id="correct" value="1" required>${element.correct_answer}</label>`,
              answer02 = `<label class="form-check-label"><input class="form-check-input" type="radio" name="card-${index}" id="wrong01" value="0" required>${element.incorrect_answers[0]}</label>`,
              answer03 = `<label class="form-check-label"><input class="form-check-input" type="radio" name="card-${index}" id="wrong02" value="0" required>${element.incorrect_answers[1]}</label>`,
              answer04 = `<label class="form-check-label"><input class="form-check-input" type="radio" name="card-${index}" id="wrong03" value="0" required>${element.incorrect_answers[2]}</label>`;
        const arrayAnswers = [answer01, answer02, answer03, answer04];

        //Random function
        arrayAnswers.sort(() => { 
            return Math.random() - 0.5
        })
        
        questionContainer.innerHTML += `<div class="col-md-6 my-4">
                                            <div class="card h-100 text-color background-question">
                                                <div class="card-body">
                                                    <div>${element.question}</div>
                                                    <div class="">
                                                        <form action="">
                                                            <p> ${arrayAnswers[0]} </p>
                                                            <p> ${arrayAnswers[1]} </p>
                                                            <p> ${arrayAnswers[2]} </p>
                                                            <p> ${arrayAnswers[3]} </p>
                                                        </form>                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
    });
}

//Cambio de elementos 
function start() {
    const selector = document.getElementById("selector-container")
    selector.classList.add('hide-element');
    const button = document.getElementById("score-button")
    button.classList.remove('hide-element');
}
function finish() {
    const selector = document.getElementById("score-button");
    selector.classList.add('hide-element')
    const button = document.getElementById("selector-container");
    button.classList.remove('hide-element')
    const questionContainer = document.getElementById('questions-container');
    questionContainer.innerHTML = "";
}

function score() {
    let i = 0;
    let total = 0;

    while(i < 50) {
        if (i < 10) {
            const scoreTen = document.querySelector(`input[name="card-${i}"]:checked`).value;
            console.log(scoreTen);
        } if (i < 20) {
            const scoreTwenty = document.querySelector(`input[name="card-${i}"]:checked`).value;
            console.log(scoreTwenty);
        } if (i < 30) {
            const scoreThirty = document.querySelector(`input[name="card-${i}"]:checked`).value;
            console.log(scoreThirty);
        } if (i < 40){
            const scoreFourty = document.querySelector(`input[name="card-${i}"]:checked`).value;
            console.log(scoreFourty);
        }
        const scoreFifty = document.querySelector(`input[name="card-${i}"]:checked`).value;
        console.log(scoreFifty);
        // console.log(document.querySelector(`input[name="card-${i}"]:checked`).value);
        i++
    }
    // console.log(document.querySelector('input[name="card-1"]:checked').value);
    // console.log(document.querySelector('input[name="card-2"]:checked').value);
    // console.log(document.querySelector('input[name="card-3"]:checked').value);
    // console.log(document.querySelector('input[name="card-4"]:checked').value);
    // console.log(document.querySelector('input[name="card-5"]:checked').value);
    // console.log(document.querySelector('input[name="card-6"]:checked').value);
    // console.log(document.querySelector('input[name="card-7"]:checked').value);
    // console.log(document.querySelector('input[name="card-8"]:checked').value);
    // console.log(document.querySelector('input[name="card-9"]:checked').value);
    // if(null) {
    //     alert('debes contestar todas las preguntas')
    // }
}

getCategories();