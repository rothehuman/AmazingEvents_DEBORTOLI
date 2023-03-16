import data from './amazing.js';

import {addCards, createCheckboxes, filter, textFilter, categoryFilter} from './functions.js';
const card = document.getElementById('eventCards')
const checkboxContainer = document.getElementById('categories')
const input = document.querySelector('input')

input.addEventListener('input',()=>{
    addCards(filter(data.events,input.value, card), card);
})

checkboxContainer.addEventListener('change',()=>{
    addCards(filter(data.events,input.value, card), card)
})

addCards(data.events, card)
createCheckboxes(data.events, checkboxContainer)

export {card, checkboxContainer, input};