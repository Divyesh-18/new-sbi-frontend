<template>
  <div class="main-chat-parent">
    <div
      class="main-chat-parent"
      :class="{ 'flex-layout': screenWidth >= 760 }"
    >
      <div
        v-bind:class="isShowList === true ? '' : ''"
        v-if="isShowList === true && screenWidth >= 760"
      >
        {{ console.log("screenWidth", screenWidth) }}
        <SideBarComponent
          :datas="data"
          :selectedUserId="selectedUserId"
          @select-user="selectUser"
          :getloginuser="getloginuser"
          :isSidebarVisible="!isUserChatActive"
          :search-terms="searchTerms"
          @update-search-terms="updateSearchTerms"
        />
      </div>
      <div v-if="isShowList === true && screenWidth <= 760">
        {{ console.log("screenWidth", screenWidth) }}
        <router-link :to="`/chat-app/${data?.userid}`">
          <side-bar-component
            :datas="data"
            :selectedUserId="selectedUserId"
            :getloginuser="getloginuser"
            @select-user="selectUser"
            :is-show-list="isShowList"
            @toggle-list="handleToggleList"
            :search-terms="searchTerms"
            @update-search-terms="updateSearchTerms"
          ></side-bar-component>
        </router-link>
      </div>

      <div class="default-page">
        <!-- <h3 class="pt-3">Welcome to chat app!</h3> -->
        <img
          :src="require('../assets/images/robot.gif')"
          alt=""
          class="image-center"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import SideBarComponent from "./chatAppComponent/chatAppSideBarComponent.vue";

export default {
  name: "UserChat",
  components: {
    SideBarComponent,
  },

  data() {
    return {
      message: null,
      selectedUserId: null,
      messageGetData: [],
      searchTerms: "",
      data: [],
      getloginuser: "",
      socket: null,
      isTyping: false,
      typingTimeout: null,
      messageSender: null,
      getloginuserid: null,
      screenWidth: window.innerWidth,
      isUserChatActive: false,
      isShowList: true,
    };
  },
  computed: {
    isSidebarExpanded() {
      return this.screenWidth >= 760;
    },
  },
  created() {
    this.selectedUserId = this.$route.params.userid;
    console.log("this.selectesUserId", this.$route);
    this.socket = io("http://localhost:3004");

    this.socket.on("msg-received", (message) => {
      console.log("msg-received", message);
      const fromSelf = message.senderid === this.selectedUserId;
      if (fromSelf || message.sender === this.selectedUserId) {
        this.messageGetData?.push({ ...message, fromSelf });
        this.getAllUserData();
      }
    });

    this.socket.on("typing", (userId) => {
      console.log("userId", userId);
      this.isTyping = userId === this.selectedUserId;
      this.typingTimeout = setTimeout(() => {
        this.stopTyping();
      }, 1000);
    });
    window.addEventListener("resize", this.updateScreenWidth);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  methods: {
    startTyping() {
      if (!this.isTyping) {
        this.typingTimeout = setTimeout(() => {
          this.stopTyping();
        }, 3000);
        this.socket.emit("typing", this.getloginuserid);
      }
    },
    stopTyping() {
      clearTimeout(this.typingTimeout);
      this.isTyping = false;
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = date.toLocaleDateString();
      return `${time} ${formattedDate}`;
    },
    async sendMessageUsingSocket() {
      const newMessage = {
        message: this.message,
        from: this.getloginuserid,
        senderid: this.selectedUserId,
        sender: this.getloginuserid,
        created_at: new Date(),
      };
      console.log("new message", newMessage);
      if (newMessage.sender === this.getloginuserid) {
        if (this.message) {
          this.socket.emit("send-msg", newMessage);
          this.getAllUserData();
        }
      }
      this.message = "";
    },
    async sendMessage() {
      if (this.message) {
        await axios.post("/addmessage", {
          message: this.message,
          senderid: this.selectedUserId,
        });
        this.message = "";
      }
    },
    async getUserMessage() {
      const response = await axios.post("/allmessageget", {
        to: this.selectedUserId,
      });
      this.messageGetData = response?.data;
    },

    async getAllUserData() {
      const response = await axios.post("/getAllUser");
      this.data = response?.data?.data;
    },
    async search() {
      try {
        let requestBody = {};
        if (this.searchTerms) {
          requestBody.searchTerms = this.searchTerms;
          const response = await axios.post(
            `/getAllUserwithsearch`,
            requestBody
          );
          this.data = response.data.data;
        } else {
          this.getAllUserData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loginuser() {
      const response = await axios.get("/getloginuser");
      this.getloginuser = response?.data?.data[0]?.mobile;
      this.getloginuserid = response?.data?.data[0]?.userid;
    },
    selectUser(userId) {
      this.selectedUserId = userId;
      this.getUserMessage();
      this.isUserChatActive = true;
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    handleToggleList(newValue) {
      this.isShowList = newValue;
    },
    updateSearchTerms(value) {
      this.searchTerms = value;
      this.search();
    },
  },
  mounted() {
    this.socket = io("http://localhost:3004");

    this.sendMessage();
    this.getUserMessage();
    this.getAllUserData();
    this.loginuser();
  },
};
</script>

<style scoped>
@import "../assets/css/chat-user-sidemenu.css";
</style>
