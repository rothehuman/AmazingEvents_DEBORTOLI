const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get('id');

const details = document.getElementById('cardDetails');

async function createDetails(details){
    let data = await fetch('../assets/js/amazing.json')
    .then((response) => response.json())
    .then(data => {
        return data
    })

    const card = data.events.find(event => event._id == cardId);

    addCard(card);

    function addCard(event){
        let tarjeta = `
            <div class="mx-5 my-0">
                <div class="card mb-3 p-5" id="detail-card">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img class="m-2 px-2 img-fluid rounded-start detailImg" src="${event.image}" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-">
                                <h3 class="card-title text-center">${event.name}</h3>
                                <ul class="m-2">
                                <li>Date: ${event.date}</li>
                                <li>${event.description}</li>
                                <li>Category: ${event.category}</li>
                                <li>Place: ${event.place}</li>
                                <li>Capacity: ${event.capacity}</li>
                                <li>Assistance: ${event.assistance}</li>
                                <li>Estimate: ${event.estimate}</li>
                                <li>Price $${event.price}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        details.innerHTML = tarjeta;
    }
}

createDetails(details)



