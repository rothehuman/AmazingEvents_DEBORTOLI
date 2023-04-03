const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: '../assets/js/amazing.json',
            checkedEvents: [],
            allEvents: [],
            events: [],
            textSearch: '',
            categories: [],
            checkedCategories: [],
            date: ''
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
                    this.allEvents = apiData.events
                    this.date = apiData.currentDate
                    this.events = this.allEvents.filter(event => this.date > event.date)
                    console.log(this.events);
                    this.checkedEvents = this.events
                    this.getCategories(this.events)
                })
                .catch(error => console.log(error.message))
        },
        getCategories(array){
            array.forEach(category =>{
                if(!this.categories.includes(category.category) && category.category){
                    this.categories.push(category.category)
                }
            })
        },
    },
    computed:{
        filter(){
            let textFilter = this.events.filter(event => event.name.toLowerCase().includes(this.textSearch.toLowerCase()))
            if(!this.checkedCategories.length){
                this.checkedEvents = textFilter
            } else {
                this.checkedEvents = textFilter.filter(event => this.checkedCategories.includes(event.category))
            }
        }
    }
}).mount('#app')