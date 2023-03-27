async function createCards(card, checkboxContainer, input, page){
    let data
    let events
    if (page == "home"){
        data = await fetch('./assets/js/amazing.json')
        .then((response) => response.json())
        .then(data => {
        return data
        })
        events = data.events
    }else if(page == "past"){
        data = await fetch('../assets/js/amazing.json')
        .then((response) => response.json())
        .then(data => {
        return data
        })
        events = data.events.filter(event => data.currentDate > event.date)
    }else if(page == "upcoming"){
        data = await fetch('../assets/js/amazing.json')
        .then((response) => response.json())
        .then(data => {
        return data
        })
        events = data.events.filter(event => data.currentDate < event.date)
    }

    input.addEventListener('input',()=>{
        addCards(filter(events,input.value, card), card, page);
    })
    
    checkboxContainer.addEventListener('change',()=>{
        addCards(filter(events,input.value, card), card, page)
    })
    
    addCards(events, card, page)
    createCheckboxes(events, checkboxContainer)
}

function addCards(array, cardsContainer, page){
    if(array.length == 0){
        cardsContainer.innerHTML = `<h2>Event not found</h2>`
        return
    }
    let tarjetas = ''
    array.forEach(event => {
        if (page == "home"){
            tarjetas += `
                <div class="card m-3" style="width: 18rem; height: 22rem;">
                <img src="${event.image}" class="card-img-top p-2" alt="...">
                <div class="card-body text-center card-body-header my-0 py-0">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="card-body d-flex flex-row justify-content-between">
                    <p>Price $${event.price}</p>
                    <a href="./pages/details.html?id=${event._id}" class="btn btn-light btn-outline-dark">view more</a>
                </div>
                </div>
            `
        }else{
            tarjetas +=    `
            <div class="card m-3" style="width: 18rem; height: 22rem;">
            <img src="${event.image}" class="card-img-top p-2" alt="...">
            <div class="card-body text-center card-body-header my-0 py-0">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
            </div>
            <div class="card-body d-flex flex-row justify-content-between">
                <p>Price $${event.price}</p>
                <a href="./details.html?id=${event._id}" class="btn btn-light btn-outline-dark">view more</a>
            </div>
            </div>
        `
        }
    })
    cardsContainer.innerHTML = tarjetas;
}

function createCheckboxes(array, checksContainer){
    let arrayCards = array.map(data => data.category)
    let setCard = new Set(arrayCards)
    let arrayChecks = Array.from(setCard)
    arrayChecks.sort()
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
    checksContainer.innerHTML = checkboxes;
}

function filter(array, text){
    let textFilterCards = textFilter(array,text);
    let checkTextFilterCards = categoryFilter(textFilterCards);
    return checkTextFilterCards;
}

function textFilter(array,text){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase()))
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

// Para crear tablas de stats.html

function eventRows(events, table){
    let allCategories = events.map(data => data.category)
    let categoriesSet = new Set(allCategories)
    let categories = Array.from(categoriesSet)
    categories.sort()

    categories.forEach(category => {
        let revenues = 0
        //let totalEvents = 0
        //let totalAttendance = 0
        let totalAssistance = 0
        let totalCapacity = 0

        events.forEach(event => {
            if((event.category == category)){
                revenues += event.revenues
                //totalEvents += 1
                //totalAttendance += event.attendance

                totalAssistance += (event.estimate ? event.estimate : event.assistance)
                totalCapacity += event.capacity
            }
        })

        //let percentageOfAttendance = Math.round(totalAttendance/totalEvents);

        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${category}</td>
            <td>$${revenues}</td>
            <td>${Math.round((totalAssistance/totalCapacity)*100)}%</td>
            `
            //<td>${percentageOfAttendance}</td>
        table.appendChild(tr);
    }
    )
}

async function createTable(eventsTBody, upcomingTBody, pastTBody){
    let data = await fetch('../assets/js/amazing.json')
    .then((response) => response.json())
    .then(data => {
        return data
    })

    let events = data.events.map((event)=>{
        event.attendance = Math.round(((event.estimate ? event.estimate : event.assistance) / event.capacity) * 100)
        event.revenues = Math.round((event.estimate ? event.estimate : event.assistance) * event.price)
        return event
    })

    let pastEvents = events.filter(event => data.currentDate > event.date)

    let upcomingEvents = events.filter(event => data.currentDate < event.date)

    let eventSortedByAttendance = events.sort(function(a, b) {
        return a.attendance - b.attendance;
    })

    let eventSortedByCapacity = events.sort(function(a, b) {
        return a.capacity - b.capacity;
    })

    function allEventsRow(){
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${eventSortedByAttendance[eventSortedByAttendance.length -1].name} (${eventSortedByAttendance[eventSortedByAttendance.length -1].attendance}%)</td>
        <td>${eventSortedByAttendance[0].name} (${eventSortedByAttendance[0].attendance}%)</td>
        <td>${eventSortedByAttendance[eventSortedByCapacity.length -1].name} (${eventSortedByAttendance[eventSortedByCapacity.length -1].capacity})</td>`
        eventsTBody.appendChild(tr);
    }
    allEventsRow()

    eventRows(upcomingEvents, upcomingTBody)
    eventRows(pastEvents, pastTBody)
}

export {createCards, addCards, createCheckboxes, filter, textFilter, categoryFilter, createTable};