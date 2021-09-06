<template>
  <h2>Colors</h2>

  <!--<form action="/">-->
    <label for="i_name">Image name:</label><br>
    <input type="text" id="i_name" name="i_name" v-model="imageName"><br>

    <label for="i_file">Image:</label><br>                                                      
    <input type="file" id="i_file" name="i_file"  ref="file"   v-on:change="attach()">   <!--  enctype="multipart/form-data" -->
    <br><br> 

    <button v-on:click="sendToBackend()">Send</button>
  <!--</form>--> 

</template>

<script>
import axios from 'axios';

export default {
  name: 'Colors',

  data(){
    return {
      imageName: "",
      image: null,
    }
  },

  methods: {
    attach(){    
      this.image = this.$refs.file.files[0];                                        // We only want to send the only file that has been attached.
      console.log('>>>> element files array   >>>> ', this.$refs.file);             // If we see the .files property of the type="file" element, we see that it is an array that will have all the files that have been added to that element.
      console.log('>>>> element file selected >>>> ', this.$refs.file.files[0]);
    },
    sendToBackend(){
      alert(this.imageName);

      // POST request with file
      let formData = new FormData();                               //  ++++++++++++     // Para enviar archivos a través de AJAX, tenemos que usar un objeto de tipo FormData
      formData.append('image_name', this.imageName);                 
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
      })                                                  
      .catch(error => console.log(error.response));  
      
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
