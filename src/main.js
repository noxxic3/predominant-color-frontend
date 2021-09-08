import { createApp } from 'vue'
import App from './App.vue'


import axios from 'axios';
axios.defaults.baseURL = 'http://localhost/Laravel/predominant-color-backend/public/api/';

const app = createApp(App); 

import Image_colors from './components/Image_colors.vue'
app.component('image-colors', Image_colors); 

app.mount('#app');