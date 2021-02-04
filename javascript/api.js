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
        const answer01 = `<label class="form-check-label" for="correct"><input class="form-check-input" type="radio" name="card-${index}" id="correct" value="1" required>${element.correct_answer}</label>`,
              answer02 = `<label class="form-check-label" for="wrong01"><input class="form-check-input" type="radio" name="card-${index}" id="wrong01" value="0" required>${element.incorrect_answers[0]}</label>`,
              answer03 = `<label class="form-check-label" for="wrong02"><input class="form-check-input" type="radio" name="card-${index}" id="wrong02" value="0" required>${element.incorrect_answers[1]}</label>`,
              answer04 = `<label class="form-check-label" for="wrong03"><input class="form-check-input" type="radio" name="card-${index}" id="wrong03" value="0" required>${element.incorrect_answers[2]}</label>`;
        const arrayAnswers = [answer01, answer02, answer03, answer04];

        //Random function
        arrayAnswers.sort(() => { 
            return Math.random() - 0.5
        })
        
        questionContainer.innerHTML += `<div class="col-md-3 my-4">
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

// function results() {
//     const selectResul = document.querySelector('input[name="card-0"]:checked').value;
//     const selectResul = document.querySelector('input[name="card-1"]:checked').value;
//     const selectResul = document.querySelector('input[name="card-2"]:checked').value;
//     const selectResul = document.querySelector('input[name="card-3"]:checked').value;


//     console.log(selectResul);
//     if(selectResul == 1 ) {
//         alert('Tu respuesta es correcta');
//     } else {
//         alert('Tu respuesta es incorrecta');
//     }
// }

getCategories();


