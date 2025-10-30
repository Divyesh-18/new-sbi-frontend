<template>
  <!-- <link rel="stylesheet" :href="'/css/bank-card.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/common-modal.css'" /> -->


  <!-- App Header -->
  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="" />
      </a>
      <div class="pageTitle">Bank Card</div>
    </div>
    <div class="right">
      <div class="pluse-icons">
        <router-link to="/addbankcard">
          <a>
            <img :src="require('../assets/images/plus.png')" style="height: 100%; max-height: 24px" />
          </a>
        </router-link>
      </div>
    </div>
  </div>

  <div class="address_list">
    <ul class="list_ul">
      <li v-for="(item, index) in bankList" :key="index">
        <ol class="left_icon">
          <img :src="require('../assets/images/folder.png')" alt="" />
        </ol>
        <ol class="center">
          <p class="name">{{ item.name }}</p>
          <p class="info_text">{{ item.account }}</p>
        </ol>
        <ol class="right_icon">
          <img :src="require('../assets/images/information.png')" alt=""
            v-on:click="ttt(item.id, item.name, item.account)" />
        </ol>
      </li>
    </ul>
  </div>

  <!-- editicon-modal -->
  <div class="van-overlay" v-show="isEditModalVisible" style="z-index: 2001;"
    v-on:click="isEditModalVisible = false, hideModal()"></div>
  <div id="pouiuii" class="modal1 bd-example-modal-lg edit-modal" :class="(isEditModalVisible === false) ? 'yyy' : ''"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" style="z-index: 2002!important;">
      <div class="modal-content">
        <div class="modal-body">
          <p class="popup_title">Select</p>
          <ul class="popup_ul">
            <li>
              <router-link :to="{
                name: 'editBankDetail',
                query: { goodsId: editid() },
              }" v-on:click="hideModal()">
                <a href="" id="edm">
                  <img :src="require('../assets/images/pensil.png')" alt="" />
                  <span>Edit</span>
                </a>
              </router-link>
            </li>
            <li>
              <a id="dellink" v-on:click="delete1()">
                <img :src="require('../assets/images/delt.png')" alt="" />
                <span>Delete</span>
                <input type="hidden" value="" id="oo" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete POPUP -->
  <div class="confirm-passwrd">
    <Modal v-model:visible="isLogoutModalVisible" :maskClosable="false" height="auto" width="70%" offsetTop="28%">
      <div style="background: #fff; border-bottom: 0px !important;" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
          Confirm
        </h5>
        <!-- <button type="button" class="close" v-on:click="isLogoutModalVisible = false" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> -->
      </div>
      <div class="modal-body py-0">
        <div class="sign-info logout-info">
          <p style="color: #000">Do you want to delete this bank card? {{ name }} {{ account }}</p>
        </div>
      </div>
      <div class="modal-footer" style=" border-top: 0px !important;">
        <a type="button" class="text-secondary" v-on:click="isLogoutModalVisible = false, hideModal()">
          CANCEL
        </a>
        <a type="button" class="text-danger h1" v-on:click="delete_row(), hideModal()">Delete</a>
      </div>
    </Modal>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <Footer />

  <!-- loader -->
  <div class="loading" v-show="loader" style="/* display: none; */">
    <div class="v-dialog v-dialog--persistent" style="width: 300px; display: block;">
      <div class="v-card v-sheet theme--dark teal">
        <div class="v-card__text"><span>Loading</span>
          <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="v-progress-linear mb-0"
            style="height: 7px;">
            <div class="v-progress-linear__background white" style="height: 7px; opacity: 0.3; width: 100%;"></div>
            <div class="v-progress-linear__bar">
              <div class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                <div class="v-progress-linear__bar__indeterminate long white"></div>
                <div class="v-progress-linear__bar__indeterminate short white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PageReload />
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/CommonFooter.vue";
import { Modal } from "usemodal-vue3";
import PageReload from "../components/PageReload.vue";


export default {
  components: {
    Footer,
    Modal,
    PageReload,
  },
  setup() {
    // useMeta({ title: "Bank Card Page" });
    const bankList = ref([]);
    const router = useRouter();
    const id = ref('');
    const name = ref('');
    const account = ref('');
    let isEditModalVisible = ref(false);
    let isLogoutModalVisible = ref(false);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    let loader = ref(true);

    setTimeout(() => {
      loader.value = false;
    }, 2000);

    const getbank = () => {
      axios
        .get("/get-bank-detail", {})
        .then((response) => {
          if (response.data.success) {
            bankList.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    }
    const ttt = async (id1, name1, account1) => {
      isEditModalVisible.value = !isEditModalVisible.value;
      if (isEditModalVisible.value) {
        showModal();
      } else {
        hideModal();
      }

      id.value = id1;
      name.value = name1;
      account.value = account1;
    }
    const delete1 = async () => {
      isLogoutModalVisible.value = true;
      isEditModalVisible.value = false;

    }

    const delete_row = async () => {
      isLogoutModalVisible.value = false;
      axios.delete("/delete-bank-detail", {
      })
        .then((response) => {
          if (response.data.success) {
            getbank();
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // setErrorMessage('Bank card information cannot be deleted');
    }
    const editid = () => {
      return id.value;
    }

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getbank();
    }

    const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };

    return {
      showModal,
      hideModal,
      bankList,
      router,
      isEditModalVisible,
      ttt,
      delete_row,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      editid,
      isLogoutModalVisible,
      delete1,
      account,
      loader,
      name
    };
  },
};
</script>
<!-- <style scoped>
@import "../assets/css/bank-card.css";


</style> -->
