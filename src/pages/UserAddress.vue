<template>
  <!-- <link rel="stylesheet" :href="'/css/address.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle">Address</div>
    </div>
    <div class="right">
      <div class="pluse-icons">
        <router-link to="/addaddress">
          <a>
            <img
              :src="require('../assets/images/plus.png')"
              style="height: 100%; max-height: 24px"
            />
          </a>
        </router-link>
      </div>
    </div>
  </div>

  <div class="address_list">
    <ul class="list_ul">
      <li v-for="item in addressList" :key="item.id">
        <ol class="left_icon">
          <img :src="require('../assets/images/address.png')" alt="" />
        </ol>
        <ol class="center">
          <p class="name">{{ item.full_name }}</p>
          <p class="info_text">{{ item.mobile }}</p>
          <p class="info_text">{{ item.pincode }}</p>
          <p class="info_text">{{ item.state }}</p>
          <p class="info_text">{{ item.city }}</p>
          <p class="info_text">{{ item.address }}</p>
        </ol>
        <ol class="right_icon">
          <img
            :src="require('../assets/images/information.png')"
            alt=""
            v-on:click="ttt(item._id, item.full_name)"
          />
        </ol>
      </li>
    </ul>
  </div>
  <div
    class="van-overlay"
    v-show="isEditModalVisible"
    style="z-index: 2001"
    v-on:click="(isEditModalVisible = false), hideModal()"
  ></div>
  <div
    id="pouiuii"
    class="modal1 bd-example-modal-lg edit-modal"
    :class="isEditModalVisible === false ? 'yyy' : ''"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
  >
    <div class="modal-dialog modal-lg" style="z-index: 2002 !important">
      <div class="modal-content">
        <div class="modal-body">
          <p class="popup_title">Select</p>
          <ul class="popup_ul">
            <!-- <li>
            <router-link :to="{
              full_name: 'addAddress',
              query: { goodsId: editid() },
            }" v-on:click="hideModal()">
              <a href="" id="edm">
                <img :src="'/images/pensil.png'" alt="" />
                <span>Edit</span>
              </a>
            </router-link>
          </li> -->
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
    <Modal
      v-model:visible="isLogoutModalVisible"
      :maskClosable="false"
      height="auto"
      width="70%"
      offsetTop="28%"
    >
      <div
        style="background: #fff; border-bottom: 0px !important"
        class="modal-header"
      >
        <h5
          class="modal-title"
          id="exampleModalLabel"
          style="color: #000; font-size: 25px"
        >
          Confirm
        </h5>
        <!-- <button type="button" class="close" v-on:click="isLogoutModalVisible = false" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body py-0">
        <div class="sign-info logout-info">
          <p style="color: #000">
            Do you want to delete this Address? {{ full_name }}
          </p>
        </div>
      </div>
      <div class="modal-footer" style="border-top: 0px !important">
        <a
          type="button"
          class="text-secondary"
          v-on:click="(isLogoutModalVisible = false), hideModal()"
        >
          CANCEL
        </a>
        <a type="button" class="text-danger h1" v-on:click="delete_row()"
          >Delete</a
        >
      </div>
    </Modal>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <Footer />
  <div class="loading" v-show="loader" style="/* display: none; */">
    <div
      class="v-dialog v-dialog--persistent"
      style="width: 300px; display: block"
    >
      <div class="v-card v-sheet theme--dark teal">
        <div class="v-card__text">
          <span>Loading</span>
          <div
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            class="v-progress-linear mb-0"
            style="height: 7px"
          >
            <div
              class="v-progress-linear__background white"
              style="height: 7px; opacity: 0.3; width: 100%"
            ></div>
            <div class="v-progress-linear__bar">
              <div
                class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active"
              >
                <div
                  class="v-progress-linear__bar__indeterminate long white"
                ></div>
                <div
                  class="v-progress-linear__bar__indeterminate short white"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a href="" type="button" class="text-info" data-dismiss="modal">OK</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/CommonFooter.vue";
import { Modal } from "usemodal-vue3";

export default {
  name: "UserAddress",
  components: {
    Footer,
    Modal,
  },
  //   props: {
  //     toggleLoader: { type: Function },
  //   },
  setup() {
    // useMeta({ title: "Address Page" });
    const addressList = ref([]);
    const router = useRouter();
    const id = ref("");
    const full_name = ref("");
    // const mobile = ref('');
    // const pincode = ref('');
    // const state = ref('');
    // const city = ref('');
    // const address = ref('');
    let isEditModalVisible = ref(false);
    let isLogoutModalVisible = ref(false);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    // setTimeout(() => (props.toggleLoader = toggleLoader), 2000);
    let loader = ref(true);

    setTimeout(() => {
      loader.value = false;
    }, 2000);

    const getAddress = () => {
      axios
        .get("/get-address", {})
        .then((response) => {
          if (response.data.success) {
            addressList.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const ttt = async (id1, full_name1) => {
      isEditModalVisible.value = !isEditModalVisible.value;
      if (isEditModalVisible.value) {
        showModal();
      } else {
        hideModal();
      }

      id.value = id1;
      full_name.value = full_name1;
    };
    const delete1 = async () => {
      isLogoutModalVisible.value = true;
      isEditModalVisible.value = false;
    };

    // const delete_row = async () => {
    //   isLogoutModalVisible.value = false;
    //   //   setErrorMessage('Address information cannot be deleted');
    //   hideModal();

    //   await axios
    //     .post("/delete-address", { _id: id.value })
    //     .then((response) => {
    //       if (response.data.success) {
    //         setErrorMessage(response.data.message);

    //         // addressList.value = response.data.data;
    //         getAddress();
    //       } else {
    //         alert(response.data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.data.error);
    //     });
    // };

    const delete_row = async () => {
      isLogoutModalVisible.value = false;
      hideModal();

      await axios
        .post("/delete-address", { _id: id.value })
        .then((response) => {
          if (response.data.success) {
            getAddress();
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const editid = () => {
      return id.value;
    };

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
      getAddress();
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
      addressList,
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
      loader,
      full_name,
    };
  },
};
</script>

<!-- <style scoped>

@import "../assets/css/bank-card.css";

</style> -->
