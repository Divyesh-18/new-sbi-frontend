<template >
  <!-- <link rel="stylesheet" :href="'/css/add-address.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/AddComplaints.css'"> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="" />
      </a>
      <div class="pageTitle" style="font-weight: 500;">Add Complaints & Suggestion</div>
    </div>
  </div>

  <div id="appCapsule">
    <Form @submit="onSubmit" method="post" id="AddAddress" class="card-body input_card" autocomplete="off">
      <div class="appContent1-loging" style="padding: 25px 30px 30px !important">
        <div class="form-group add-border-bottom coustom-margin_add_bottom">
          <label for="name" class="custom-label-add coustom-add_complaints-style">Type</label>
          <div class="van-field__control">
            <Field type="text" v-model="fainal" :rules="validatetype" :value="fainal" name="type" id="type"
              onKeyPress="" class="form-control" disable v-on:click="typemodal = true, main = 0,showModal()" />
            <ErrorMessage name="type" style="color: red" />
          </div>
        </div>
        <div class="form-group add-border-bottom coustom-margin_add_bottom">
          <label for="ifsc" class="custom-label-add coustom-add_complaints-style">Out Id</label>
          <Field type="text" v-model="OutId" :rules="validateOutId" name="OutId" id="OutId" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="OutId" style="color: red" />
        </div>
        <div class="form-group add-border-bottom coustom-margin_add_bottom">
          <label for="bank" class="custom-label-add coustom-add_complaints-style">WhatsApp</label>
          <Field type="text" v-model="WhatsApp" :rules="validateWhatsApp" name="WhatsApp" id="WhatsApp" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="WhatsApp" style="color: red" />
        </div>
        <div class="form-group add-border-bottom coustom-margin_add_bottom">
          <label for="Description" class="custom-label-add coustom-add_complaints-style">Description</label>
          <Field type="text" v-model="Description" :rules="validateDescription" name="Description" id="Description"
            onKeyPress="" class="form-control" />
          <ErrorMessage name="Description" />
        </div>
        <p class="addComplaints_footer">
          Service: 10:00~17:00, Mon~Fri about 1~5 business days
        </p>
        <div class="text-center">
          <button type="submit" id="continue" class="btn-continue ripple">
            Continue
          </button>
        </div>
      </div>
    </Form>
  </div>

  <!-- type-modal -->
  <div class="van-overlay" v-show="typemodal" style="z-index: 2002;" v-on:click="typemodal = false,hideModal()"></div>
  <div class="type-offers-modal" v-show="typemodal">
    <div data-v-471d7b07="" class="van-popup van-popup--round van-popup--bottom" style="z-index: 2002; display: ;">
      <div class="van-picker">
        <div class="van-picker__toolbar">
          <button type="button" class="van-picker__cancel" v-on:click="typemodal = false,hideModal()">cancel</button>
          <button type="button" class="van-picker__confirm"
            v-on:click="fainal = cars[main], typemodal = false,hideModal()">confirm</button>
        </div>
        <div class="van-picker__columns" style="height: 220px;">
          <div class="van-picker-column">
            <ul class="van-picker-column__wrapper" style="transition-duration: 0ms; transition-property: none;">
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px; ">
                <div class="van-ellipsis" @click="final(main - 2)">{{ cars[main - 2] }}</div>
              </li>
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;">
                <div class="van-ellipsi" @click="final(main - 1)">{{ cars[main - 1] }}</div>
              </li>
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;">
                <div class="van-ellipsis">{{ cars[main] }}</div>
              </li>
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;">
                <div class="van-ellipsis " @click="final(main + 1)">{{ cars[main + 1] }}</div>
              </li>
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;">
                <div class="van-ellipsis" @click="final(main + 2)">{{ cars[main + 2] }}</div>
              </li>
              <!-- <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;"><div class="van-ellipsis" @click="final(5)">Gift Receive Problem</div></li>
              <li role="button" tabindex="0" class="van-picker-column__item" style="height: 44px;"><div class="van-ellipsis " @click="final(6)">Other</div></li> -->
            </ul>
          </div>
          <div class="van-picker__mask" style="background-size: 100% 88px;"></div>
          <div class="van-hairline-unset--top-bottom van-picker__frame" style="height: 44px;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- loader -->
  <Loader :isShow="loader" />
  
  <Footer />
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
    <div class="toast-message"
      style="top: 50% !important;font-size: 14px;min-width: 120px;padding: 8px 12px;text-align: center;margin: 0 auto; position: fixed;">
      {{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
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
    // useMeta({ title: "Add Complaints Page" });
    const router = useRouter();
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const main = ref(0);
    const fainal = ref('');
    const cars = ref([]);
    const typemodal = ref(false);
    cars.value[0] = "Suggestion";
    cars.value[1] = "Consult";
    cars.value[2] = "Recharge Problem";
    cars.value[3] = "Withdraw Problem";
    cars.value[4] = "Parity Problem";
    cars.value[5] = "Gift Receive Problem";
    cars.value[6] = "Other";
    let loader = ref(false);
    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    }

    const onSubmit = async (values) => {
      axios
        .post("/addcomplaints", {
          type: values.type,
          out_id: values.OutId,
          WhatsApp: values.WhatsApp,
          Description: values.Description,
        })
        .then((response) => {
          if (response.data.success) {
            setErrorMessage(response.data.message);
            loader.value = true;
            setTimeout(function () {
              loader.value = false
              router.push({ path: "/complaints" });
            }, 2000);

          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const final = (value) => {
      main.value = value;
    }

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
      onSubmit,
      router,
      setErrorMessage,
      isErrorShow,
      errorMessage,
      cars,
      final,
      main,
      fainal,
      typemodal,
      loader,


    };
  },
};
</script>
<!-- <style scoped>

@import "../assets/css/add-address.css";
@import "../assets/css/AddComplaints.css";
@import "../assets/css/chunk-vendors.css";

.toast-message {
  min-width: 96px;
  min-height: 0;
  padding: 8px 12px;
  font-size: 14px;
  position: fixed;
}

.input_card {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}

.appContent1 p {
  padding-bottom: 25px;
  margin-bottom: 0;
}
/* 
.van-ellipsis {
  font-size: 13px !important;
} */


</style> -->
