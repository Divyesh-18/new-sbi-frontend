<template>
  <!-- <link rel="stylesheet" :href="'/css/login.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a class="goBack" v-on:click="router.go(-1)">
        <img :src="require('@/assets/images/left.png')" />
      </a>
      <div class="pageTitle">Login</div>
    </div>
  </div>

  <div id="appCapsule" class="register-page-scroll">
    <div class="appContent1-loging">
      <Form @submit="onSubmit" id="loginForm" class="card-body" autocomplete="off">
        <div class="login-image" style="text-align: center;">
          <img src="../../src//assets/images/shared image.jpeg" alt="" width="100px" style="margin-bottom: 20px">
        </div>
        <div class="inner-addon left-addon custom-left">
          <div class="number-img">
            <img v-show="img === 0 && true" :src="require('@/assets/images/mobile-img.png')" class="gray-phn" />
            <img v-show="img === 1 && true" :src="require('@/assets/images/mobile-img-pink.png')" style=""
              class="pink-phn" />
            <img v-show="img === 2 && true" :src="require('@/assets/images/mobile-img-red.png')" style="display: none"
              class="red-phn" />
          </div>
          <!-- <span class="pr-1" style="font-size: 16px;">+91</span> -->
          <Field name="loginMobile" :rules="validateLoginMobile" type="text" v-model="movalue" :value="movalue"
            id="login_mobile" class="form-control" placeholder=" Mobile Number" @focus="kkk()" @blur="ttt()" />
          <ErrorMessage name="loginMobile" class="col-md-12 text-danger small password-text" />
        </div>
        <div class="inner-addon">
          <div class="number-img">
            <img v-show="img1 === 0 && true" :src="require('@/assets/images/key-img.png')" class="gray-key" />
            <img v-show="img1 === 1 && true" :src="require('@/assets/images/key-img-pink.png')" style=""
              class="pink-key" />
            <img v-show="img1 === 2 && true" :src="require('@/assets/images/key-img-red.png')" style=""
              class="red-key" />
          </div>
          <Field name="loginPassword" :rules="validateLoginPassword" type="password" id="login_password"
            class="form-control" placeholder="Password" @focus="img1 = 1" @blur="ttt1(Password)"
            autocomplete="new-password" />
          <ErrorMessage name="loginPassword" class="col-md-12 text-danger small password-text" />
        </div>
        <!-- <div class="input-margin-bottom">
        </div> -->
        <input type="hidden" name="action" value="login" />
        <div>
          <div class="text-center" v-on:click="qpqp()">
            <button type="submit" class="btn btn-login ripple">Login</button>
          </div>
          <div class="text-center both-login-btn">
            <!-- <router-link to="/register"> -->

            <a class="btn btn-comman" v-on:click="redirectToRegister">Register</a>
            <!-- </router-link> -->
            <router-link to="/forgotpass">
              <a class="btn btn-comman" v-on:click="redirectToForgote">Forgot Password?</a>
            </router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <div id="toast">
    <div id="checkicon"></div>
  </div>

  <Footer />

  <div id="registertoast" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="text-center" id="regtoast"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <!-- loader -->
  <Loader :isShow="loader" />
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import Footer from "../components/CommonFooter.vue";
import Loader from "../components/UserLoader.vue";

export default {
  name: "UserLogin",
  components: {
    Form,
    Field,
    ErrorMessage,
    Footer,
    Loader,
  },
  setup() {
    // useMeta({ title: "Login Page" });
    const router = useRouter();
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const movalue = ref("");
    const img = ref(0);
    const img1 = ref(0);
    var formValidation = false;
    let loader = ref(false);

    if (localStorage.getItem("authToken")) {
      router.push({ path: "/win" });
    }
    const onSubmit = async (values) => {
      let normalizedMobile = values.loginMobile.trim();
      if (normalizedMobile.startsWith('+91')) {
        normalizedMobile = normalizedMobile.substring(3).trim();
      }

      await axios
        .post("/login", {
          mobile: normalizedMobile,
          password: values.loginPassword,
        })
        .then(async (response) => {
          if (response.data.success) {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
              localStorage.setItem("authToken", response.data.token);
              location.reload();
              // router.push({ path: "/win" });.total-user span
            }, 2000);
          } else {
            if (response.data.message === "Password error") {
              loader.value = true;
              setTimeout(function () {
                loader.value = false;
                setErrorMessage("Password error");
              }, 2000);
            } else {
              setErrorMessage("Password error");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const kkk = async () => {
      img.value = 1;
      if (movalue.value === "") {
        movalue.value = "+91";
      }
    };

    const ttt = async () => {
      const value1 = movalue.value;
      if (!value1) {
        img.value = 2;
        formValidation = false;
      } else {
        img.value = 0;
      }
    };

    const ttt1 = async (Password) => {
      if (!Password) {
        img1.value = 2;
        formValidation = false;
      } else {
        img1.value = 0;
      }
    };

    const validateLoginMobile = async (value) => {
      if (!value) {
        if (formValidation) {
          if (img.value == "2") {
            formValidation = false;
            setErrorMessage("Mobile number is required.");
            return "Mobile number is required";
          } else {
            return true;
          }
        } else {
          return "Mobile number is required";
        }
      }
      return true;
    };
    const validateLoginPassword = async (value) => {
      if (!value) {
        if (formValidation) {
          if (img1.value == "2") {
            formValidation = false;
            setErrorMessage("Password is required.");
            return "Password is required";
          } else {
            return true;
          }
        } else {
          return "Password is required";
        }
      }
      return true;
    };

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };

    const qpqp = async () => {
      formValidation = true;
    };

    const redirectToRegister = () => {
      window.location.href = '/#/register';
      window.location.reload();

    };

    const redirectToForgote = () => {
      window.location.href = '/#/forgotpass';
      window.location.reload();

    };


    return {
      router,
      onSubmit,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      validateLoginPassword,
      validateLoginMobile,
      movalue,
      ttt,
      ttt1,
      kkk,
      img,
      img1,
      qpqp,
      loader,
      redirectToRegister,
      redirectToForgote
    };
  },

};
</script>
<style scoped>
/* @import "../assets/css/login.css"; */
</style>
