<template>
  <div class="chat-side-menu">
    <div class="sickey-header-add-app">
      <div class="heard d-flex">
        <div>
          <img
            class="userimagenae"
            :src="require('../../assets/images/chat-app-user-img.jpg')"
            alt="Image"
            style="max-width: 50px; max-height: 50px"
          />
        </div>
        <h6 class="username">{{ getloginuser }}</h6>
        <!-- <div class="notification-chat-app-head">
          <span class="notification-count-app">10</span>
          <i class="bi bi-bell-fill text-dark h6"></i>
        </div> -->

        <!-- <div class="add-chat-head-menu dropdown">
          <i class="bi bi-three-dots-vertical" v-on:click="userList()"></i>
          <div id="myDropdown" class="dropdown-content">
            <a href="#home">Back</a>
            <a href="#about">Profile</a>
          </div>
        </div> -->
        <div class="dropdown-chat-app" @click="toggleDropdown">
          <i class="bi bi-three-dots-vertical dropbtn bg-transparent"></i>
          <div v-if="showDropdown" class="dropdown-content">
            <a href="#mine">Back</a>
            <a v-on:click="showModel">Profile</a>
          </div>
        </div>
      </div>
      <nav class="add-bg-chat-app-head">
        <div class="search d-flex" role="search">
          <input
            class="border-add-chat-app"
            :value="searchTerms"
            @input="updateSearchTerms($event.target.value)"
            placeholder="Search..."
            type="search"
            id="input"
          />
        </div>
      </nav>
    </div>
    <!-- mobile-view -->
    <div class="add-scroll-app" v-if="screenWidth <= 760">
      <div v-for="(item, index) in datas" :key="index._id">
        <router-link
          :to="`/chat-app/${item?.userid}`"
          @click="handleClick(item.userid)"
        >
          <div
            @click="handleUserSelection(item.userid)"
            :class="{
              chatUsers: true,
              'd-flex': true,
              'bg-add-chat-app-sub-list-menu': item?.userid === selectedUserId,
            }"
          >
            <div>
              <img
                class="chatuserimage"
                :src="require('../../assets/images/chat-app-user-img.jpg')"
                alt="Banner Image"
                style="max-width: 50px; max-height: 50px"
              />
            </div>
            <div class="show-mobile-list-chat">
              <span class="user-name">{{ item?.mobile }}</span>
              <p class="user-message">
                {{
                  (lastmessage?.senderid === selectedUserId &&
                    lastmessage?.senderid === item?.userid) ||
                  (lastmessage?.senderid === item?.userid &&
                    lastmessage?.senderid === selectedUserId)
                    ? lastmessage?.message
                    : item?.lastMessage
                    ? item.lastMessage.slice(0, 20) +
                      (item.lastMessage.length > 15 ? "..." : "")
                    : ""
                }}
              </p>
            </div>
            <!-- <div class="chat-notification-container">
              <p class="chat-notification"><span> 1 </span></p>
            </div> -->
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="add-scroll-app">
      <div v-for="(item, index) in datas" :key="index._id">
        <router-link :to="`/chat-app/${item?.userid}`">
          <div
            @click="handleUserSelection(item.userid)"
            :class="{
              chatUsers: true,
              'd-flex': true,
              'bg-add-chat-app-sub-list-menu': item?.userid === selectedUserId,
            }"
          >
            <div>
              <img
                class="chatuserimage"
                :src="require('../../assets/images/chat-app-user-img.jpg')"
                alt="Banner Image"
                style="max-width: 50px; max-height: 50px"
              />
            </div>
            <div class="show-mobile-list-chat">
              <span class="user-name">{{ item?.mobile }}</span>
              <p class="user-message">
                {{
                  (lastmessage?.senderid === selectedUserId &&
                    lastmessage?.senderid === item?.userid) ||
                  (lastmessage?.senderid === item?.userid &&
                    lastmessage?.senderid === selectedUserId)
                    ? lastmessage?.message
                    : item?.lastMessage
                    ? item.lastMessage.slice(0, 20) +
                      (item.lastMessage.length > 15 ? "..." : "")
                    : ""
                }}
              </p>
            </div>
            <!-- <div class="chat-notification-container">
              <p class="chat-notification"><span> 1 </span></p>
            </div> -->
          </div>
        </router-link>
      </div>
    </div>
    <div class="notification-modal-user">
      <Modal
        v-model:visible="isNoticeModalDelete"
        height="auto"
        width="auto"
        :maskClosable="false"
        offsetTop="25%"
      >
        <div class="modal-body-user">
          <h4 class="text-center border-bottom border-dark">User Profile</h4>
          <div class="header1">
            <div class="d-flex display-model-chat-app">
              <div class="image-user-model">
                <img
                  class="user-image"
                  :src="require('../../assets/images/chat-app-user-img.jpg')"
                  alt="User Image"
                />
              </div>
              <div class="user-info-model">
                <p>
                  <span class="font-weight-bold">Mobile:</span>
                  {{ getloginuser }}
                </p>
                <p>
                  <span class="font-weight-bold">Email:</span>
                  {{ getloginuseremail }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer-user">
          <button
            type="button"
            class="btn btn-comman active"
            data-dismiss="modal"
            @click="hideModal"
          >
            Ok
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { Modal } from "usemodal-vue3";
export default {
  name: "sideBarComponent",
  components: {
    Modal,
  },
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
    getloginuser: {
      type: String,
      default: "",
    },
    isShowList: {
      type: Boolean,
      default: true,
    },
    selectedUserId: {
      type: String,
    },
    searchTerms: {
      type: String,
      default: "",
    },
    lastmessage: {
      type: String,
    },
    getloginuseremail: {
      type: String,
    },
  },
  data() {
    return {
      screenWidth: window.innerWidth,
      showDropdown: false,
      isNoticeModalDelete: false,
    };
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    showModel(_id) {
      this.deleteItemId = _id;
      this.isNoticeModalDelete = true;
      document.body.classList.add("modal-open");
    },
    hideModal() {
      this.isNoticeModalDelete = false;
      document.body.classList.remove("modal-open");
    },
    handleUserSelection(userId) {
      this.$emit("select-user", userId);
    },
    handleClick(userId) {
      this.toggleList();
      this.$emit("select-user", userId);
      // this.searchTerms = "";
    },
    toggleList() {
      this.$emit("toggle-list", !this.isShowList);
    },
    updateSearchTerms(value) {
      this.$emit("update-search-terms", value);
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/chat-user-sidemenu.css";

.modal-footer-user {
  text-align: end;
}

.dropbtn {
  color: #fff9e6;
  padding: 0px 6px 7px 3px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-chat-app {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  background: linear-gradient(271deg, #1d2555, #141939, #1d2555);
  color: white;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #fff;
  color: #182053;
}

.info-container {
  display: flex;
  gap: 10px;
}

.info-container p {
  margin: 0;
}

.image-user-model {
  padding: 15px 0 0 0;
  text-align: center;
}

.user-info-model {
  padding: 0px 10px;
}

.modal-body-user {
  padding: 20px;
}

.user-image {
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
}
</style>
