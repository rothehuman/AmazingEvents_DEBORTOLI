const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get('id');

const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: '../assets/js/amazing.json',
            event: {}
        }
    },
    created(){
        this.getData()
    },
    mounted(){
    },
    
    methods:{
        getData(){
            fetch(this.apiUrl)
                .then(response => response.json())
                .then(apiData =>{
                    this.event = apiData.events.find(event => event._id == cardId);
                })
                .catch(error => console.log(error.message))
        }
    }
}).mount('#app')



