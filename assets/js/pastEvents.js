import {createCards} from './functions.js';
const card = document.getElementById('eventCards')
const checkboxContainer = document.getElementById('categories')
const input = document.querySelector('input')

createCards(card, checkboxContainer, input, "past")