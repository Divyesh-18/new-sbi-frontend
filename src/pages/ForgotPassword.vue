<template>
  <!-- <link rel="stylesheet" :href="'/css/forgot-password.css'" /> -->

  <!-- App Header -->
  <div class="appHeader1">
    <div class="left">
      <router-link to="/login">
        <a class="icon goBack" v-on:click="reloadPage">
          <img :src="require('../assets/images/left.png')" alt="" />
        </a>
      </router-link>
      <div class="pageTitle">Reset Password</div>
    </div>
  </div>

  <!-- App Capsule -->
  <div id="appCapsule" class="pb-2 register-page-scroll" style="padding: 24px">
    <div class="appContent1-addbankcard pb-0">
      <Form @submit="onSubmit" action="" id="forgotform" type="post">
        <div class="login-image" style="text-align: center;">
          <img src="../../src//assets/images/shared image.jpeg" alt="" width="100px"
            style="margin-bottom: 20px">
        </div>
        <div class="row">
          <div class="col-12">
            <div class="inner-addon left-addon">
              <div class="number-img">
                <img :src="require('../assets/images/mobile-img.png')" v-show="mobileimg === 0 && true"
                  class="gray-phn" />
                <img :src="require('../assets/images/mobile-img-pink.png')" v-show="mobileimg === 1 && true" style=""
                  class="pink-phn" />
                <img :src="require('../assets/images/mobile-img-red.png')" v-show="mobileimg === 2 && true" style=""
                  class="red-phn" />
              </div>
              <!-- <div class="form-group m-1"> -->
              <div class="form-group">
                <!-- <select
                  ref="selectElement"
                  class="form-control m-1 add-select-2-coustom-style"
                  @change="updateRegMobile"
                  v-model="selectedRegMobile"
                  id="selectedRegMobile"
                >
                  <option
                    :value="option.country_code"
                    v-for="(option, index) in regMobileOptions1"
                    :key="index"
                  >
                    {{ option.country_code }}
                  </option>
                </select> -->
                <!-- <span class="form-control m-1 add-select-2-coustom-style">+91</span> -->
                <Field type="hidden" v-model="selectedRegMobileCode" name="selectedRegMobile" id="selectedRegMobile"
                  class="form-control" placeholder="Mobile Number" />
              </div>
              <Field type="text" v-model="regMobile" :rules="validateRegMobile" name="regMobile" id="mobile"
                onKeyPress="" class="form-control" placeholder="Mobile Number" @focus="mobileimgfun(regMobile);"
                @blur="mobileimgfun(regMobile)" />
              <br />
              <ErrorMessage name="regMobile" class="regMobile small" />
            </div>
          </div>
          <!-- <div class="col-12">
            <div class="inner-addon left-addon">
              <div class="number-img">
                <img
                  :src="require('../assets/images/email.png')"
                  v-show="emailimg === 0 && true"
                  class="gray-phn"
                />
                <img
                  :src="require('../assets/images/email-pink.png')"
                  v-show="emailimg === 1 && true"
                  style=""
                  class="pink-phn"
                />
                <img
                  :src="require('../assets/images/email-red.png')"
                  v-show="emailimg === 2 && true"
                  style=""
                  class="red-phn"
                />
              </div>

              <Field
                type="email"
                v-model="regEmail"
                :rules="validateEmail"
                name="regEmail"
                id="email"
                class="form-control"
                placeholder="Enter Email"
                @focus="emailimg = 1"
                @blur="emailimgfun(regEmail)"
              />
               <span>{{ regMobileError }}</span> 
            </div>
            <ErrorMessage
              name="regEmail"
              class="col-md-12 text-danger small verification-text"
            />
          </div> -->
        </div>
        <div class="special_box">
          <div style="width: 70%; position: relative">
            <div class="inner-addon left-addon right-margin">
              <div class="number-img">
                <img :src="require('../assets/images/verifiy.png')" class="gray-verify"
                  v-show="codeimg === 0 && true" />
                <img :src="require('../assets/images/verifiy-pink.png')" class="pink-verify" style=""
                  v-show="codeimg === 1 && true" />
                <img :src="require('../assets/images/verifiy-red.png')" class="red-verify" style=""
                  v-show="codeimg === 2 && true" />
              </div>
              <Field type="text" :rules="validateRegOtp" name="regOtp" id="cd" class="form-control"
                placeholder="Verification Code" maxlength="10" @focus="codeimg = 1" @blur="codeimgfun(regOtp)" />
            </div>
            <ErrorMessage name="regOtp" class="regMobile small" style="top: 3.5rem" />
          </div>

          <div style="width: 26%">
            <!-- <a
                          v-show="!Disabledbutton"
                          v-on:click="sendOtp"
                          class="btn-otp"
                          :class="Disabled"
                          id="reg_otp"
                          style="cursor: pointer"
                          >OTP</a
                      > -->
            <a v-show="!Disabledbutton" v-on:click="
              selectedRegMobile === '+91' ? sendOtp() : sendOtpEmail(),
              (Disabled = 'Disabled')
              " class="btn-otp" :class="Disabled" id="reg_otp" style="/*cursor: pointer;*/">OTP</a>
            <a v-show="Disabledbutton" class="btn-otp" :class="Disabled" id="reg_otp"
              style="cursor: pointer; font-size: 15px">WAIT{{ countDown }}S</a>
          </div>
        </div>
        <input type="hidden" name="email" id="email" class="form-control" value="857913581@gmail.com"
          placeholder="Email-id" />
        <div class="inner-addon left-addon">
          <div class="number-img">
            <img :src="require('../assets/images/key-img.png')" v-show="passwordimg === 0 && true" class="gray-key" />
            <img :src="require('../assets/images/key-img-pink.png')" v-show="passwordimg === 1 && true"
              class="pink-key" />
            <img :src="require('../assets/images/key-img-red.png')" v-show="passwordimg === 2 && true"
              class="red-key" />
          </div>
          <Field type="password" :rules="validateRegPassword" v-model="regPassword" name="regPassword" id="password"
            class="form-control" placeholder="New Password" @focus="passwordimg = 1"
            @blur="passwordimgfun(regPassword)" />
          <br />
          <ErrorMessage name="regPassword" class="regMobile small" />
        </div>
        <div class="text-center mt-3" v-on:click="qpqp()">
          <button type="submit" class="btn-continue" style="margin-top: 20px;">
            <!-- class="btn btn-continue ripple"> -->
            Continue
          </button>
        </div>
      </Form>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="
        top: 50% !important;
        font-size: 14px;
        min-width: 120px;
        padding: 7px 12px;
        text-align: center;
        margin: 0 auto;
        position: fixed;
      ">
      {{ errorMessage }}
    </div>
  </div>
  <Footer />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";
import $ from "jquery"; // Import jQuery
import "select2/dist/css/select2.min.css";
import "select2";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Footer,
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Forgot Password Page" });
    var formValidation = false;
    const router = useRouter();
    const regMobile = ref("");
    const regEmail = ref("");
    const regMobileError = ref("");
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const Disabled = ref("");
    const Disabledbutton = ref(false);
    const countDown = ref(0);
    const mobileimg = ref(0);
    const codeimg = ref(0);
    const passwordimg = ref(0);
    const emailimg = ref(0);
    let regMobileOptions1 = ref([]);
    const selectedRegMobile = ref("+91");
    const selectElement = ref(null);

    onMounted(() => {
      $(selectElement.value).select2();

      $(selectElement.value).on("change", (event) => {
        selectedRegMobile.value = event.target.value;
      });
    });
    onMounted(() => {
      $(selectElement.value).select2();
    });

    console.log($("#selectedRegMobile").val() + "testst");

    const codeimgfun = async (value) => {
      if (!value) {
        codeimg.value = 2;
        formValidation = false;
      } else {
        codeimg.value = 0;
      }
    };
    const emailimgfun = async (value) => {
      if (!value) {
        emailimg.value = 2;
        formValidation = false;
      } else {
        emailimg.value = 0;
      }
    };

    const passwordimgfun = async (value) => {
      if (!value) {
        passwordimg.value = 2;
        formValidation = false;
      } else {
        passwordimg.value = 0;
      }
    };

    const mobileimgfun = async (value) => {
      if (!value) {
        regMobile.value = "+91";
        mobileimg.value = 0;
        formValidation = false;
      } else {
        mobileimg.value = 0;
      }
    };
    const selectedRegMobileCode = async (value) => {
      if (!value) {
        if (formValidation) {
          if (selectedRegMobile.value == "2") {
            formValidation = false;
            setErrorMessage("Contry Code is required.");
            return "Contry Code is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Contry Code is required";
        }
      }
      return true;
    };
    // const validateEmail = async (value) => {
    //   if (!value) {
    //     if (formValidation) {
    //       if (emailimg.value == "2") {
    //         formValidation = false;
    //         setErrorMessage("Email is required.");
    //         return "Email is required";
    //       } else {
    //         return true;
    //       }
    //     } else {
    //       formValidation = false;
    //       return "Email is required";
    //     }
    //   }
    //   return true;
    // };
    const validateRegPassword = async (value) => {
      if (!value) {
        if (formValidation) {
          if (passwordimg.value == "2") {
            formValidation = false;
            setErrorMessage("New password is required.");
            return "New password is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "New password is required";
        }
      }
      return true;
    };

    const validateRegOtp = async (value) => {
      if (!value) {
        if (formValidation) {
          if (codeimg.value == "2") {
            formValidation = false;
            setErrorMessage("Verification code is required.");
            return "Verification code is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Verification code is required";
        }
      }
      return true;
    };

    const validateRegMobile = async (value) => {
      if (!value) {
        if (formValidation) {
          if (mobileimg.value == "2") {
            formValidation = false;
            setErrorMessage("Mobile number is required.");
            return "Mobile number is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Mobile number is required";
        }
      }
      return true;
    };

    const fetchCountryCode = () => {
      axios
        .get("/get-country-code")
        .then((response) => {
          regMobileOptions1.value = response.data.data;
          onMounted(() => {
            $("#selectedRegMobile").select2();
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCountryCode();

    const updateRegMobile = (event) => {
      selectedRegMobile.value = event.target.value;
    };

    const qpqp = async () => {
      formValidation = true;
    };
    const sendOtpEmail = async () => {
      regMobileError.value = "";
      axios
        .post("/send-otp-email", {
          mobile_number: regMobile.value,
          email: regEmail.value,
        })
        .then((response) => {
          // setErrorMessage(response.data.message);
          if (response.data.success) {
            setErrorMessage(response.data.message);
            Disabled.value = "Disabled";
            countDown.value = 179;
            setInterval(function () {
              countDownTimer();
            }, 1000);
            Disabledbutton.value = true;
          } else {
            Disabled.value = "";
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const sendOtp = async () => {
      regMobileError.value = "";
      let normalizedMobile = regMobile.value.trim();
      if (normalizedMobile.startsWith('+91')) {
        normalizedMobile = normalizedMobile.substring(3).trim();
      }
      axios
        .post("/send-otp", {
          mobile_number: normalizedMobile,
          email: regEmail.value,
        })
        .then((response) => {
          // setErrorMessage(response.data.message);
          if (response.data.success) {
            setErrorMessage(response.data.message);
            Disabled.value = "Disabled";
            countDown.value = 179;
            setInterval(function () {
              countDownTimer();
            }, 1000);
            Disabledbutton.value = true;
          } else {
            Disabled.value = "";
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // const kkk = async () => {
    //     if (regMobile.value === "") {
    //         regMobile.value = "+91";
    //     }
    //     mobileimg.value = 1;
    // };

    const onSubmit = async (values) => {
      let normalizedMobile = values.regMobile.trim();
      if (normalizedMobile.startsWith('+91')) {
        normalizedMobile = normalizedMobile.substring(3).trim();
      }
      axios
        .post("/forgotpassword", {
          mobile_number: normalizedMobile,
          // mobile_number: values.regMobile.slice(3), save with country code In DB
          email: values.regEmail,
          selectedRegMobile: selectedRegMobile.value
            ? selectedRegMobile.value
            : "+91",
          otp: values.regOtp,
          new_password: values.regPassword,
        })
        .then((response) => {
          console.log(response.data.success);
          if (response.data.success) {
            // loader.value = true;
            setErrorMessage(response.data.message);
            setTimeout(function () {
              // loader.value = false;
              router.push({ path: "/login" });
            }, 2000);
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const countDownTimer = () => {
      countDown.value--;
      if (countDown.value === 0) {
        Disabled.value = "";
        Disabledbutton.value = false;
      }
    };

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };


    const reloadPage = () => {
      router.go(-1);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }

    return {
      selectedRegMobile,
      router,
      regMobile,
      regMobileError,
      sendOtp,
      // validateEmail,
      emailimgfun,
      sendOtpEmail,
      onSubmit,
      regEmail,
      setErrorMessage,
      isErrorShow,
      errorMessage,
      Disabled,
      Disabledbutton,
      countDown,
      validateRegMobile,
      validateRegOtp,
      validateRegPassword,
      passwordimgfun,
      codeimgfun,
      mobileimgfun,
      passwordimg,
      codeimg,
      mobileimg,
      qpqp,
      emailimg,
      updateRegMobile,
      selectedRegMobileCode,
      fetchCountryCode,
      regMobileOptions1,
      selectElement,
      reloadPage
    };
  },
};
</script>

<style scoped>
/* @import "../assets/css/forgot-password.css"; */
</style>
