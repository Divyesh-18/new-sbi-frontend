import "./bootstrap";
// import '../js/bootstrap';
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

// axios.defaults.baseURL = 'http://localhost:8001/api/';
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL + '/api/';

// axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
axios.defaults.headers["x-access-token"] = ` ${localStorage.getItem("authToken")}`;
axios.interceptors.response.use(
    (response) => {
        if (response?.data?.message == "Invalid Token") {
            console.log('test');
            localStorage.removeItem("authToken");
            localStorage.removeItem("user-info");
            router.push({ path: "/login" });

        }
        return response;
    },
    (error) => {
        // console.log('>>>', error);
        // if (error.response?.data?.message == "Invalid Token") {
        //     console.log('test');
        //     localStorage.removeItem("authToken");
        //     localStorage.removeItem("user-info");
        //     router.push({ path: "/login" });

        // }

        return Promise.reject(error);
    }
);
// createApp(App).mount('#app')
const app = createApp(App).use(router);
router.isReady();
app.mount("#app");
