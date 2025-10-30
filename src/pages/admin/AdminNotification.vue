<template>
    <Navbar />
  <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
    
        
        <div  class="main-content-wrapper main-content-table Period_History" >
        <div  class="period_history_table" >
          <h3 class="mr-0 add-bg-color-sub-header admin-notification-title">
            Notification
          </h3>
          <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 admin-notification-title">
              <label for="username"
                >Title <span class="text-danger h2">*</span></label
              >
              <input
                type="text"
                class="form-control border pl-1"
                id="title"
                v-model="title"
                required
              />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 admin-notification-title">
              <label for="description"
                >Description <span class="text-danger h2">*</span></label
              >
              <textarea
                type="text"
                class="form-control border pl-1"
                id="description"
                v-model="description"
                required
              ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-block mx-auto p-1">
              <button
                type="submit"
                class="btn btn-outline-dark float-end admin-notification-buttons"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-outline-dark float-end admin-notification-buttons"
                v-on:click="submitForm"
              >
                Submit
              </button>
            </div>
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
  name: "AdminNotification",
  components: {
    Navbar,
    SaidMenuBar,
  },
  data() {
    return {
      title: "",
      description: "",
      notification: {},
    };
  },
  methods: {
    async submitForm() {
      await axios.post("/admin/notification", {
        heading: this.title,
        content: this.description,
      });
    },
    async GetNotification() {
      const response = await axios.get("admin/getnotification", {});
      this.notification = response.data.notification;
      this.title = this.notification.heading;
      this.description = this.notification.content;
    },
  },
  created() {
    this.GetNotification();
  },
};
</script>
