<template>
  <div class="chat-side-menu">
    <!-- Header -->
    <div class="heard d-flex">
      <div>
        <img
          class="userimagenae"
          :src="require('../assets/images/card-7.jpg')"
          alt="Image"
          style="max-width: 100px; max-height: 50px"
        />
      </div>
      <h6 class="username">{{ getloginuser }}</h6>
    </div>
    <!-- Search bar -->
    <nav class="heard">
      <div class="search d-flex" role="search">
        <input
          class="border"
          v-model="searchTerms"
          placeholder="Search..."
          type="search"
          id="input"
        />
      </div>
    </nav>
    <!-- Chat content -->
    <div class="cchatontent" v-for="(item, index) in data" :key="index._id">
      <router-link :to="`/chat-app/${item?.userid}`">
        <div
          v-on:click="getToUserId = item.userid"
          class=""
          v-bind:class="
            item?.userid === this.getToUserId
              ? 'chatUsers d-flex bg-success'
              : 'chatUsers d-flex'
          "
        >
          <div>
            <img
              class="chatuserimage"
              :src="require('../assets/images/card-7.jpg')"
              alt="Banner Image"
              style="max-width: 100px; max-height: 50px"
            />
          </div>
          <div>
            <span class="user-name">{{ item?.mobile }}</span>
            <p class="user-message">ok</p>
          </div>
          <div>
            <p class="user-time">6:24 PM</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatSideMenu",
  data() {
    return {
      searchTerms: "",
      data: [],
      getloginuser: "",
      getToUserId: null,
    };
  },
  created() {
    this.getToUserId = this.$route.params.userid;
  },
  methods: {
    async getAllUserData() {
      const response = await axios.post("/getAllUser");
      this.data = response.data.data;
      console.log("getAllUserData", this.data);
    },
    async loginuser() {
      const response = await axios.get("/getloginuser");
      this.getloginuser = response.data.data[0].mobile;
      console.log("this.getloginuser", response);
    },
  },
  mounted() {
    this.getAllUserData();
    this.loginuser();
  },
};
</script>

<style scoped></style>
