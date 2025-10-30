<template>
    <Navbar />
  <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
     
        
        <div class="main-content-wrapper main-content-table">
          <h3 class="mr-0 add-bg-color-sub-header admin-add-product-title">
            Add Product
          </h3>
          <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="Description">Description<span class="text-danger h2">*</span></label>
              <textarea type="text" class="form-control border p-2 bg-white" id="Description" v-model="description"
                required></textarea>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="Price">Price<span class="text-danger h2">*</span></label>
              <input type="text" class="form-control border" id="Price" v-model="price" required />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="Image">Images<span class="text-danger h2">*Size(1500x1500)</span></label>
              <input type="file" class="form-control border" id="Image" @change="uploadFile" required />
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-block mx-auto p-1">
              <button type="button" class="btn btn-outline-dark float-end admin-add-product-buttons" @click="cancel">
                Cancel
              </button>
              <button type="button" class="btn btn-outline-dark float-end admin-add-product-buttons"
                @click="addProduct">
                Submit
              </button>
            </div>
          </div>
        </div>
       
  </div>
  <!-- loader -->
  <div class="loadings" v-show="loader">
    <AdminLoader />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminAddProduct",
  components: {
    Navbar,
    SaidMenuBar,
    AdminLoader
  },
  data() {
    return {
      description: null,
      price: null,
      image: null,
      formData: new FormData(),
      loader: false,
    };
  },
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      this.formData.append("image", file);
    },
    cancel() {
      this.$router.push({ name: "AdminManageProduct" });
    },
    async addProduct() {
      this.loader = true;
      this.formData.append("name", this.description);
      this.formData.append("price", this.price);
      try {
        await axios.post(`/admin/addproduct`, this.formData);
        this.description = null;
        this.price = null;
        this.image = null;
        this.formData = new FormData();
        this.$router.push({ name: "AdminManageProduct" });
        this.loader = false;
      } catch (error) {
        console.error("Error occurred while submitting the form:", error);
      }
    },
  },
};
</script>
