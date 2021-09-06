<template>
  <h1>Colors</h1>

  <!--<form action="/">-->
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname" v-model="userName"><br>

    <button v-on:click="sendToBackend()">Send</button>
  <!--</form>--> 

</template>

<script>
import axios from 'axios';

export default {
  name: 'Colors',

  data(){
    return {
      userName: "",
    }
  },

  methods: {
    sendToBackend(){
      alert(this.userName);

      // POST si NO enviamos archivos

      let data = {                                 
        user_name: this.userName,
      };

      axios({
        method: 'post',
        url: 'images',
        data: data,                                       
        headers: {
        //'Authorization': 'Bearer ' + response_data_acces_token,
        //'Content-type': 'application/json',                // No es necesario, funciona igual si no se envía. Debe ser el valor por defecto.
        }
      })
      .then(res => {                                   
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      })                                                  
      .catch(error => console.log(error.response));  

      /*
      // POST si enviamos archivos
      let formData = new FormData();                               //  ++++++++++++     // Para enviar archivos a través de AJAX, tenemos que usar un objeto de tipo FormData
      formData.append('role_name', this.userRole);                 
      formData.append('user_name', this.userName);                 
      formData.append('user_image', this.userImage);               //  ++++++++++++      <<----  Aquí le asignamos el valor del file del formulario que ahora sí lo adjuntamos y en attach() (función que creamos para escoger el file del array del elemento input type="file") cojemos el file que queremos. Antes no lo adjuntaba y se asignaba la variable  this.userImage  entera sin coger del array files el que quería.
      console.log('>> formData >> ', formData);

      axios({
      method: 'post',
      url: 'images',
      headers: {
        'Authorization': 'Bearer ' + response_data_acces_token,
        //'Content-type': 'application/json',
        'Content-Type': 'multipart/form-data'                         //  ++++++++++++       // Para enviar archivos a través de AJAX, tenemos que poner este valor de header que equivale al valor del atributo  enctype="multipart/form-data"  que ponemos en el elemento <form> cuando queremos enviar archivos.
      },    
      data: formData,                                      
      })
      .then(res => {                                   
      console.log(res);
      console.log(res.status);
      })                                                  
      .catch(error => console.log(error.response));  
      */
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
