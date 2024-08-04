import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

function readSingleFile(newval, old, e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    console.info(contents);

  }

const app = createApp(App)
app.use(Vueform, vueformConfig)
app.mount('#app')

