import data from './amazing.js';

import {addCards, createCheckboxes, filter, textFilter, categoryFilter, pastEvents} from './functions.js';
const card = document.getElementById('eventCards')
const checkboxContainer = document.getElementById('categories')
const input = document.querySelector('input')

input.addEventListener('input',()=>{
    pastEvents(data.currentDate, filter(data.events,input.value, card), card)
})

checkboxContainer.addEventListener('change',()=>{
    pastEvents(data.currentDate, filter(data.events,input.value, card), card)
})

pastEvents(data.currentDate, data.events, card);
createCheckboxes(data.events, checkboxContainer);

export {card, checkboxContainer, input};