import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery; //to can access jquery in application
import 'popper.js';
import 'bootstrap'; //to import bootstrap (js for bootstrap)
import './assets/app.scss'; //to import bootstrap (css for bootstrap)
import Swal from 'sweetalert2'; //add sweet alert library 
window.Swal = Swal; //to access sweet alert in each place in dom
import router from './router' //to add router to my project
Vue.component('Navbar', require('./components/Navbar.vue').default); //to require navbar
import {fb}  from './firebase'; //add firebase to my project
import VueFirestore from 'vue-firestore'; //add firestore to my project

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true, //  whether it is enumerable or not. Default is true.
});

Vue.use(VueFirestore);
Vue.config.productionTip = false

let app ='';

fb.auth().onAuthStateChanged(function() {
  if(!app) {
    new Vue({
    router,
    render: h => h(App)
    }).$mount('#app')
  }
});

