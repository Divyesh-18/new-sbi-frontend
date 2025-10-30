<template v-on:click="isNoticeModalVisible = false,hideModal()">
  <!-- <link rel="stylesheet" :href="'/css/ekpay.css'" /> -->

  <div class="setp" id="setp-1" style="display:block">
    <div class="navbar navbar-default" style="margin-bottom: 0;position: relative; background: #528FF0; padding-bottom: 10px;
">
      <h4 class="text-center tit">Payment Information</h4>
      <span id="order_time" style="">
        <span class="span">{{ countDownMinute > 9 ? countDownMinute.toString().charAt(0) : 0 }}</span>
        <span class="span">{{ countDownMinute > 9 ? countDownMinute.toString().charAt(1) :
          countDownMinute.toString().charAt(0) }}</span>
        <span>:</span>
        <span class="span">{{ (countDownSecond.toString().charAt(0)) ? countDownSecond.toString().charAt(0) :
          0 }}</span>
        <span class="span">{{ (countDownSecond.toString().charAt(1)) ? countDownSecond.toString().charAt(1) :
          0 }}</span>
      </span>
    </div>

    <div class="container-fluid highlight">
      <div style="margin: 0 auto;max-width: 520px">
        <div class="payment-model" data-model="upi">
          <p id="teach"
            style="text-align: center;font-size: 12px;color: #333;margin-bottom: -5px;text-decoration: underline;">
            <span
              style="font-size: 14px;display: inline-block;margin-right: 6px;color: #fff;background: #ff0000;height: 16px;width: 16px;border-radius: 50%;line-height: 16px;text-align: center;">?</span>
            How to pay?
          </p>
          <h3 class="amount-title">
            Payment Amount
            <br>
            <span>₹&nbsp;{{ userammount }}</span>
          </h3>
          <div class="upi-info">
            <div>
              Pay to UPI: <br>
              <span style="color: #ff0000" id="upi">
                 {{ UPIID }}
              </span>
            </div>
            <a class="btn-copy" data-clipboard-text="digta218@esaf"
              style="text-align: center;width: 60px;font-size:16px" @click="onCopy">copy</a>
          </div>
          <div class="upi-payment-step">
            <span style="min-width: 52px;font-weight: 800;color:#333">STEP 1:</span>
            <!--<a href="upi://pay?pa=digta218@esaf&amp;cu=INR&amp;pn=R%20V%20TRADING%20RAJ%20CHATILAL%20VERMA&amp;am=500&amp;tn=LouisEK20230202121122862907&amp;tr=LouisEK20230202121122862907" target="_blank">
Click to open APP payment
</a>-->
            <div style="margin-left:10px">
              Open online banking or wallet, transfer to the UPI account
            </div>
          </div>
          <div class="upi-payment-step">
            <span style="min-width: 52px">STEP 2:</span>
            <input type="text" id="upi-input" value="" name="channel_order" placeholder="ENTER REF NO.:3033xxxxxxxx"
              maxlength="12" oninput="this.value=this.value.replace(/[^\d]/g,'')"
              onchange="this.value=this.value.replace(/[^\d]/g,'')">
          </div>
          <div class="enter-ref-warn-box">
            <div class="enter-ref-warn">
              You must fill in the correct Ref No.,then click the button below to submit,and wait for it
              to arrive!
            </div>
            <div class="btns" style="margin-top: 0;margin-bottom:20px">
              <a class="btn sub" style="width: 200px" @click="onSubmit">Confirm REF NO.</a>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="text-left">
            <p class="level-2" style="margin-bottom:0;color:#333;">Ref No. Example</p>
            <p class="level-2 red text-muted">Click on the picture to view details</p>
            <div class="img-row">
              <img data-big-img="example1" class="payment-img-width" :src="require('../assets/images/demo-1.png')">
              <img data-big-img="example2" class="payment-img-width" :src="require('../assets/images/demo-2.png')">
            </div>
            <div class="img-row">
              <img data-big-img="example3" class="payment-img-width" :src="require('../assets/images/demo-3.png')">
              <img data-big-img="example4" class="payment-img-width" :src="require('../assets/images/demo-4.png')">
            </div>
            <div class="img-row">
              <img data-big-img="example5" class="payment-img-width" :src="require('../assets/images/demo-5.png')">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="notification-modal">
    <Modal v-model:visible="isNoticeModalVisible" height="auto" width="70%">
      <div style="background: #fff" class="modal-header">
        <h5 class="modal-title" style="color: #000;">NOTICE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
          v-on:click="isNoticeModalVisible = false, hideModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body py-0" style="border-bottom: 1px solid #eeeaea; border-top:1px solid #eeeaea;">
        <div class="sign-info logout-info" style="font-weight: bold;">
          <p style="color: #000">
            1.Please do not save the current UPI account for next use! Be sure to confirm that the UPI
            account you have obtained is the latest account.
          </p>
          <p style="color: #000">
            2.If you fail to comply with this agreement and cause financial losses that cannot be recovered,
            the platform will not be responsible.
          </p>
          <p style="color: #000">
            3.If you have any questions, please contact customer service.</p>
        </div>
      </div>
      <div class="modal-footer" style="justify-content:center !important; align-items: center !important;">
        <button type="button" class="btn btn-comman active payment-btn text-white" data-dismiss="modal"
          v-on:click="isNoticeModalVisible = false, hideModal()" style="background: rgb(82, 143, 240);">
          Submit({{ countDown1 }}s)
        </button>
      </div>
    </Modal>
  </div>
  <div class="toast-content" v-show="isErrorShow" style="">
    <div class="toast-message" style="top: 47% !important;">{{ errorMessage }}</div>
  </div>
</template>

<script :src="'https://gateway.ekpays.com/static/assets/js/jquery-2.1.4.min.js'"></script>

<script>
import { useMeta } from "vue-meta";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import $ from "jquery";
import Footer from "../components/CommonFooter.vue";
import { Modal } from "usemodal-vue3";


export default {
    components: {
        Footer,
        Modal,

    },
    props: {
        toggleLoader: { type: Function },
    },
    setup() {
        // useMeta({ title: "Privacy Policy Page" });
        const router = useRouter();
        const userammount = ref("");
        const isErrorShow = ref(false);
        const errorMessage = ref("");
        const countDownMinute = ref(0);
        const countDownSecond = ref(0);
        const countDown = ref(1800);
        const countDown1 = ref(20);
        let isNoticeModalVisible = ref(true);
        const UPIID = ref("");
       
        const getupiFun = async () => {

            axios.get("/get-upi", {})
                .then((response) => {
                  UPIID.value = response.data.data.second_upi_id;
                })
                .catch((error) => {
                  console.log(error.data.error);
                });

            }

            getupiFun();

        if (!localStorage.getItem("authToken")) {
                router.push({ path: "/login" });
            }

        if(countDown1.value === 0){
            // isNoticeModalVisible.value = false;
            clearInterval(intervalID);
        }
        else{
          var  intervalID = setInterval(function () {
                countDown1.value = --countDown1.value;
                if(countDown1.value === 0){
                    // isNoticeModalVisible.value = false;
                }
            }, 1000);
        }

        setInterval(function () {
            countDown.value = --countDown.value;
            var i = countDown.value / 60, n = countDown.value % 60, o = n / 10, s = n % 10;
            countDownMinute.value = Math.floor(i);
            countDownSecond.value = ('0' + Math.floor(n)).slice(-2);
        }, 1000);

        if (router.currentRoute._value.query.goodsId === undefined) {
            router.push("/mine");
        } else {
            userammount.value = router.currentRoute._value.query.goodsId;
        }

        const onSubmit = async (values) => {
            if ($("#upi-input").val() >= 100000000000 && $("#upi-input").val() <= 999999999999) {
                axios
                    .post("/recharge", {
                        amount: userammount.value,
                        rechargetype: 'CSPay',
                        reference: $("#upi-input").val(),
                    })
                    .then((response) => {
                        if (response.data.success) {
                            // router.push({ path: '/add-address' });
                            // alert(response.data.message);
                            setErrorMessage(response.data.message);
                            setTimeout(() => {
                                router.push("/mine");
                                
                            }, 2000);

                            // window.location.reload(true);
                        } else {
                            // alert(response.data.message);
                            setErrorMessage(response.data.message);

                        }
                    })
                    .catch((error) => {
                        console.log(error.data.error);
                    });

            } else {
                setErrorMessage('Invalid Ref Number');

            }

        };

        const onCopy = async (value) => {
            try {
                var curl = $("#upi").html();
                await navigator.clipboard.writeText(curl);
                setErrorMessage("UPI copied successfully");

            } catch ($e) {
                setErrorMessage("UPI copied failed, Please input manually");

                // alert("Cannot copy");
            }
        };

        const validateref = async (value) => {
            if (!value) {
                setErrorMessage("Invalid Ref Number");

                return "";
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

        const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };


        return {
          showModal,
          hideModal,
            router,
            userammount,
            onCopy,
            isErrorShow,
            errorMessage,
            setErrorMessage,
            onSubmit,
            validateref,
            countDownMinute,
            countDownSecond,
            isNoticeModalVisible,
            countDown1,
            UPIID,
            userammount
        };
    },
};
</script>


<!-- <style scoped>

@import "../assets/css/ekpay.css";

</style> -->