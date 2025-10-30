<template>
    <Navbar />
   <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
    
        <div class="main-content-wrapper main-content-table">
          <h3 class="mr-0 add-bg-color-sub-header admin-add-mannage-banner-title">
            Add Banner
          </h3>
          <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-mannage-banner-title">
              <label for="title">Add Title<span class="text-danger h2">*</span></label>
              <input type="text" class="form-control border" id="title" v-model="title" required />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-mannage-banner-title">
              <label for="material">Images<span class="text-danger h2">*</span></label>
              <input type="file" class="form-control border" @change="uploadFile($event)" id="material" required />
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-block mx-auto p-1">
              <button type="button" class="btn btn-outline-dark float-end admin-add-mannage-banner-buttons"
                @click="cancel">
                Cancel
              </button>
              <button type="button" class="btn btn-outline-dark float-end admin-add-mannage-banner-buttons"
                @click="submitForm">
                Submit
              </button>
            </div>
          </div>
        </div>
      
  </div>
  <!-- loader -->
  <div class="loadings" v-show="loader" style="/* display: none; */">
    <AdminLoader />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminAddBanner",
  components: {
    Navbar,
    SaidMenuBar,
    AdminLoader,
  },
  data() {
    return {
      title: null,
      material: null,
      formData: new FormData(),
      loader: false,
    };
  },
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      this.formData.append("material", file);
    },
    cancel() {
      this.$router.push({ name: "AdminManageBanner" });
    },
    async submitForm() {
      this.loader = true;
      this.formData.append("banner_title", this.title);
      try {
        await axios.post(`/admin/addbanner`, this.formData);
        this.title = null;
        this.material = null;
        this.formData = new FormData();
        this.$router.push({ name: "AdminManageBanner" });
        this.loader = false;
      } catch (error) {
        console.error("Error occurred while submitting the form:", error);
      }
    },
  },
};
</script>
