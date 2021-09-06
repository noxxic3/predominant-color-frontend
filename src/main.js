import { createApp } from 'vue'
import App from './App.vue'


import axios from 'axios';
axios.defaults.baseURL = 'http://localhost/Laravel/predominant-color-backend/public/api/';        
                        // http://localhost/Laravel/predominant-color-backend/public/api/images/1


const app = createApp(App); 

import Colors from './components/Colors.vue'
app.component('colors', Colors); 

app.mount('#app');