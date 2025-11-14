<template>
  <!-- <link rel="stylesheet" :href="'/css/recharge.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" class="dollar-img" />
      </a>
      <div class="pageTitle">Recharge</div>
    </div>
    <div class="right" style="right: 15px; position: absolute; top: 15px">
      <div class="pluse-icons">
        <router-link to="/rechargerecord">
          <a>
            <img :src="require('../assets/images/menu.png')" class="dollar-img"
              style="height: 100%; max-height: 24px" />
          </a>
        </router-link>
      </div>
    </div>
  </div>
  <div id="appCapsule">
    <div class="appContent1-addbankcard">
      <div class="recharge_box">
        <h3 class="Balance_Label">
          Balance: <span>₹ {{ mineDashbordData.balance }}</span>
        </h3>
        <Form @submit="onSubmit" method="post" id="AddRecharge" class="card-body input_card" autocomplete="off">
          <div :class="radio === 5 ? 'code_input_box show-flex' : 'code_input_box show-hide'">
            <div class="code_input">
              <img :src="require('../assets/images/download__9_-removebg-preview.png')" class="dollar-img" />
              <Field type="number" v-model="usdtamount" inputmode="numeric" name="usdtamount" id="usdtamount"
                placeholder="Enter or Select recharge USDT" onKeyPress="" class=" form-control" required />
              <ErrorMessage name="type" />
            </div>
          </div>
          <div class="code_input_box">
            <div class="code_input withdrawal-input">
              <img :src="require('../assets/images/wallet.png')" class="dollar-img" />
              <Field :disabled="radio === 5" type="number" v-model="userammount" :rules="userammountrules"
                name="userammount" id="userammount" inputmode="numeric" placeholder="Enter or Select recharge amount"
                onKeyPress="" class="form-control" required />
              <ErrorMessage name="type" />
            </div>
          </div>

          <div id="ind_amount" :class="radio != 5 ? 'show-flex amount_list' : 'show-hide amount_list'">
            <a class="am" data-amount="500">₹ 500</a>
            <a class="am" data-amount="1000">₹ 1000</a>
            <a class="am" data-amount="2000">₹ 2000</a>
            <a class="am" data-amount="5000">₹ 5000</a>
            <a class="am" data-amount="10000">₹ 10000</a>
            <a class="am" data-amount="20000">₹ 20000</a>
          </div>
          <div id="usdt_amount" :class="radio === 5 ? 'amount_list show-flex' : 'amount_list show-hide'">
            <a class="am" data-usdt="1">₮ 1</a>
            <a class="am" data-usdt="10">₮ 10</a>
            <a class="am" data-usdt="30">₮ 30</a>
            <a class="am" data-usdt="50">₮ 50</a>
            <a class="am" data-usdt="100">₮ 100</a>
            <a class="am" data-usdt="200">₮ 200</a>
          </div>
          <div class="center">
            <div data-v-d269120a="" class="payment_box">
              <p data-v-d269120a="" class="payment_text remove_margin-block_start">
                pay
              </p>
              <table>
                <thead></thead>
                <tbody>
                  <!-- <tr>
                    <th class="td1">
                      <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px" :class="radio === 1  && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 1"><b>Dypay</b></span>
                    </th>
                  </tr> -->
                  <tr>
                    <th>
                      <img class="check" :src="require('../assets/images/Right.png')"
                        style="height: 20%; max-height: 15px; width:17px;" :class="radio === 1 && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 1"><b style="font-size: 14px;"><img
                            src="../assets//images/paytm.jpg" width="30" height="30" alt="">QePay(100-50k)</b></span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <!-- <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px"  :class="radio === 2  && 'active'" /> -->
                      <img class="check" :src="require('../assets/images/Right.png')"
                        style="height: 100%; max-height: 15px; width: 17px;" :class="radio === 2 && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 2"><b style="font-size: 14px;">
                          <img src="../assets/images/phonepay.jpg" width="30" height="30" alt="">
                          CSPAY(100-50k)</b></span>
                    </th>
                  </tr>
                  <!-- <tr>
                    <th>
                      <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px"  :class="radio === 2  && 'active'" /> 
                      <img class="check" :src="require('../assets/images/Right.png')"
                        style="height: 100%; max-height: 15px; width: 17px;" :class="radio === 5 && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 5"><b style="font-size: 14px;">
                          <img src="../assets/images/usdt (1).jpg" width="30" height="30" alt="">
                          USDTPayment(1₮-200₮)</b></span>
                    </th>
                  </tr> -->
                  <!-- <tr>
                    <th>
                      <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px" :class="radio === 3  && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 3"><b>Ekpay</b></span>
                    </th>
                  </tr> -->
                  <tr>
                    <th>
                      <img class="check" :src="require('../assets/images/Right.png')"
                        style="height: 20%; max-height: 15px; width:17px;" :class="radio === 4 && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 4"><b style="font-size: 14px;">
                          <img src="../assets/images/phonepay.jpg" width="30" height="30" alt="">
                          Cashpay(300-50k)</b></span>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="recharge_btn">
              <input type="submit" class="btn btn-light" name="recharge" value="Recharge" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>

  <Footer />
  <!-- loader -->
  <Loader :isShow="loader" />

  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a href="" type="button" class="text-info" data-dismiss="modal">OK done</a>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { watch } from "vue";
import axios from "axios";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import $ from "jquery";
import Footer from "../components/CommonFooter.vue";
import Loader from "../components/UserLoader.vue";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Footer,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Recharge Page" });
    const router = useRouter();
    const userammount = ref("");
    const usdtamount = ref("");
    const radio = ref(1);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const mineDashbordData = ref({});
    const minimum_recharge_amount = ref("");
    const usdt_rate = ref(1);
    let loader = ref(false);

    $(document).on("click", ".am", function () {
      // var t = $(this).data('amount');
      if(radio.value === 5) {
        userammount.value = ($(this).data("usdt") * usdt_rate.value).toFixed(2);
        usdtamount.value = $(this).data("usdt");
      }else {
        userammount.value = $(this).data("amount");
      }
      // $('#userammount').val(t);
      $(".am").css("background-color", "#f5f5f5");
      $(".am").css("color", "#000");
      $(this).css("background-color", "#2196f3");
      $(this).css("color", "#fff");
    });

    watch(usdtamount, (newVal) => {
      if (radio.value === 5 && newVal) {
        userammount.value = (newVal * usdt_rate.value).toFixed(2);
      }
      if(newVal === ""){
        userammount.value = "";
      }
    });
    watch(userammount, (newVal) => {
      if (radio.value !== 5 && newVal) {
        usdtamount.value = (newVal / usdt_rate.value).toFixed(2);
      }
    });

      
    const onSubmit = async (values) => {
      // router.push({ path: "/final-payment?amount="+values.userammount });
      let rechargeAmount = minimum_recharge_amount.value || 211;

      if (values.userammount === "" || values.userammount === 0) {
        setErrorMessage("Enter or Select recharge amount");
      } else if (values.userammount < rechargeAmount) {
        setErrorMessage(`Enter or Select recharge minimum ₹${rechargeAmount}`);
      } else {
        loader.value = true;
        setTimeout(function () {
          loader.value = false;
          // if (radio.value === 1) {
          //   router.push({
          //     name: "ekpay",
          //     query: { goodsId: values.userammount },
          //   });
          // }
          if (radio.value === 1) {
            router.push({
              name: "newPaymentGetWay",
              query: { goodsId: values.userammount },
            });
          }
         /* if (radio.value === 2) {
            router.push({
              name: "final-payment",
              query: { goodsId: values.userammount },
            });
          } */
          if (radio.value === 2) {
            router.push({
              name: "sepay",
              query: { goodsId: values.userammount },
            });
          }
          if (radio.value === 4) {
            router.push({
              name: "UPIPayment",
              query: { goodsId: values.userammount },
            });
          }
          // if (radio.value === 4) {
          //   router.push({
          //     name: "ekpay",
          //     query: { goodsId: values.userammount },
          //   });
          // }
          if(radio.value === 5){
            router.push({
              name: "USDTPayment",
              query: { goodsId: values.userammount },
            });
          }
        }, 2000);
      }
    };
    const getRechargeAmount = async () => {
      axios
        .get("/get-recharge-amount", {})
        .then((response) => {
          if (response.data.success === true) {
            minimum_recharge_amount.value = response.data.data.minimum_recharge_amount;
            usdt_rate.value = response.data.data.usdt_rate;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getMineDashbordData();
      getRechargeAmount();
    }

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };

    return {
      onSubmit,
      router,
      userammount,
      usdtamount,
      radio,
      setErrorMessage,
      isErrorShow,
      errorMessage,
      getMineDashbordData,
      getRechargeAmount,
      mineDashbordData,
      loader,
    };
  },
};
</script>
<style scoped>
/* @import "../assets/css/recharge.css"; */
.show-flex {
    display: flex !important;
  }

.show-hide {
  display: none !important;

}
.td1 {
  color: #323233;
}

.toast-message {
  display: fixed;
  min-width: 96px;
  min-height: 0;
  padding: 8px 12px;
  font-size: 14px;
  position: fixed;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@media only screen and (max-width: 450px) {
 .EkPay_Lable img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
}
</style>
