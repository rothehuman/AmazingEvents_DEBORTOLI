function addCards(array){
    if(array.length == 0){
        card.innerHTML = `<h2>Event not found</h2>`
        return
    }
    let tarjetas = ''
    array.forEach(event => {
        tarjetas += `
        <div class="card m-3" style="width: 18rem; height: 22rem;">
        <img src="${event.image}" class="card-img-top p-2" alt="...">
        <div class="card-body text-center card-body-header my-0 py-0">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-body d-flex flex-row justify-content-between">
            <p>Price $${event.price}</p>
            <a href="../../pages/details.html?id=${event._id}" class="btn btn-light btn-outline-dark">view more</a>
        </div>
        </div>
    `
    })
    card.innerHTML = tarjetas
}

function createCheckboxes(array){
    let arrayCards = array.map(dataa => dataa.category)
    let setCard = new Set(arrayCards)
    let arrayChecks = Array.from(setCard)
    let checkboxes = ''
    arrayChecks.forEach(category => {
        checkboxes += `
        <li class="nav-item">
            <div class="form-check mx-3 p-1">
                <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
                <label class="form-check-label" for="${category}">
                ${category}
                </label>
            </div>
        </li>
        `
    })
    checkboxContainer.innerHTML = checkboxes
}

function filter(){
    let primerFiltro = textFilter(data.events,input.value);
    let segundoFiltro = categoryFilter(primerFiltro);
    addCards(segundoFiltro);
}

function textFilter(array,texto){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function categoryFilter(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    let arrayFiltrado = array.filter(element => arrayChecksCheckedValues.includes(element.category))
    if(arrayChecksChecked.length > 0){
        return arrayFiltrado
    }
    return array
}

export {addCards, createCheckboxes, filter, textFilter, categoryFilter};