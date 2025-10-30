<template>
    <Navbar />
   <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
    
       
        <div
          class="main-content-wrapper main-content-table"
        >
          <h3 class="mr-0 add-bg-color-sub-header admin-add-product-title">
            Add Product
          </h3>
          <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="username"
                >Level<span class="text-danger h2">*</span></label
              >
              <input
                type="text"
                class="form-control border"
                id="title"
                v-model="level"
                required
              />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="username"
                >Percentage<span class="text-danger h2">*</span></label
              >
              <input
                type="text"
                class="form-control border"
                id="title"
                v-model="percentage"
                required
              />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-add-product-title">
              <label for="username"
                >Amount<span class="text-danger h2">*</span></label
              >
              <input
                type="text"
                class="form-control border"
                id="title"
                v-model="amount"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-block mx-auto p-1">
              <button
                type="submit"
                class="btn btn-outline-dark float-end admin-add-product-buttons"
                @click="cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-outline-dark float-end admin-add-product-buttons"
                v-on:click="addleveluser"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";

export default {
  name: "AdminLevelUser",
  components: {
    Navbar,
    SaidMenuBar,
  },
  data() {
    return {
      level: null,
      percentage: null,
      amount: null,
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "AdminSetLavelUser" });
    },
    async addleveluser() {
      try {
        const response = await axios.post(`admin/addleveluser`, {
          lavel_id: this.level,
          percentage: this.percentage,
          amount: this.amount,
        });
        this.$router.push({ name: "AdminSetLavelUser" });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
