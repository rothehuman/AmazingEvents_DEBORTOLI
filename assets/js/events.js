const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: './assets/js/amazing.json',
            checkedEvents: [],
            events: [],
            textSearch: '',
            categories: [],
            checkedCategories: [],
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
                    this.events = apiData.events
                    this.checkedEvents = this.events
                    this.getCategories(apiData.events)

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