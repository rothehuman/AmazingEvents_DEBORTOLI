/* let eventos 
async function getEvents(){
    await fetch('./amazing.json')
    .then((response) => response.json())
    .then(data => {
        eventos = data.events
        console.log(eventos);
    })

    
} */

let data = getEvents()
async function getEvents(){
    let data = await fetch('./amazing.json')
    .then((response) => response.json())
    .then(data => {
        return data
    })

    data.events.forEach(element => {
        console.log(element._id);
    });
    
    return data
}




export {data}
 










    /* function addFavorite(nombre) {
       let personaje = arrayPersonajes.find((personaje)=> personaje.name == nombre )

        let favoritesInStorage = localStorage.getItem('favorites')

        let ids = JSON.parse(favoritesInStorage)
        .map((favorito => favorito.id))

        if(!favoritesInStorage){

            let arrayPersonajesInStorage = [personaje]
        
            localStorage.setItem("favorites",JSON.stringify(arrayPersonajesInStorage))
        }

        
        if(!ids.includes(personaje.id)){
            let arrayfavoritesInStorage = JSON.parse(favoritesInStorage)
            arrayfavoritesInStorage.push(personaje)
            localStorage.setItem("favorites",JSON.stringify(arrayfavoritesInStorage))
           
        }
        
    } */

/* function dibujarCards(personajes) {


    if(container){
        arrayPersonajesADibujar = personajes 
    }
    else{
        arrayPersonajesADibujar = JSON.parse(localStorage.getItem("favorites"))

    }

    let stringHTML = ""

    arrayPersonajesADibujar.forEach(personaje => {


        stringHTML += `
                <div onclick="addFavorite('${personaje.name}')" class="card" style="width: 18rem;">
  <img src="${personaje.image}" class="card-img-top" alt="...">
  <div  class="card-body">
    <h5 class="card-title">${personaje.name}</h5>
  </div>
</div>
                `

    });

    if(container){
        container.innerHTML = stringHTML

    }else{

        favorites.innerHTML = stringHTML
    }
} */