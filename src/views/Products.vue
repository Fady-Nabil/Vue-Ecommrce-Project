<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products</h3>
          </div>
          <div class="col-md-6">
            <img class="img-fluid" src="/img/svg/product.svg">
          </div>
        </div>
      </div>

      <!--
      <h3>Create Product</h3>
      <div class="product-test">
        <div class="form-group">
          <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Price" v-model="product.price" class="form-control">
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="saveData">Save Data</button>
        </div>
      </div>
      -->

      <hr>
      <h3 class="d-inline-block float-left">Products List</h3>
      <button @click="addNew()" class="btn btn-primary float-right">Add Product</button>
      <table class="table table-hover table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.id">
            <td> {{product.name}} </td> <!--{{product.data().name }} in the last when using firebase-->
            <td> {{product.price}} </td>
            <td>
              <button @click="EditProduct(product)" class="btn btn-success">Edit</button>
            </td>
            <td>
              <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    

    <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" v-if = "title =='Add Product'" id="editLabel">{{title}}</h5>
              <h5 class="modal-title" v-if = "title =='Edit Product'" id="editLabel">{{title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                      <!--<textarea rows="7" placeholder="Product Description" v-model="product.description" class="form-control"></textarea>-->
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>
                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="text"  placeholder="Product tags" v-model="product.tag" class="form-control">
                      <div class="d-flex">
                    
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file"  class="form-control">
                    </div>
                    <div class="form-group d-flex">
                    </div>
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button"  v-if="modal == 'new'" class="btn btn-primary">Save changes</button>
              <button @click="updateProduct()" type="button" v-if="modal == 'edit'" class="btn btn-primary">Apply changes</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"; //for using editor
import {db} from '../firebase.js';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default {
  name: 'Products',
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      //products: [],
      product: {
        name        : null,
        description : null,
        price       : null,
        tag         : null,
        image       : null
      },
      activeItem : null,
      title : null,
      modal : null
    }
  },
  firestore() {
    return {
      // Collection
      products: db.collection('products'),
    }
  },
  methods: {
  addNew() {
    this.title = 'Add Product';
    this.modal = 'new';
    $('#product').modal('show');
    },
    /*
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          this.products.push(doc);
        });
      });  
    },*/
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Swal.fire(
        'Updated!',
        'Your file has been updated.',
        'success'
      )
      $('#product').modal('hide');
      /*
      update with firebase 

      db.collection("products").doc(this.activeItem).update(this.product)
      .then(() => {
        $('#editModal').modal('hide');
        this.watcher();
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      */
    },
    EditProduct(product) { //display edit modal to edit product
      this.title = 'Edit Product';
      this.modal = 'edit';
      this.product = product; //product.data(); previously
      $('#product').modal('show'); //('# here put modal id')
      //this.activeItem = product['.key'];
    },
    deleteProduct(doc) { //delete product
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.$firestore.products.doc(doc['.key']).delete()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    /*
      firebase delete method

      if(confirm('Are you sure ?'))
      {
          db.collection("products").doc(doc).delete().then(function() {
            console.log("Document successfully deleted!");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    */
    },
    readData() { //get all products data from database and display them
      /*
        read data with firebase

        db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.products.push(doc);
        });
      });
      */
    },
    addProduct() { //insert data inside database
      /* using firestore way */
      this.$firestore.products.add(this.product);
      Swal.fire(
        'Created!',
        'Your file has been created.',
        'success'
      )
      $('#product').modal('hide');

      /* 
      *Using firebase methods

      db.collection("products").add(this.product)
      .then((docRef) => { //when function word was exist the reset function is undefined but to fix this we will use es6 version
        console.log("Document written with ID: ", docRef.id);
        this.readData();//to clear inputs after product added to database
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      */
    },
    reset() {
      //Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  created() { //when page is displayed in browser when user insert new data append it to table
    this.readData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
