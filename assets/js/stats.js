const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: '../assets/js/amazing.json',
            events: [],
            eventSortedByAttendance: [],
            eventSortedByCapacity: [],
            pastEventsStats:[],
            upcomingEventsStats: [],
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
                    this.events = apiData.events.map((event)=>{
                        event.attendance = Math.round(((event.estimate ? event.estimate : event.assistance) / event.capacity) * 100)
                        event.revenues = Math.round((event.estimate ? event.estimate : event.assistance) * event.price)
                        return event
                    })
                    this.eventSortedByAttendance = this.events.sort(function(a, b) {
                        return a.attendance - b.attendance;
                    })
                    this.eventSortedByCapacity = this.events.sort(function(a, b) {
                        return a.capacity - b.capacity;
                    })
                    this.date = apiData.currentDate
                    this.pastEventsStats = this.eventsStats(this.events.filter(event => this.date > event.date))
                    this.upcomingEventsStats = this.eventsStats(this.events.filter(event => this.date < event.date))
                })
                .catch(error => console.log(error.message))
        },
        eventsStats(events){
            let categories = []
            events.forEach(event => {
                if(!categories.includes(event.category) && event.category){
                    categories.push(event.category)
                }
            })

            let eventsStats = []
            categories.forEach(category => {
                let revenues = 0
                let totalAttendance = 0
                let totalCapacity = 0
        
                events.forEach(event => {
                    if((event.category == category)){
                        revenues += event.revenues
                        totalAttendance += (event.estimate ? event.estimate : event.assistance)
                        totalCapacity += event.capacity
                    }
                })
                eventsStats.push({"category": category, "revenues": revenues, "attendance": Math.round((totalAttendance/totalCapacity)*100)})
            })
            return eventsStats
        },
    },
    computed:{
        superFiltro(){
            
        }
    }
}).mount('#app')