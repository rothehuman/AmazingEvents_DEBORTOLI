import {createTable} from './functions.js';

const eventsTBody = document.getElementById('allTable');
const upcomingTBody = document.getElementById('upcomingTable');
const pastTBody = document.getElementById('pastTable');

createTable(eventsTBody, upcomingTBody, pastTBody);