import data from './amazing.js';

import {addCards, createCheckboxes, filter, textFilter, categoryFilter, upcomingEvents} from './functions.js';
const card = document.getElementById('eventCards')
const checkboxContainer = document.getElementById('categories')
const input = document.querySelector('input')

input.addEventListener('input',()=>{
    upcomingEvents(data.currentDate, filter(data.events,input.value, card), card)
})

checkboxContainer.addEventListener('change',()=>{
    upcomingEvents(data.currentDate, filter(data.events,input.value, card), card)
})

upcomingEvents(data.currentDate, data.events, card);
createCheckboxes(data.events, checkboxContainer);

export {card, checkboxContainer, input};