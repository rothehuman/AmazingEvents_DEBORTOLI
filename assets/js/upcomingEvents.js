import data from "./amazing.js"

//Dado un arreglo de events y una fecha, retorna un ARREGLO con los eventos posteriores a la fecha pasada
function upcomingEvents(events, datee){
    let cardsE = ''

    for(let event of events){
        if (event.date > datee) {
            cardsE += `
                <div class="card m-3" style="width: 18rem; height: 25rem;">
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

let tarjetas = upcomingEvents(data.events, data.currentDate);

cards.innerHTML = tarjetas