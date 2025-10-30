<template>
  <!-- <link rel="stylesheet" :href="'/css/add-address.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle" style="font-weight: 500">Add Address</div>
    </div>
  </div>

  <div id="appCapsule">
    <Form @submit="onSubmit" method="post" id="AddAddress" class="card-body" autocomplete="off">
      <div class="appContent1 pt-3 pl-5">
        <div class="form-group border-bottom bank-color">
          <label for="name">Full Name</label>
          <Field type="text" v-model="name" :rules="validatename" name="name" id="name" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="name" style="color: red" />
        </div>
        <div class="form-group border-bottom bank-color">
          <label for="ifsc">Mobile Number</label>
          <Field type="text" v-model="Mobile" :rules="validateMobile" name="Mobile" id="mobile" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="Mobile" style="color: red" />
        </div>
        <div class="form-group border-bottom bank-color">
          <label for="bank">Pincode</label>
          <Field type="text" v-model="pincode" :rules="validatepincode" name="pincode" id="pincode" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="pincode" style="color: red" />
        </div>
        <div class="form-group border-bottom bank-color">
          <label for="account">State</label>
          <Field type="text" v-model="state" :rules="validatestate" name="state" id="state" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="state" style="color: red" />
        </div>
        <div class="form-group border-bottom bank-color">
          <label for="">Town/City</label>
          <Field type="text" v-model="city" :rules="validatecity" name="city" id="city" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="city" style="color: red" />
        </div>
        <div class="form-group border-bottom bank-color">
          <label for="">Detail Address</label>
          <Field type="text" v-model="address" :rules="validateaddress" name="address" id="address" onKeyPress=""
            class="form-control" />
          <ErrorMessage name="address" style="color: red" />
        </div>
        <div class="text-center mine_page">
          <button type="submit" id="continue" class="btn-continue ripple">
            Continue
          </button>
        </div>
      </div>
    </Form>
  </div>

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
    <div class="toast-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";
import axios from "axios";

export default {
  name: "addAddress",
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
    // useMeta({ title: "Add Address Page" });
    const router = useRouter();
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    }

    const onSubmit = async (values) => {
      axios
        .post("/addaddress", {
          full_name: values.name,
          mobile_number: values.Mobile,
          pincode: values.pincode,
          state: values.state,
          city: values.city,
          detail_address: values.address,
        })
        .then((response) => {
          if (response.data.success) {
            setErrorMessage(response.data.message);
            setTimeout(function () {
              router.push({ path: "/address" });
            }, 2000);
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };
    return {
      router,
      onSubmit,
      setErrorMessage,
      isErrorShow,
      errorMessage,
    };
  },
};
</script>
<!-- <style scoped>

@import "../assets/css/add-address.css";
</style> -->
