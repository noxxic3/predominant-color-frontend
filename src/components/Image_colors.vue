<template>
  <h2>Image</h2>
  <form v-on:submit.prevent="sendToBackend()">     
    <label for="image_file" style="cursor: pointer;"  class="addImgButton">Add image</label>            <!-- APUNTES -->                                             
    <input type="file" accept="image/gif, image/jpeg, image/png" id="image_file" name="image_file"  ref="file"   v-on:change="attach($event)"  style="display: none;">    
    <br><br> 
    <!--<button>Send</button>-->                                                        <!-- APUNTES -->
    <input type="submit" value="Send">
    <!--<button v-on:click="sendToBackend()">Send</button>-->                           <!-- APUNTES -->
  </form> 
  <img id="image_show" ref="image_show" width="200" />

  <p class="loadMessage" v-if="loading">Calculating the color...</p>
  
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
  name: 'Image colors',
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
      // Assign the file to the data that will be sent in the form
      this.image = this.$refs.file.files[0];                                        // We only want to send the only file that has been attached.
      // Assign the image to the img element through which it will be displayed 
      var imageShow = this.$refs.image_show;
      imageShow.src = URL.createObjectURL(event.target.files[0]);

      console.log('>>>> element files array   >>>> ', this.$refs.file);             // If we see the .files property of the type="file" element, we see that it is an array that will have all the files that have been added to that element.
      console.log('>>>> element file selected >>>> ', this.$refs.file.files[0]);
    },
    sendToBackend(){
      if (this.validatedForm()) { 
        this.loading = true;  
        this.closestColorName = null;
        this.closestColorValue = null;   

        // POST request with file
        let formData = new FormData();                         
        formData.append('image', this.image);           
        console.log('>> formData >> ', formData);

        axios({
          method: 'post',
          url: 'images',
          headers: {
            'Content-Type': 'multipart/form-data'                        
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
  width: 95%;

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


.addImgButton {
  background-color: lightgrey;
  border: 1px solid black;
  padding: 5px;
}

#image_show {
  margin-top: 20px;
}


@media only screen and (min-width: 600px) {
  .palette {
    width: 80%;
  }
}
</style>
