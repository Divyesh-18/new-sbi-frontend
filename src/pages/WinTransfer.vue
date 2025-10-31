<template>
  <!-- <link rel="stylesheet" :href="'/css/recharge.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="" />
      </a>
      <div class="pageTitle">Win Wallet Transfer</div>
    </div>
  </div>
  <div id="appCapsule">
    <div class="appContent1-addbankcard">
      <div class="recharge_box">
        <h3 class="Balance_Label">Win Balance: <span>₹ {{ mineDashbordData.win_amount }}</span></h3>
        <Form @submit="onSubmit" method="post" id="AddRecharge" class="card-body input_card" autocomplete="off">
          <div class="code_input_box">
            <div class="code_input">
              <img :src="require('../assets/images/wallet.png')" />
              <Field type="text" v-model="userammount" :rules="userammountrules" name="userammount" id="userammount"
                placeholder="Enter Transfer amount" onKeyPress="" class="form-control" required />
              <ErrorMessage name="type" />
            </div>
          </div>

          <!-- <div id="dam_return" class="amount_list">
            <a class="am" data-amount="500">₹ 500</a>
            <a class="am" data-amount="1000">₹ 1000</a>
            <a class="am" data-amount="2000">₹ 2000</a>
            <a class="am" data-amount="5000">₹ 5000</a>
            <a class="am" data-amount="10000">₹ 10000</a>
            <a class="am" data-amount="50000">₹ 50000</a>
          </div> -->

          <div class="center">
            <!-- <div data-v-d269120a="" class="payment_box">
              <p data-v-d269120a="" class="payment_text">
                Payment
              </p>
              <table>
                <thead>
                </thead>
                <tbody>
   
                  <tr>
                    <th>
                      <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px"  :class="radio === 2  && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 2"><b>Ekpay</b></span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <img class="check" :src="'/images/Right.png'" style="height: 100%; max-height: 15px"  :class="radio === 4  && 'active'" />
                    </th>
                    <th class="td1">
                      <span class="EkPay_Lable" v-on:click="radio = 4"><b>Phonepy</b></span>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <div class="recharge_btn">
              <input type="submit" class="btn btn-light" name="recharge" value="Transfer" />
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
          <a href="" type="button" class="text-info" data-dismiss="modal">OK</a>
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
    const radio = ref(2);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const mineDashbordData = ref({});
    let loader = ref(false);



    $(document).on("click", ".am", function () {
      // var t = $(this).data('amount');
      userammount.value = $(this).data("amount");
      // $('#userammount').val(t);
      $(".am").css("background-color", "#f5f5f5");
      $(".am").css("color", "#000");
      $(this).css("background-color", "#2196f3");
      $(this).css("color", "#fff");
    });

    const onSubmit = async (values) => {
      // router.push({ path: "/final-payment?amount="+values.userammount });
      if (values.userammount === '' || values.userammount === 0) {
        setErrorMessage('Enter Transfer amount');
      } else {
        loader.value = true;
        setTimeout(function () {
          loader.value = false
          axios
            .post("/transfer-wallet-amount", {
              amount: values.userammount,
            })
            .then((response) => {
              if (response.data.status == 'success') {
                userammount.value = "";
                getMineDashbordData();
                setErrorMessage(response.data.message);

              } else {

                setErrorMessage(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });

        }, 2000);
      }
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
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getMineDashbordData();
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
      radio,
      setErrorMessage,
      isErrorShow,
      errorMessage,
      getMineDashbordData,
      mineDashbordData,
      loader,
    };
  },
};
</script>
<style scoped>
/* @import "../assets/css/recharge.css"; */




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
input[type=number] {
  -moz-appearance: textfield;
}
</style>
