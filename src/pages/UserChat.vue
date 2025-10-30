<template>
  <div class="main-chat-parent">
    <div class="main-chat-parent" :class="{ 'flex-layout': screenWidth >= 760 }">
      <div v-if="isShowList === true && screenWidth >= 760" v-on:click="searchTerms = ''">
        <SideBarComponent :datas="data" :selectedUserId="selectedUserId" @select-user="selectUser"
          :getloginuser="getloginuser" :isSidebarVisible="!isUserChatActive" :search-terms="searchTerms"
          @update-search-terms="updateSearchTerms" :lastmessage="lastmessage" :getloginuseremail="getloginuseremail">
        </SideBarComponent>
      </div>
      <div v-on:click="(searchTerms = ''), isShowList === false" v-if="isShowList === false && screenWidth <= 760">
        <side-bar-component :datas="data" :selectedUserId="selectedUserId" :getloginuser="getloginuser"
          @select-user="selectUser" :is-show-list="isShowList" @toggle-list="handleToggleList"
          :search-terms="searchTerms" @update-search-terms="updateSearchTerms" :lastmessage="lastmessage"
          :getloginuseremail="getloginuseremail"></side-bar-component>
      </div>
      <div v-if="isShowList === true && screenWidth >= 760" class="add-coustom-chat-app-width">
        <div class="typing-page" :class="{ 'typing-page-expanded': screenWidth >= 760 }">
          <div class="type-header d-flex">
            <div>
              <img class="type-user-image" :src="require('../assets/images/chat-app-user-img.jpg')" alt="Image"
                style="max-width: 100px; max-height: 50px" />
            </div>
            <div class="type-user-name-main">
              <span class="type-user-name">{{ fineUserFromUrl }}</span>
              <!-- <h6 class="type-user-name">{{ fineUserFromUrl }}</h6> -->
              <div v-if="isTyping && selectedUserId !== getloginuserid" class="typing-indicator">
                Typing...
              </div>
              <div v-else class="typing-indicator-else"></div>
            </div>
            <div class="d-flex add-message-page-icon">
              <div class=""><i class="bi bi-telephone"></i></div>
              <div class=""><i class="bi bi-camera-video"></i></div>
              <div class=""><i class="bi bi-three-dots-vertical"></i></div>
            </div>
          </div>
          <div class="chat-msg-page" ref="colorList" @scroll="handleScroll()">
            <div class="today-message-page">
              <span>Today</span>
              <div class="mt-1">
                <label>
                  <i class="bi bi-lock"></i>
                  Message and calls are and to and encrypted. No one outside of
                  this chat, not even chat-app, can read to them Tap to learn
                  more
                </label>
              </div>
            </div>
            <div class="chat-msg-sub-page" @click="showEmojiPicker = false">
              <i v-show="scrollbottom" class="bi bi-chevron-down chevron-down"
                @click="scrollToBottom(), MessageUpdate()"></i>
              <div class="inbox-message-page">
                <div v-for="(item, index) in messageGetData" :key="index">
                  <div :class="[
      item.fromSelf ? 'outgoing-chats' : 'received-chats',
    ]">
                    <div :class="[item.fromSelf ? 'outgoing-msg' : 'received-msg']">
                      <div :class="[
      item.fromSelf
        ? 'outgoing-chats-msg'
        : 'received-msg-inbox',
    ]">
                        <p>
                          {{ item?.message }}
                          <span v-if="item.sender === getloginuserid" class="message-seen-unseen">
                            <span v-if="item?.status === 0">
                              <i class="bi bi-check2 add-fontSize-app-chat"></i>
                            </span>
                            <span v-if="item?.status === 1" style="color: #fff9e6">
                              <i class="bi bi-check2-all add-fontSize-app-chat"></i>
                            </span>
                          </span>
                        </p>
                        <span :class="[item.fromSelf ? 'time' : 'received-time']">{{ formatTime(item.created_at)
                          }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <EmojiPicker v-if="showEmojiPicker" :native="true" @select="addEmoji" class="emoji-peacker"
                  theme="dark" />
              </div>
            </div>
          </div>
          <div class="container-from">
            <form @submit.prevent="sendMessage(), sendMessageUsingSocket()">
              <div class="input-box d-flex">
                <label class="file-send" @click="toggleEmojiPicker()">
                  <i class="bi bi-emoji-smile pr-1"></i>
                </label>
                <input type="text" class="form-control-add" v-model="message" placeholder="Type your message..."
                  @input="startTyping" @blur="stopTyping" v-on:focus="scrollToBottom(), MessageUpdate()" />
                <input type="file" id="fileInput" style="display: none" />
                <label for="fileInput" class="file-send">
                  <i class="bi bi-folder p-1"></i>
                </label>

                <div class="message-button-main-app" v-on:click="
      scrollToBottom11111(),
      sendMessage(),
      sendMessageUsingSocket()
      ">
                  <img class="message-button" :src="require('../assets/images/send-chat-message-app.png')" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- -------------- -->

      <div v-if="isShowList === true && screenWidth <= 760" class="add-coustom-chat-app-width">
        <div class="typing-page remove-margin-in-chat-app" :class="{ 'typing-page-expanded': screenWidth >= 760 }">
          <div class="type-header d-flex">
            <i class="bi bi-arrow-left p-1 h3 left-arrow-app-chat-app mt-1" v-on:click="isShowList = false"></i>
            <div>
              <img class="type-user-image" :src="require('../assets/images/chat-app-user-img.jpg')" alt="Image"
                style="max-width: 50px; max-height: 50px" />
            </div>
            <div class="type-user-name-main">
              <h6 class="type-user-name">{{ fineUserFromUrl }}</h6>
              <div v-if="isTyping && selectedUserId !== getloginuserid" class="typing-indicator">
                Typing...
              </div>
              <div v-else class="typing-indicator-else"></div>
            </div>
            <div class="d-flex add-message-page-icon">
              <div class=""><i class="bi bi-telephone"></i></div>
              <div class=""><i class="bi bi-camera-video"></i></div>
              <div class=""><i class="bi bi-three-dots-vertical"></i></div>
            </div>
          </div>
          <div class="chat-msg-page" ref="colorList" @scroll="handleScroll()">
            <div class="today-message-page">
              <span>Today</span>
              <div class="mt-1">
                <label>
                  <i class="bi bi-lock"></i>
                  Message and calls are and to and encrypted. No one outside of
                  this chat, not even chat-app, can read to them Tap to learn
                  more
                </label>
              </div>
            </div>
            <div class="chat-msg-sub-page">
              <i class="bi bi-chevron-down chevron-down" @click="scrollToBottom(), MessageUpdate()"></i>
              <div class="inbox-message-page">
                <div v-for="(item, index) in messageGetData" :key="index">
                  <div :class="[
      item.fromSelf ? 'outgoing-chats' : 'received-chats',
    ]">
                    <div :class="[item.fromSelf ? 'outgoing-msg' : 'received-msg']">
                      <div :class="[
      item.fromSelf
        ? 'outgoing-chats-msg'
        : 'received-msg-inbox',
    ]">
                        <p>
                          {{ item?.message }}
                          <span v-if="item.sender === getloginuserid" class="message-seen-unseen">
                            <span v-if="item?.status === 0">
                              <i class="bi bi-check2 add-fontSize-app-chat"></i>
                            </span>
                            <span v-if="item?.status === 1" style="color: #fff9e6">
                              <i class="bi bi-check2-all add-fontSize-app-chat"></i>
                            </span>
                          </span>
                        </p>
                        <span class="time">{{
      formatTime(item.created_at)
    }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-from">
            <form @submit.prevent="sendMessage(), sendMessageUsingSocket()">
              <div class="input-box d-flex">
                <label class="file-send">
                  <i class="bi bi-emoji-smile pr-1"></i>
                </label>
                <input type="text" class="form-control-add" v-model="message" placeholder="Type your message..."
                  @input="startTyping" @blur="stopTyping" v-on:focus="scrollToBottom(), MessageUpdate()" />
                <input type="file" id="fileInput" style="display: none" />
                <label for="fileInput" class="file-send">
                  <i class="bi bi-folder-fill p-1"></i>
                </label>

                <div class="message-button-main-app" v-on:click="
      scrollToBottom11111(),
      sendMessage(),
      sendMessageUsingSocket()
      ">
                  <img class="message-button" :src="require('../assets/images/send-chat-message-app.png')" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import SideBarComponent from "./chatAppComponent/chatAppSideBarComponent.vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
export default {
  name: "UserChat",
  components: {
    SideBarComponent,
    EmojiPicker,
  },

  data() {
    return {
      message: "",
      selectedUserId: null,
      messageGetData: [],
      fineUserFromUrl: "",
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
      messageUpdate: false,
      currentPage: 1,
      totalPages: 0,
      pageSize: 1000,
      lastmessage: "",
      currentmessage: "",
      getloginuseremail: "",
      showEmojiPicker: false,
      firstUser: "",
      scrollbottom: true,
    }
  },
  computed: {
    isSidebarExpanded() {
      return this.screenWidth >= 760;
    },
  },
  created() {
    this.selectedUserId = this.$route.params.userid;
    this.socket = io("http://localhost:3004");

    this.socket.on("msg-received", (message) => {
      let receiverUserid = message.senderid;
      let senderUserid = message.sender;
      if (
        receiverUserid === this.getloginuserid &&
        senderUserid === this.selectedUserId
      ) {
        const fromSelf = message.sender === this.getloginuserid;
        this.messageGetData?.push({ ...message, fromSelf });
        this.currentmessage =
          this.messageGetData[this.messageGetData.length - 1];
      }
      if (
        receiverUserid === this.selectedUserId &&
        senderUserid === this.getloginuserid
      ) {
        const fromSelf = message.sender === this.getloginuserid;
        this.messageGetData?.push({ ...message, fromSelf });
        this.currentmessage =
          this.messageGetData[this.messageGetData.length - 1];
      }
    });
    this.socket.on("msg-last", (message) => {
      let receiverUserid = message.senderid;
      let senderUserid = message.sender;
      if (
        receiverUserid === this.getloginuserid &&
        senderUserid === this.selectedUserId
      ) {
        this.lastmessage = message;
      }
      if (
        receiverUserid === this.selectedUserId &&
        senderUserid === this.getloginuserid
      ) {
        this.lastmessage = message;
      }
    });
    this.socket.on("typing", (userId, userLogin) => {
      let receiverUserid = userLogin;
      let senderUserid = userId;
      if (
        receiverUserid === this.getloginuserid &&
        senderUserid === this.selectedUserId
      ) {
        this.isTyping = userId === this.selectedUserId;
      }
      if (
        receiverUserid === this.selectedUserId &&
        senderUserid === this.getloginuserid
      ) {
        this.isTyping = userId === this.selectedUserId;
      }

      this.typingTimeout = setTimeout(() => {
        this.stopTyping();
      }, 1000);
    });
    this.socket.on("messageupdate", (userId, userLogin) => {
      if (userId === this.selectedUserId) {
        if (this.lastmessage.status === 0) {
          let receiverUserid = userLogin;
          let senderUserid = userId;
          if (
            receiverUserid === this.getloginuserid &&
            senderUserid === this.selectedUserId
          ) {
            this.getUserMessage();
          }
        }
      }
    });
    this.socket.on("SideMenuuserList", (userId, userLogin) => {
      let receiverUserid = userLogin;
      let senderUserid = userId;
      if (
        receiverUserid === this.getloginuserid &&
        senderUserid === this.selectedUserId
      ) {
        this.getAllUserData();
      }
      if (
        receiverUserid === this.selectedUserId &&
        senderUserid === this.getloginuserid
      ) {
        this.getAllUserData();
      }
    });
    window.addEventListener("resize", this.updateScreenWidth);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  watch: {
    messageGetData() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  methods: {
    handleScroll() {
      const list = this.$refs.colorList;
      const scrollTop = list.scrollTop;
      const scrollHeight = list.scrollHeight;
      const clientHeight = list.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.scrollbottom = false;
      } else if (scrollTop <= 0) {
        this.scrollbottom = true;
      } else {
        this.scrollbottom = true;
      }
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
      console.log("this.showEmojiPicker", this.showEmojiPicker);
    },
    addEmoji(emoji) {
      this.message += emoji.i;
      console.log("emoji", emoji);
    },
    scrollToBottom() {
      const inboxMessagePage = document.querySelector(".inbox-message-page");
      if (inboxMessagePage && inboxMessagePage.lastElementChild) {
        const lastMessage = inboxMessagePage.lastElementChild;
        lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
        this.scrollbottom = false;
      } else {
        console.error(
          "Cannot find '.inbox-message-page' element or it has no children."
        );
      }
    },
    scrollToBottom11111() {
      const inboxMessagePage = document.querySelector(".inbox-message-page");
      if (inboxMessagePage && inboxMessagePage.lastElementChild) {
        const lastMessage = inboxMessagePage.lastElementChild;
        lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
      } else {
        console.error(
          "Cannot find '.inbox-message-page' element or it has no children."
        );
      }
    },
    startTyping() {
      if (!this.isTyping) {
        this.typingTimeout = setTimeout(() => {
          this.stopTyping();
        }, 3000);
        this.socket.emit("typing", this.getloginuserid, this.selectedUserId);
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
      // const formattedDate = date.toLocaleDateString();
      //
      return `${time}`;
    },
    async sendMessageUsingSocket() {
      const newMessage = {
        message: this.message,
        from: this.getloginuserid,
        senderid: this.selectedUserId,
        sender: this.getloginuserid,
        status: 0,
        created_at: new Date(),
      };
      if (newMessage.sender === this.getloginuserid) {
        if (this.message) {
          this.socket.emit("send-msg", {
            senderUserid: this.getloginuserid,
            receiverUserid: this.selectedUserId,
            message: newMessage,
          });
        }
      }
      this.message = "";
      this.scrollToBottom();
    },
    async sendMessage() {
      if (this.message) {
        await axios.post("/addmessage", {
          message: this.message,
          senderid: this.selectedUserId,
        });
        this.message = "";
        if (this.firstUser.userid !== this.selectedUserId) {
          this.socket.emit(
            "SideMenuuserList",
            this.getloginuserid,
            this.selectedUserId
          );
        }
      }
    },
    async getUserMessage() {
      const response = await axios.post("/allmessageget", {
        to: this.selectedUserId,
        page: this.currentPage,
        pageSize: this.pageSize,
      });
      this.messageGetData = response?.data.data;
      this.totalPages = response.data.totalPages;
      this.currentPage = response.data.currentPage;
      this.currentmessage = this.messageGetData[this.messageGetData.length - 1];
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUserMessage();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getUserMessage();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getUserMessage();
    },
    async getOpenChatUserData() {
      try {
        const response = await axios.get("/fine-fser-fromUrl", {
          params: { userid: this.selectedUserId },
        });
        this.fineUserFromUrl = response?.data?.data?.mobile;
      } catch (error) {
        console.error("Error fetching open chat user data:", error);
        throw error;
      }
    },
    async getAllUserData() {
      const response = await axios.post("/getAllUser");
      this.data = response?.data?.data;
      this.firstUser = this.data[0];
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
      this.getloginuseremail = response?.data?.data[0]?.email;
    },
    selectUser(userId) {
      this.selectedUserId = userId;
      this.getUserMessage();
      // this.scrollToBottom();
      // this.MessageUpdate();
      // this.getAllUserData();
      this.getOpenChatUserData();
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
    async MessageUpdate() {
      try {
        if (
          this.currentmessage.status === 0 &&
          this.currentmessage.fromSelf === false
        ) {
          await axios.post("/MessageSeenAndUnseen", {
            senderId: this.selectedUserId,
          });
          this.socket.emit(
            "messageupdate",
            this.getloginuserid,
            this.selectedUserId
          );
          this.getUserMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.socket = io("http://localhost:3004");
    this.sendMessage();
    this.getUserMessage();
    this.getOpenChatUserData();
    this.getAllUserData();
    this.loginuser();
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
};
</script>

<style scoped>
@import "../assets/css/chat-user-sidemenu.css";
</style>
