import data from "./amazing.js"

//Dado un arreglo de events y una fecha, retorna un ARREGLO con los eventos con fecha igual a la fecha pasada
function dateEvents(events, datee){
    let cardsE = ''

    for(let event of events){
        if (event.date == datee) {
            cardsE += `
                <div class="card m-3" style="width: 18rem; height: 22rem;">
                <img src="${event.image}" class="card-img-top p-2" alt="...">
                <div class="card-body text-center card-body-header my-0 py-0">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="card-body d-flex flex-row justify-content-between">
                    <p>Price $${event.price}</p>
                    <a href="../../pages/details.html" class="btn btn-light btn-outline-dark">view more</a>
                </div>
                </div>
            `
        }
    }
    return cardsE;
}

const cards = document.querySelector('#eventCards');

let tarjetas = '';

for(let event of data.events){
    tarjetas += `
    <div class="card m-3" style="width: 18rem; height: 22rem;">
    <img src="${event.image}" class="card-img-top p-2" alt="..."></img>    
    <div class="card-body text-center card-body-header my-0 py-0">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
    </div>
    <div class="card-body d-flex flex-row justify-content-between">
        <p>Price $${event.price}</p>
        <a href="../../pages/details.html" class="btn btn-light btn-outline-dark">view more</a>
    </div>
    </div>`
}

cards.innerHTML = tarjetas

/*
for(let event of data.events){
    const tarjeta = document.createElement('div')

    tarjeta.classList.add('card', 'm-3')
    tarjeta.style.width = '18rem'
    tarjeta.style.height = '25rem'
    tarjeta.innerHTML = `
        <img src="${event.image}" class="card-img-top p-3" alt="...">
        <div class="card-body text-center card-body-header">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-body d-flex flex-row justify-content-between">
            <p>Price $${event.price}</p>
            <a href="../../pages/details.html" class="btn btn-light btn-outline-dark">view more</a>
        </div>
    `
    cards.appendChild(tarjeta)
}
*/

/*<div class="card m-3" style="width: 18rem;">
    <img src="./assets/img/food_fair.jpg" class="card-img-top p-3" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">Title</h5>
        <p class="card-text">descriptive text</p>
    </div>
    <div class="card-body d-flex flex-row justify-content-between">
        <p>Price $00000</p>
        <a href="#" class="btn btn-light btn-outline-dark">view more</a>
    </div>
</div>*/
