<template>
  <div class="main-body">
    <div class="login-box">
      <div class="login-logo">
        Adminsuit Login
      </div>
      <div class="login-box-body">
        <p class="login-box-msg mb-0">Sign in to start your session</p>

        <!-- Form with Validation Feedback -->
        <form @submit.prevent="submitForm">
          <div class="form-group has-feedback">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              name="admin_id"
              v-model="username"
              autocomplete="off"
              autocapitalize="none"
              autocorrect="off"
              :class="{'is-invalid': errors.username}"
            />
            <span
              class="glyphicon glyphicon-user form-control-feedback bi bi-person-fill"
            ></span>
            <div v-if="errors.username" class="invalid-feedback">
              {{ errors.username }}
            </div>
          </div>

          <div class="form-group has-feedback">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              name="password_admin"
              v-model="password"
              autocomplete="new-password"
              autocapitalize="none"
              autocorrect="off"
              :class="{'is-invalid': errors.password}"
            />
            <input type="hidden" name="login" value="login" />
            <!-- <span
              class="glyphicon glyphicon-lock form-control-feedback fa fa-lock"
            ></span> -->
            <i class="fa fa-lock form-control-feedback"></i>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>

          <div class="row">
            <div class="col-8">
              <!-- Optional Remember Me or Checkbox -->
              <div class="checkbox-login icheck-login"></div>
            </div>
            <div class="col-4">
              <button type="submit" class="Adminlogin-btn m-0">Sign In</button>
            </div>
          </div>

          <!-- Display Error Message when credentials are wrong -->
          <div v-if="errorMessage" class="alert mt-3" role="alert">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {
        username: "",
        password: ""
      },
      errorMessage: "", // Store error message for incorrect credentials
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        username: "",
        password: ""
      };

      // Validate username (example: cannot be empty)
      if (!this.username) {
        this.errors.username = "Username is required.";
        isValid = false;
      }

      // Validate password (example: cannot be empty)
      if (!this.password) {
        this.errors.password = "Password is required.";
        isValid = false;
      }

      return isValid;
    },

    async submitForm() {
      // Reset error message when submitting
      this.errorMessage = "";

      // First, validate the form
      if (!this.validateForm()) {
        return; // If validation fails, don't submit the form
      }

      try {
        const result = await axios.post(`/adminlogin`, {
          name: this.username,
          password: this.password,
        });

        if (result && result.data && result.data.success) {
          // Store the token and navigate to Admin Dashboard
          localStorage.setItem("user-info", JSON.stringify(result.data.token));
          this.$router.push({ name: "AdminDesktop" });
        } else {
          // Set error message when credentials are incorrect
          this.errorMessage = "Check your username or password.";
        }
      } catch (error) {
        // Handle other errors (e.g., network error)
        this.errorMessage = "Check your username or password";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.main-body {             
  justify-content: center;     
  align-items: center;         
  height: 100vh;                
  background-color: #d2d6de;   
  margin: 0;
}

.login-box {
  width: 360px;
  margin: 0 auto;
  /* padding: 20px; */
  box-shadow: 0 4px 40px -8px rgba(0, 0, 0, 0.2), 0 2px 2 0 rgba(0, 0, 0, 0.14);
}

.login-logo {
    font-size: 35px;
    text-align: center;
    margin-bottom: 25px;
    font-style: normal;
    font-weight: lighter;
    color: black;
    padding-top: 40px;
}

.login-box-body {
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
}

.login-box-msg {
  margin: 0;
  text-align: center;
  padding: 0 20px 20px 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #ccc;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.form-control:focus {
  border-color: #3c8dbc;
}

.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  pointer-events: none;
  font-size: 20px;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.Adminlogin-btn {
  width: 95%;
  background-color: #3c8dbc;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.Adminlogin-btn:hover {
  background-color: #007bb5;
}

.alert {
  color: red;
  position: fixed;
  left: 40%;
  top: 8%;
}

@media only screen and (max-width: 400px) {
  .login-box {
    width: 275px;
  }
}
</style>
