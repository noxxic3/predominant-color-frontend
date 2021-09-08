<template>
  <h2>Image</h2>

  <!--<form action="/">-->
    <label for="i_file">Add image:</label><br>                                                      
    <input type="file" id="i_file" name="i_file"  ref="file"   v-on:change="attach()">   <!--  enctype="multipart/form-data" -->
    <br><br> 

    <button v-on:click="sendToBackend()">Send</button>
  <!--</form>--> 

  <p class="loadMessage" v-show="loading">Calculating the color...</p>
  
  <h2>Closest color</h2>
  <div class="closestColor" v-bind:style="{backgroundColor: closestColorValue}">         <!-- APUNTES -->
    <p class="colorText">{{closestColorName}}</p>
  </div>
  
  <h2>Color palette</h2>
  <div class="palette">
    <div v-for="(color, key, index) in colorPalette" v-bind:key='index' v-bind:style="{backgroundColor: color}" class="colors">
      <p class="colorText">{{key}}</p>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'Colors',

  data(){
    return {
      image: null,
      colorPalette: {
        "Aqua": "#00FFFF",
        "Black": "#000000",
        "Blue": "#0000FF",
        "Fuchsia": "#FF00FF",
        "Navy": "#000080",
        "Olive": "#808000",
        "Purple": "#800080",
        "Red": "#FF0000",
        "Gray": "#808080",
        "Green": "#008000",
        "Lime": "#00FF00",
        "Maroon": "#800000",
        "Silver": "#C0C0C0",
        "Teal": "#008080",
        "White": "#FFFFFF",
        "Yellow": "#FFFF00"
      },
      closestColorName: null,
      closestColorValue: null,
      loading: false,
    }
  },

  methods: {
    attach(){    
      this.image = this.$refs.file.files[0];                                        // We only want to send the only file that has been attached.
      console.log('>>>> element files array   >>>> ', this.$refs.file);             // If we see the .files property of the type="file" element, we see that it is an array that will have all the files that have been added to that element.
      console.log('>>>> element file selected >>>> ', this.$refs.file.files[0]);
    },
    sendToBackend(){
      
      if (this.validatedForm()) { 
        
        this.loading = true;  
        this.closestColorName = null;
        this.closestColorValue = null;   

        // POST request with file
        let formData = new FormData();                               //  ++++++++++++     // Para enviar archivos a través de AJAX, tenemos que usar un objeto de tipo FormData                 
        formData.append('image', this.image);               //  ++++++++++++      <<----  Aquí le asignamos el valor del file del formulario que ahora sí lo adjuntamos y en attach() (función que creamos para escoger el file del array del elemento input type="file") cojemos el file que queremos. Antes no lo adjuntaba y se asignaba la variable  this.userImage  entera sin coger del array files el que quería.
        console.log('>> formData >> ', formData);

        axios({
          method: 'post',
          url: 'images',
          headers: {
            //'Authorization': 'Bearer ' + response_data_acces_token,
            //'Content-type': 'application/json',
            'Content-Type': 'multipart/form-data'                         //  ++++++++++++       // Para enviar archivos a través de AJAX, tenemos que poner este valor de header que equivale al valor del atributo  enctype="multipart/form-data"  que ponemos en el elemento <form> cuando queremos enviar archivos.
          },    
          data: formData,                                      
        })
        .then(res => {                                   
          console.log(res);
          console.log(res.data);
          console.log(res.status);
          this.loading = false;
          this.closestColorName = Object.keys(res.data)[0];                   // APUNTES  // Get the unknown name (key) of the only property of the received object  
          this.closestColorValue = res.data[this.closestColorName];           // APUNTES  // Get the value of the only property of the received object  
        })                                                  
        .catch(error => console.log(error.response)); 
        
      } 
      
    },
    validatedForm(){
      if (this.image) { 
        return true;
      } else {
        alert("Please, add a picture before submitting");
        return false;
      }
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.palette {
  margin: auto;
  width: 80%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.palette > .colors {
  width: 80px;
  height: 80px;
  margin: 1%;
  border: 1px solid black;
}
.colorText {
  background-color: rgba(220, 220, 220, 0.6);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.closestColor{
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}


@keyframes loadingAnimation {               
  0%   {opacity: 100%;}        
  50%  {opacity: 10%;}
  100% {opacity: 100%;}
}

.loadMessage { 
  color: #363636;
  animation-name: loadingAnimation;
  animation-duration: 1s;
  animation-iteration-count: infinite;  
}

</style>
