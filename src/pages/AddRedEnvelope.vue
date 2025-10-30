<template>
  <div class="appHeader1">
    <div class="left">
      <a href="#" @click.prevent="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="Go Back" />
      </a>
      <div class="pageTitle">Add Red Envelope</div>
    </div>
  </div>

  <section class="content content-add-red-envelope">
    <Form @submit="onSubmit" method="post" id="Addenvelope" class="card-body" autocomplete="off">
      <!-- Fixed Money Input -->
      <div class="form-group add-border-bottom">
        <label for="Amount">Fixed Money</label>
        <input type="number" v-model="amount" name="Amount" id="Amount" class="form-control" placeholder="Enter Amount"
          required />
        <ErrorMessage name="Amount" />
      </div>

      <!-- Login Password Input -->
      <div class="form-group add-border-bottom">
        <label for="ForgotPasswordVue">Enter Your Login Password</label>
        <input type="password" v-model="password" name="ForgotPasswordVue" id="ForgotPasswordVue" class="form-control"
          placeholder="Enter Password" required />
        <ErrorMessage name="ForgotPasswordVue" />
      </div>

      <!-- Submit Button -->
      <div class="lunch-button">
        <button type="submit" class="btn-lunch">Launch</button>
      </div>
    </Form>

    <!-- Toast for Error Message -->
    <div class="toast-content" v-show="isErrorShow">
      <div class="toast-message">{{ errorMessage }}</div>
    </div>
  </section>

  <!-- Footer Component -->
  <Footer />
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";

export default {
  name: "AddRedEnvelope",
  components: {
    Form,
    ErrorMessage,
    Footer,
  },
  setup() {
    const router = useRouter();
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const amount = ref(""); // For the Fixed Money input
    const password = ref(""); // For the Password input

    // Redirect user to login if not authenticated
    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    }

    // Form submission handler
    const onSubmit = async () => {
      try {
        const response = await axios.post("/add_redenvelope", {
          amount: amount.value,
          password: password.value,
        });

        if (response.data.success) {
          setErrorMessage("Red envelope added successfully!");
          setTimeout(() => {
            router.push({ path: "/redenvelope" });
          }, 2000);
        } else {
          setErrorMessage(response.data.message || "Failed to add red envelope.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    };

    // Error message handler
    const setErrorMessage = (message) => {
      errorMessage.value = message;
      isErrorShow.value = true;
      setTimeout(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };

    return {
      router,
      onSubmit,
      amount,
      password,
      isErrorShow,
      errorMessage,
    };
  },
};
</script>


<!-- <style scoped>

@import "../assets/css/add-redenvelope.css";

</style> -->
