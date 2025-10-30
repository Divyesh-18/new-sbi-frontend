<template>
  <link rel="stylesheet" :href="'https://checkout.atpay.cc/layer/theme/default/layer.css?v=3.1.1'"
    id="layuicss-layer" />
  <!-- <link rel="stylesheet" :href="'/css/privacy-policy.css'" />

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="'/images/left.png'" alt="" />
      </a>
      <div class="pageTitle">Final Payment</div>
    </div>
  </div>
  <div id="appCapsule"></div>
  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a href="" type="button" class="text-info" data-dismiss="modal">OK</a>
        </div>
      </div>
    </div>
  </div> -->
  <div id="wraper_all">
    <div class="weui-flex main_title_wraper">
      <div class="main_title">
        <span>UPIPAY</span>
        <span class="mimo_title">UPI Cashier</span>
      </div>
    </div>
    <div class="liner-border"></div>
    <div id="copyAmount">
      <p class="weui-payselect-info">click the amount to copy</p>
      <div class="moeny_part">
        <span>₹</span> <span class="moeny">{{ userammount }}.00</span>
      </div>
      <div class="order_mino">
        <span class="lable-left">Serial No:</span>
        <span class="order_no">209183565</span>
      </div>
    </div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd" style="color: #e71111">
        Step 1: Transfer&nbsp;&nbsp;
        <span style="color: #d375de; font-weight: bold">
          ₹ <span class="moeny">{{ userammount }}.00</span> &nbsp;&nbsp;to the
          following upi
        </span>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text" style="padding-top: 10px">
          <img :src="qrCode" alt="" class="qr-image">
          <h4 class="weui-media-box__title" id="upi" style="
              color: #333;
              font-weight: 500;
              margin: 0 0 10px 0;
              text-shadow: 1px 1px 0 #fff;
              background-color: #e0e73a4f;
              text-align: center;
              padding: 10px 0;
              letter-spacing: 1px;
            ">
            {{ UPIID }}
          </h4>
          <div style="text-align: center; padding-top: 5px">
            <a class="weui-btn weui-btn_mini b-green" href="javascript:" id="btncopy"
              style="color: #487ef5; border: 1px solid #487ef5 !important" @click="onCopy">
              Copy Beneficiary UPI
            </a>
          </div>
          <p class="weui-media-box__desc" style="margin-top: 5px; text-align: left">
            1. Open your UPI wallet and complete the transfer
          </p>
          <p class="weui-media-box__desc" style="margin-top: 5px; text-align: left">
            2. Record your reference No.(Ref No.) after payment
          </p>
        </div>
      </div>
    </div>
    <div id="bankinfo" class="weui-media-box weui-media-box_text" style="padding-top: 10px; display: none">
      <ul class="weui-pay-u">
        <li>
          <span class="title">bank acc</span>
          <span class="content" id="bankAcc">loading</span>
          <span class="content"><a href="javascript:;" id="bankAccCopy"
              class="weui-btn weui-btn_mini bg-blue">copy</a></span>
        </li>
        <li>
          <span class="title">IFSC</span>
          <span class="content" id="ifsc">loading</span>
          <span class="content"><a href="javascript:;" id="ifscCopy"
              class="weui-btn weui-btn_mini bg-blue">copy</a></span>
        </li>
        <li>
          <span class="title">acc name</span>
          <span class="content" id="accName">loading</span>
          <span class="content"><a href="javascript:;" id="accNameCopy"
              class="weui-btn weui-btn_mini bg-blue">copy</a></span>
        </li>
      </ul>
      <p class="weui-media-box__desc" style="margin-top: 5px; text-align: left">
        1. If UPI payment fails, try to transfer BANK account
      </p>
      <p class="weui-media-box__desc" style="margin-top: 5px; text-align: left">
        2. Open your BANK wallet and complete the transfer
      </p>
      <p class="weui-media-box__desc" style="margin-top: 5px; text-align: left">
        3. Record your reference No.(Ref No.) after payment
      </p>
    </div>
    <div style="
        background: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 1px;
        display: block;
        position: relative;
      "></div>
    <p class="weui-media-box__desc" id="open-video" style="
        margin: 5px 0 10px 15px;
        text-align: left;
        color: #0b77ff;
        background-color: #fff;
      ">
      <img class="video-box-iconleft open-video" id="video"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAHlBMVEVHcEzcIRbcIhbcIhfcIhbcIhf////zr6vobWX52NY+JjLHAAAABXRSTlMAMKRq1hyT/2AAAAK9SURBVHja7dvPbqpQEAZwsXSvNd0bxb2tdd8o7Ctwcu8T0PYBSPoCvEMf90JII95aMjOHb9KQ+bY2/przFzxnJhOLxWKxWCwWi8XyGzKbX2Q28/3CYL7Y7VZ1oiiOY9eT+uO4+cP1evcwp7n1dz+uot5v7U98WDXaz//9InKD5fBw1bjZuEGTbq8YiRs4+RZvfFeCjQMkvRxtTw6S40VjOVC6DbZHIVmnRxws514JccgzvrU67QVsrXN7hUjkq702SCRVaC3nwDOxOx9DLNJ2yj0WOeH7/avnEyySK/R72/MqSIhGmuF1i0Ze8CO4HcN7NJLhp0k7URI00kwUBw98oW83RxXkBo9sdZApHlmOCAnxyDN1Ef7rtQwTkT+lBlKUHsg9FZErJwYiVlhIUWkgQoWJvFcyZM9BZErGREQKG5EofKR4rRQQvpJRH7s6SPHKfvASIFxFhjAVIcJTpEjxxkISGcJRcjFSfGogdMUHISs59c3hGkJWvJDiQwMhKp4I7eHCFyEp3ghF8UcIij9C2I/9kUqhuaqRDOFSYTKWCstKqbBAkt9XPJAPh0fohhyhb/E1Itx+OYZ0j+cYUoRlCBGeUSOCx9Q3niF6FuYaEoT7CiRB+AYfERg1wnsxlRjct1+RwUT4r/B8RGiwEKlRI+Sfot6lBuP3LrnBQOQGHfGJEnKLR15GhKgcbdhxEwsZzznjeM5+VY7KdQ79N2gk1bqIAd9QTlqXY+DrylLrwlKgMBd1LpGhx3Cmd7Fvih9cSpctsT2f468Lny8MT/FdonQpWeV6NfJRdal75R036bNuPUWCnYlt7jDGcYIv20j/L0QCKN9LaYLBlWtFQZO7YXv/+EPR1uJxKCde99WFBZ7VYG0x2IxR19YUtkX9VW15HseHA6+srUcNLuvz5oGVLFosFovFYrFYLL8i/wCdk3qgGTqe1wAAAABJRU5ErkJggg=="
        style="width: 20px; height: 20px; vertical-align: middle" />
      How it works ? need help? click here！
    </p>
    <div class="video-shadow"></div>
    <div id="videoFrame" style="
        display: none;
        position: fixed;
        z-index: 1000;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      ">
      <video controls="" height="100%" id="video1" loop="" src="" style="vertical-align: baseline" width="100%"></video>
      <div class="close" id="close-video" style="
          border-radius: 100px;
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 10000;
          width: 20px;
          height: 20px;
          background: #39c;
          top: initial;
          color: #fff;
          display: flex;
          justify-content: center;
        ">
        ×
      </div>
    </div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd" style="color: #e71111">
        Step 2: Submit Ref No/Reference No/UTR
      </div>
    </div>
    <div class="weui-pay" style="padding: 0; padding-top: 0">
      <div class="weui-pay-inner" style="border-radius: 0">
        <div class="weui-pay-input" id="refout" style="display: flex; justify-content: center; align-items: center">
          <input class="weui-pay-inputs" id="refno" :rules="validateref" placeholder="Input 12-digit here"
            minlength="12" maxlength="12" style="
              padding-left: 0;
              text-align: center;
              font-size: 36px;
              opacity: 0.2;
            " type="number" />
        </div>
        <div class="weui-pay-intro">
          Generally, your transfer will be confirmed within 10 minutes
        </div>
      </div>
    </div>
    <div class="weui-panel weui-panel_access" style="background-color: #f1f1f1; margin-top: 0">
      <div class="weui-panel__hd" style="color: #888">
        Where to find Ref No.
      </div>
      <div id="refnoeg">
        <div>
          <img :src="require('../assets/images/demo-1.png')" />
        </div>
        <div>
          <img :src="require('../assets/images/demo-2.png')" />
        </div>
        <div>
          <img :src="require('../assets/images/demo-3.png')" />
        </div>
        <div>
          <img :src="require('../assets/images/demo-4.png')" />
        </div>
        <div>
          <img :src="require('../assets/images/demo-5.png')" />
        </div>
        <div>
          <img :src="require('../assets/images/demo-6.png')" />
        </div>
      </div>
    </div>
    <div style="clear: both; height: 75px">&nbsp;</div>
    <div class="weui-tabbar tab-bottom" style="padding: 15px 0 20px 0">
      <a class="weui-btn weui-btn_primary ensure_btn" href="javascript:" id="savebtn" @click="onSubmit">
        Submit Ref Number
      </a>
    </div>
    <div class="loading2 hide" data-text="confirming, please wait"></div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="top: 47% !important">
      {{ errorMessage }}
    </div>
  </div>

  <!-- <div class="layui-layer-shade" id="layui-layer-shade1" times="1"
    style="z-index: 19891014; background-color: rgb(0, 0, 0); opacity: 0.3;" v-show="isLogoutModalVisible"></div> -->
  <!-- <div class="confirm-passwrd"> -->
  <div class="layui-layer layui-layer-dialog" id="layui-layer1" type="dialog" times="1" showtime="0" contype="string"
    style="z-index: 19891015; width: 360px; top: 257.5px; left: 163px">
    <Modal v-model:visible="isLogoutModalVisible" :modalClass="test" :offsetTop="251" :maskClosable="false"
      :width="365">
      <!-- <div style="background: #fff" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
          Confirm
        </h5>
      </div>
      <div class="modal-body py-0">
        <div class="sign-info logout-info">
          <p style="color: #000">Do you want to logout?</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-comman" v-on:click="isLogoutModalVisible = false,hideModal()">
          CANCEL
        </button>
        
      </div> -->
      <div class="tttt" style="margin: -14px -21px -5px -23px !important">
        <div class="layui-layer-title" style="cursor: move">Cashier</div>
        <div id="" class="layui-layer-content layui-layer-padding">
          <i class="layui-layer-ico layui-layer-ico0"></i><span style="word-break: break-word">After the payment is
            successful, you must coming back here to
            submit the Ref/UTR No.(12 digits) Only then your money be reached to
            the account.</span>
        </div>
        <span class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1"
            href="javascript:;" v-on:click="isLogoutModalVisible = false"></a></span>
        <div class="layui-layer-btn layui-layer-btn-">
          <a class="layui-layer-btn0" v-on:click="isLogoutModalVisible = false">OK</a>
        </div>
        <span class="layui-layer-resize"></span>
      </div>
    </Modal>
  </div>
  <!-- </div> -->
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import $ from "jquery";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

export default {
  components: {
    Modal,
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    }
    // useMeta({ title: "Privacy Policy Page" });
    const router = useRouter();
    const userammount = ref("");
    const isErrorShow = ref(false);
    const isLogoutModalVisible = ref(true);
    const errorMessage = ref("");
    const UPIID = ref("");
    const qrCode = ref("");
    if (router.currentRoute._value.query.goodsId === undefined) {
      router.push("/mine");
    } else {
      userammount.value = router.currentRoute._value.query.goodsId;
    }

    const getupiFun = async () => {
      axios
        .get("/get-upi", {})
        .then((response) => {
          UPIID.value = response.data?.data?.UPI_ID;
          console.log("get upi data", UPIID.value);
        })
        .catch((error) => {
          console.log(error?.data);
        });
    };

    getupiFun();

    const onSubmit = async () => {
      if (
        $("#refno").val() >= 100000000000 &&
        $("#refno").val() <= 999999999999
      ) {
        axios
          .post("/recharge", {
            amount: userammount.value,
            rechargetype: "CCpay",
            reference: $("#refno").val(),
          })
          .then((response) => {
            if (response.data.success) {
              // router.push({ path: '/add-address' });
              // alert(response.data.message);
              setErrorMessage(response.data.message);
              setTimeout(() => {
                router.push("/mine");
              }, 4000);

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
        setErrorMessage("Invalid Ref Number");
      }
    };

    const onCopy = async () => {
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
    const getQrCode = async () => {
      axios
        .get("/get-qr-code", {})
        .then((response) => {
          qrCode.value = response?.data?.data;
        })
        .catch((error) => {
          console.log(error?.data);
        });
    };
    getQrCode();


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
      isLogoutModalVisible,
      UPIID,
      qrCode,
    };
  },
};
</script>

<style scoped>
.layui-layer-shade {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* _height: expression(document.body.offsetHeight+"px"); */
}

.test {
  top: 175px !important;
}

.layui-layer-dialog {
  min-width: 260px;
}

.layui-layer-title {
  padding: 0 80px 0 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  background-color: #f8f8f8;
  border-radius: 2px 2px 0 0;
}

.layui-layer-btn {
  text-align: right;
  padding: 0 15px 12px;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
}

.layui-layer-btn a {
  height: 28px;
  line-height: 28px;
  margin: 5px 5px 0;
  padding: 0 15px;
  border: 1px solid #dedede;
  background-color: #fff;
  color: #333;
  border-radius: 2px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
}

.layui-layer-btn .layui-layer-btn0 {
  border-color: #1e9fff;
  background-color: #1e9fff;
  color: #fff;
}

.layui-layer-imgbar,
.layui-layer-imgtit a,
.layui-layer-tab .layui-layer-title span,
.layui-layer-title {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layui-layer-dialog .layui-layer-content {
  position: relative;
  /* padding: 20px; */
  line-height: 24px;
  word-break: break-all;
  overflow: hidden;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
}

.layui-layer-dialog .layui-layer-content .layui-layer-ico {
  position: absolute;
  top: 16px;
  left: 15px;
  _left: -40px;
  width: 30px;
  height: 30px;
}

.layui-layer-dialog .layui-layer-padding {
  padding: 20px 20px 20px 55px;
  text-align: left;
}

.layui-layer-dialog .layui-layer-content {
  position: relative;
  /* padding: 20px; */
  line-height: 24px;
  word-break: break-all;
  overflow: hidden;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
}

layui-layer {
  /* -webkit-overflow-scrolling: touch;
  top: 150px;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: #fff;
  -webkit-background-clip: content;
  border-radius: 2px; */
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
}

.modal-vue3-body {
  padding: 0px 0px !important;
}

.layui-layer,
.layui-layer-shade {
  position: fixed;
  _position: absolute;
  pointer-events: auto;
}

.toast-message {
  position: fixed;
  top: 50%;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  box-sizing: content-box;
  width: auto;
  padding: 16px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  text-align: center;
  word-break: break-all;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}

#wraper_all {
  margin: 0 auto;
  position: relative;
  max-width: 750px;
  font-family: Arial;
  line-height: 1.6;
  font-size: 16px;
  color: #000000;
}

.main_title_wraper {
  height: 120px;
  line-height: 120px;
  background-image: radial-gradient(circle at center top, #ff6600, #c10707);
  color: white;
  font-size: 30px;
  /* box-shadow: yellow 0px 0px 10px 5px inset; */
}

.mimo_title {
  font-size: 14px;
  padding-left: 22px;
}

.main_title {
  padding: 10px;
  padding-left: 20px;
}

.weui-payselect-info {
  font-size: 12px;
  color: #a6a4a5;
  text-align: center;
  margin-top: 16px;
}

.moeny_part {
  padding-top: 10px;
  width: 100%;
  text-align: center;
  font-size: 60px;
  line-height: 60px;
  font-weight: 700;
}

input {
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: fieldtext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  background-color: field;
  margin: 0em;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}

.order_mino {
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
  font-size: 16px;
}

.lable-left {
  display: inline-block;
  width: 80px;
  color: rgba(0, 0, 0, 0.4);
}

* {
  margin: 0;
  padding: 0;
}

.weui-panel {
  background-color: #ffffff;
  /* margin-top: 10px; */
  position: relative;
  overflow: hidden;
}

.weui-panel:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.weui-panel__hd {
  padding: 14px 15px 10px;
  color: #999999;
  font-size: 13px;
  position: relative;
}

.weui-panel__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}

.weui-media-box {
  padding: 15px;
  position: relative;
}

.weui-media-box__title {
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
}

.weui-btn {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  line-height: 2.55555556;
  border-radius: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}

.weui-btn_mini {
  display: inline-block;
  padding: 0 1.32em;
  line-height: 2.3;
  font-size: 13px;
}

a {
  color: #10aeff;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.weui-btn:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  box-sizing: border-box;
  border-radius: 10px;
}

.weui-media-box__desc {
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.weui-panel:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.weui-media-box {
  padding: 15px;
  position: relative;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.weui-pay-u li {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  box-orient: horizontal;
  line-height: 22px;
  width: 100%;
}

.weui-pay-u .title {
  font-size: 12px;
  color: #999;
  -webkit-box-flex: 1;
  width: 30%;
  -webkit-flex: 1;
  flex: 1;
  display: block;
}

/* .weui-pay-u .content {
  font-size: 12px;
  color: #333;
  text-align: right;
  -webkit-box-flex: 1;
  width: 70%;
  -webkit-flex: 1;
  flex: 1;
  display: block;
} */

.video-box-iconleft {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.video-shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 998;
  background-color: #000;
  opacity: 0.6;
  display: none;
}

video {
  object-fit: contain;
  overflow-clip-margin: content-box;
  overflow: clip;
}

/* video[Attributes Style] {
  height: 100%;
  width: 100%;
} */

.close {
  font-size: 28px;
  line-height: 28px;
  padding: 6px 12px 12px;
}

.weui-pay {
  position: relative;
  z-index: 1;
  padding: 15px;
}

.weui-pay-inner {
  background-color: #ffffff;
  padding: 16px;
  position: relative;
  z-index: 0;
}

.weui-pay-input {
  margin-top: 12px;
  padding-bottom: 18px;
  position: relative;
  z-index: 2;
  color: #333333;
}

.weui-pay-intro {
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 14px;
}

.weui-pay-inner:after {
  border: 0;
}

.weui-pay-inner:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #dddddd;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}

#refnoeg {
  padding-bottom: 20px;
}

#refnoeg>div {
  width: 90%;
  margin-top: 5px !important;
  text-align: center;
  margin: 0 auto;
}

#refnoeg img {
  width: 100%;
}

.weui-pay-inputs {
  padding-left: 28px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: 0;
  height: 40px;
  line-height: 40px;
  font-size: 40px;
}

#refout:after {
  border-bottom: 1px solid #16bffa;
}

.weui-pay-input:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #dddddd;
  color: #dddddd;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}

.weui-tabbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background-color: #f7f7fa;
}

.weui-tabbar:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #c0bfc4;
  color: #c0bfc4;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.weui-btn_primary {
  background-color: #07c160;
}

.ensure_btn {
  color: white;
  width: 100%;
  background: #ff6600;
}

.tab-bottom {
  bottom: 0;
  width: 100%;
  position: fixed;
}

.tab-bottom {
  max-width: 750px;
}

.hide {
  display: none;
}

.loading2 {
  color: #fff;
  position: fixed;
  box-sizing: border-box;
  left: -9999px;
  top: -9999px;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: 999999;
}

.loading2 {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

#copyAmount {
  background-color: #fff;
}

.qr-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

/* .weui-panel.weui-panel_access{
  margin-top: 10px;
} */
</style>
