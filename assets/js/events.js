import data from './amazing.js';

import {addCards, createCheckboxes, filter, textFilter, categoryFilter} from './functions.js';
const card = document.getElementById('eventCards')
const checkboxContainer = document.getElementById('categories')
const input = document.querySelector('input')

input.addEventListener('input',()=>{
    addCards(filter(data.events,input.value, card), card, true);
})

checkboxContainer.addEventListener('change',()=>{
    addCards(filter(data.events,input.value, card), card, true)
})

addCards(data.events, card, true)
createCheckboxes(data.events, checkboxContainer)

export {card, checkboxContainer, input};