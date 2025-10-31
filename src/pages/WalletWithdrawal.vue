<template>
  <!-- <link rel="stylesheet" :href="'/css/Withdrawal.css'" /> -->

  <div class="recharge walletwithdrawal-wrapper">
    <nav class="top_nav">
      <div class="left">
        <a href="#" v-on:click="router.go(-1)" class="icon goBack">
          <img :src="require('../assets/images/left.png')" />
        </a>
        <span>Withdrawal</span>
      </div>
      <div class="right">
        <router-link to="/withdrawalrecord">
          <a>
            <img :src="require('../assets/images/menu.png')" alt="" />
          </a>
        </router-link>
      </div>
    </nav>
    <Form @submit="onSubmit" method="post" id="withdrawal" class="card-body input_card" autocomplete="off">
      <div class="recharge_box" style="padding: 15px 15px !important">
        <h3 class="top_text-wallet" style="line-height: 1.5">
          Balance: ₹
          {{ mineDashbordData.balance }}

          <!-- &nbsp;&nbsp; Win Balance: ₹

          {{ mineDashbordData.win_amount }} -->
        </h3>
        <p class="top_text" style="margin-bottom: 0 !important"></p>
        <div class="code_input_box">
          <div class="code_input" style="width: 97% !important; margin: 0px !important;">
            <img class='withdrawal-img' :src="require('../assets/images/folder.png')" alt="" />
            <Field type="number" v-model="userammount" name="userammount" id="userammount" min="211" onKeyPress=""
              placeholder="Enter withdrawal amount" class="form-control" v-on:keyup="commi(userammount)" required
              autocomplete="off" />
            <ErrorMessage name="type" />
          </div>
        </div>
        <div class="text_field" style="padding: 16px 15px 15px !important">
          <!-- <p>Fee: <span>0,</span>to account <span>0</span></p> -->
          <p>Fee: {{ commition }}</p>
        </div>
        <div class="payment_box">
          <p class="payment_text" style="margin-bottom: 0 !important; margin-block-start: 0 !important">
            Payout
          </p>
          <div role="radiogroup" class="van-radio-group">
            <div role="radio" tabindex="0" aria-checked="true" class="van-radio">
              <div class="van-radio__icon van-radio__icon--square van-radio__icon--checked">
                <img :src="require('../assets/images/Right.png')" alt="" style="width: 15px; height: 15px" />
              </div>
              <span class="van-radio__label">
                <span class="text">Bankcard</span>
              </span>
            </div>
          </div>
        </div>
        <div class="add_card">
          <div class="van-collapse van-hairline--top-bottom">
            <div class="van-collapse-item" @pointerdown="varadd_card = true" @pointerup="add_card()">
              <div role="button" tabindex="0" aria-expanded="false"
                class="van-cell van-cell--clickable van-collapse-item__title"
                :class="varadd_card && 'wallet-active-focus'" style="background-color: #ffff;">
                <div class="van-cell__title">
                  <img :src="require('../assets/images/bank-card.png')" alt="" />
                  {{ droplabel }}
                </div>

                <i v-show="!isAccountCollapseOpen" class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
                <i v-show="isAccountCollapseOpen" class="bi bi-chevron-up add-icon-size" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="van-collapse van-hairline--top-bottom" v-on:click="
            (dropvalue = item.id),
            (isAccountCollapseOpen = !isAccountCollapseOpen),
            (droplabel = item.name)
            " v-show="isAccountCollapseOpen" v-for="item in mineBankdData" :key="item.id">
            <div class="van-collapse-item">
              <div role="button" tabindex="0" aria-expanded="false"
                class="van-cell van-cell--clickable van-collapse-item__title" style="background-color: #ffff;">
                <div class="van-cell__title">
                  &emsp;&emsp;&emsp;&emsp;&nbsp;
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>

          <router-link to="/addbankcard">
            <div class="van-collapse van-hairline--top-bottom"
              v-on:click="isAccountCollapseOpen = !isAccountCollapseOpen" v-show="isAccountCollapseOpen">
              <div class="van-collapse-item">
                <div role="button" tabindex="0" aria-expanded="false"
                  class="van-cell van-cell--clickable van-collapse-item__title" style="background-color: #ffff;">
                  <div class="van-cell__title">
                    &emsp;&emsp;&emsp;&emsp;&nbsp; Add Bank Card
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <hr v-show="isAccountCollapseOpen" />
        </div>
        <!-- <div class="van-collapse van-hairline--top-bottom">
                    <div class="van-collapse-item">
                        <div
                            role="button"
                            tabindex="0"
                            aria-expanded="false"
                            class="van-cell van-cell--clickable van-collapse-item__title"
                        >
                            <div class="van-cell__title">
                                <select v-model="selectedOption">
                                    <option value="wallet">Wallet</option>
                                    <option value="winningwallet">
                                        Win Wallet
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div> -->
        <div class="d-flex" style="display: none !important">
          <div class="col-2">
            <label class="mx-2" for="dropdown">Select Wallet:</label>
          </div>
          <div class="col-12">
            <select class="col-8" id="dropdown" v-model="selectedOption" @change="updateWallet">
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="password_box">
          <div class="box_border">
            <img :src="require('../assets/images/key-img.png')" alt="" />

            <Field autocomplete="new-password" type="password" name="password" id="password" min="300" onKeyPress=""
              placeholder="Enter your login password" class="form-control Form_Control" required />
            <ErrorMessage name="password" />
          </div>
        </div>
        <div class="recharge_btn">
          <button type="submit" v-on:click="getMineDashbordData()">Withdrawal</button>
        </div>
      </div>
    </Form>
    <Footer />
  </div>
  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <!-- loader -->
  <Loader :isShow="loader" />

  <Footer />
</template>

<script>
import Footer from "../components/CommonFooter.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Loader from "../components/UserLoader.vue";

export default {
  components: {
    Footer,
    Form,
    Field,
    ErrorMessage,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },

  setup() {
    // useMeta({ title: "Product Details" });
    const router = useRouter();
    const mineDashbordData = ref({});
    const mineBankdData = ref({});
    const isErrorShow = ref(false);
    const varadd_card = ref(false);
    const isAccountCollapseOpen = ref(false);
    const errorMessage = ref("");
    const dropvalue = ref("");
    const droplabel = ref("Select Bank Card");
    const commition = ref("0,to account 0");
    let loader = ref(false);
    const selectedWallet = ref("");
    let userammountValue = 0;
    const userammount = ref("");
    const password = ref("");
    const updateWallet = (event) => {
      selectedWallet.value = event.target.value;
      if (event.target.value && event.target.value == "winwallet") {
        var main1 = (userammountValue * 95) / 100;
        commition.value = (userammountValue * 5) / 100 + ",to account " + main1;
      } else {
        var main2 = (userammountValue * 95) / 100;
        commition.value = (userammountValue * 5) / 100 + ",to account " + main2;
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
    const getMineDashbordData = async () => {
      axios
        .get("/mine-dashbord", {})
        .then((response) => {
          if (response.data.success === true) {
            mineDashbordData.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("/get-bank-detail", {})
        .then((response) => {
          if (response.data.success === true) {
            mineBankdData.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const commi = async (values) => {
      if (selectedWallet.value && selectedWallet.value == "winwallet") {
        var main3 = (values * 95) / 100;
        commition.value = (values * 5) / 100 + ",to account " + main3;
      } else {
        var main5 = (values * 95) / 100;
        commition.value = (values * 5) / 100 + ",to account " + main5;
      }
      userammountValue = values;
    };
    const add_card = async () => {
      isAccountCollapseOpen.value = !isAccountCollapseOpen.value;
      varadd_card.value = false;
    };

    // const onSubmit = async (values) => {
    //   axios
    //     .post("/withdrawal", {
    //       amount: values.userammount,
    //       payout: "bank",
    //       account_id: dropvalue.value,
    //       password: values.password,
    //       selectedWallet: selectedWallet.value
    //         ? selectedWallet.value
    //         : "wallet",
    //     })
    //     .then((response) => {
    //       if (response.data.success) {
    //         loader.value = true;

    //         setErrorMessage(response.data.message);
    //         setTimeout(() => {
    //           loader.value = false;
    //         }, 2000);
    //         userammount.value = "";
    //         password.value = "";
    //         droplabel.value = "Select Bank Card";
    //         getMineDashbordData();
    //       } else {
    //         setErrorMessage(response.data.message);
    //       }
    //       setTimeout(() => {
    //         router.push({ path: "/mine" });
    //       }, 2000);
    //     })
    //     .catch((error) => {
    //       console.log(error.data?.error);
    //     });
    // };
    const onSubmit = async (values) => {
      try {
        const response = await axios.post("/withdrawal", {
          amount: values.userammount,
          payout: "bank",
          account_id: dropvalue.value,
          password: values.password,
          selectedWallet: selectedWallet.value ? selectedWallet.value : "wallet",
        });
        if (response.data.success) {
          loader.value = true;
          setErrorMessage(response.data.message);
          setTimeout(() => {
            loader.value = false;
          }, 2000);
          userammount.value = "";
          password.value = "";
          droplabel.value = "Select Bank Card";
          getMineDashbordData();
          setTimeout(() => {
            router.push({ path: "/mine" });
          }, 2000);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getMineDashbordData();
    }
    return {
      errorMessage,
      onSubmit,
      mineBankdData,
      mineDashbordData,
      getMineDashbordData,
      router,
      setErrorMessage,
      isErrorShow,
      commition,
      commi,
      isAccountCollapseOpen,
      dropvalue,
      droplabel,
      add_card,
      varadd_card,
      loader,
      updateWallet,
      selectedWallet: "winwallet",
      selectedOption: "wallet",
      options: [
        { label: "Main Wallet", value: "wallet" },
        { label: "Win Wallet", value: "winwallet" },
      ],
    };
  },
};
</script>

<style scoped>
/* @import "../assets/css/Withdrawal.css"; */

#dropdown {
  border: none;
}
</style>
