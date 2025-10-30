<template>
    <link rel="stylesheet" :href="'/css/add-bank-detail.css'" />

    <div class="appHeader1">
        <div class="left">
            <a href="#" v-on:click="router.go(-1)" class="icon goBack">
                <img :src="require('../assets/images/left.png')" alt="" />

            </a>
            <div class="pageTitle">Add Bank Card</div>
        </div>
    </div>

    <div id="appCapsule">
        <div class="appContent1" style="padding-top: 24px;">
            <Form @submit="onSubmit" method="post" id="backdetail" autocomplete="off">
                <div class="form-group add-border-bottom bank-color">
                    <label for="name">Actual Name</label>
                    <Field type="text" :value="name1" v-model="name1" :rules="validatename" name="name" id="name"
                        onKeyPress="" class="form-control" />
                    <ErrorMessage name="name" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="ifsc">IFSC Code</label>
                    <Field type="text" :value="ifsc" v-model="ifsc" :rules="validateifsc" name="ifsc" id="ifsc"
                        onKeyPress="" class="form-control" />
                    <ErrorMessage name="ifsc" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="bank">Bank Name</label>
                    <Field type="text" v-model="bank" :value="bank" :rules="validatebank" name="bank" id="bank"
                        onKeyPress="" class="form-control" />
                    <ErrorMessage name="bank" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="account">Bank Account</label>
                    <Field type="text" v-model="account" :value="account" :rules="validateaccount" name="account"
                        id="account" onKeyPress="" class="form-control" />
                    <ErrorMessage name="account" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="">State/Territory</label>
                    <Field type="text" v-model="state" :value="state" :rules="validatestate" name="state" id="state"
                        onKeyPress="" class="form-control" />
                    <ErrorMessage name="state" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="">City</label>
                    <Field type="text" v-model="city" :value="city" :rules="validatecity" name="city" id="city"
                        onKeyPress="" class="form-control" />
                    <ErrorMessage name="city" />
                </div>
                <div class="form-group add-border-bottom bank-color">
                    <label for="">Address</label>
                    <Field type="text" v-model="address" :value="address" :rules="validateaddress" name="address"
                        id="address" onKeyPress="" class="form-control" />
                    <ErrorMessage name="address" />
                </div>

                <div class="form-group add-border-bottom bank-color">
                    <label for="">Mobile Number</label>
                    <Field type="text" :value="mobile" v-model="mobile" :rules="validatemobile" name="mobile"
                        id="mobile" class="form-control" @click="kkk" />
                    <ErrorMessage name="mobile" />
                </div>
                <!-- <div class="form-group add-border-bottom bank-color">
                    <label for="">Email</label>
                    <Field type="email" v-model="email" :value="email" :rules="validateemail" name="email" id="email"
                        onKeyPress="" class="form-control" disabled />
                    <ErrorMessage name="email" />
                </div> -->
                <div class="form-group add-border-bottom bank-color">
                    <label for="">Account phone number</label>
                    <Field type="text" :value="vmobile" v-model="vmobile" :rules="validatevmobile" name="vmobile"
                        id="vmobile" onKeyPress="" class="form-control" disabled />
                    <ErrorMessage name="vmobile" />
                </div>
                <div class="form-group add-border-bottom d-flex w-100 bank-color">
                    <div class="otp-width">
                        <label for="">Code</label>
                        <Field type="number" v-model="iotp" :rules="validateRegOtp" name="iotp" id="iotp" onKeyPress=""
                            class="form-control" placeholder="Verification Code" />
                        <ErrorMessage name="iotp" />
                    </div>
                    <div>
                        <button v-show="!Disabledbutton" type="button" @click="onOtp()" data-mobile_number="{{vmobile}}"
                            class="otp-addbanck-details" :class="Disabled" id="btnotp">
                            OTP
                        </button>
                        <button v-show="Disabledbutton" type="button" data-mobile_number="{{vmobile}}" class="gocode"
                            style="font-size: 15px;" :class="Disabled" id="btnotp">
                            WAIT{{ countDown }}S
                        </button>
                    </div>
                </div>
                <div class="text-center mine_page">
                    <button type="submit" id="continue" class="btn-continue ripple">
                        Continue
                    </button>
                </div>
            </Form>
        </div>
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
        <div class="toast-message"
            style="top: 50% !important;font-size: 14px;min-width: 120px;padding: 7px 12px;text-align: center;margin: 0 auto; position: fixed;">
            {{ errorMessage }}</div>
    </div>


    <!-- loader -->
    <div class="loading" v-show="loader">
        <div class="v-dialog v-dialog--persistent" style="width: 300px; display: block;">
            <div class="v-card v-sheet theme--dark teal">
                <div class="v-card__text"><span>Loading</span>
                    <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="v-progress-linear mb-0"
                        style="height: 7px;">
                        <div class="v-progress-linear__background white"
                            style="height: 7px; opacity: 0.3; width: 100%;">
                        </div>
                        <div class="v-progress-linear__bar">
                            <div
                                class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                                <div class="v-progress-linear__bar__indeterminate long white"></div>
                                <div class="v-progress-linear__bar__indeterminate short white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";


export default {
    name: "AddBank",
    data: function () {
        return {
            vmobile: "",
            name1: "",
            ifsc: "",
            bank: "",
            account: "",
            state: "",
            city: "",
            submiturl: "/new-add-bank-betail",
            address: "",
            email: "",
            mobile: '',
            iotp: '',
            otp: '',
            editid: 0,
            router: useRouter(),
            isErrorShow: false,
            errorMessage: "",
            Disabled: ref(""),
            Disabledbutton: ref(false),
            countDown: ref(0),
            loader: ref(false),
            code: ref('+91'),

        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        Footer,
    },
    props: {
        toggleLoader: { type: Function },
    },
    methods: {
        getMineDashbordData() {
            if (this.router.currentRoute.query.goodsId) {
                this.editid = this.router.currentRoute.query.goodsId;
                this.submiturl = '/add-bank-betail';
                axios.post("/getsingal-bank-betail", {
                    id: this.router.currentRoute.query.goodsId,
                })
                    .then((response) => {
                        if (response.data.success === true) {
                            this.name1 = response.data.data.name;
                            this.email = response.data.data.email;
                            this.address = response.data.data.address;
                            this.city = response.data.data.city;
                            this.state = response.data.data.state;
                            this.account = response.data.data.account;
                            this.bank = response.data.data.bankname;
                            this.ifsc = response.data.data.ifsc;
                            this.mobile = response.data.data.mobile;
                        } else {
                            // alert(response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            axios.get("/mine-dashbord", {})
                .then((response) => {
                    if (response.data.success === true) {
                        this.vmobile = response.data.data.mobile;
                        this.email = response.data.data.email;
                        this.code = response.data.data.country_code;
                    } else {
                        // alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // kkk() {
        //     if (this.mobile === '') {
        //         this.mobile = '+91';
        //     }
        // },
        onOtp() {
            this.Disabled = "Disabled";
            if (this.code == "+91") {
                axios
                    .post("/send-otp", {
                        mobile_number: this.vmobile,
                        email: this.email,
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.setErrorMessage('success');
                            // this.setErrorMessage(response.data.message);
                            this.Disabled = "Disabled";
                            this.countDown = 60;
                            this.Disabledbutton = true;
                            setInterval(() => {
                                this.countDownTimer();
                            }, 1000);
                        } else {
                            this.Disabled = "";
                            this.setErrorMessage(response.data.message);

                        }
                    })
                    .catch((error) => {
                        console.log(error.data.error);
                    });
            } else {
                axios
                    .post("/send-otp-email", {
                        mobile_number: this.vmobile,
                        email: this.email,
                    })
                    .then((response) => {
                        if (response.data.success) {
                            // this.setErrorMessage(response.data.message);
                            this.setErrorMessage('success');
                            this.Disabled = "Disabled";
                            this.countDown = 60;
                            this.Disabledbutton = true;
                            setInterval(() => {
                                this.countDownTimer();
                            }, 1000);
                        } else {
                            this.Disabled = "";
                            this.setErrorMessage(response.data.message);

                        }
                    })
                    .catch((error) => {
                        console.log(error.data.error);
                    });
            }
        },
        validateRegOtp(value) {
            if (!value) {

                return "Verification Code is required";
            }
            return true;
        },
        onSubmit(values) {
            axios
                .post(this.submiturl, {
                    edit_id: this.editid,
                    name: values.name,
                    ifsc_code: values.ifsc,
                    bank_code: values.bank,
                    bank_account: values.account,
                    state: values.state,
                    city: values.city,
                    address: values.address,
                    email: values.email,
                    otp: values.iotp,
                    mobile_number: this.vmobile
                })
                .then((response) => {
                    if (response.data.success) {

                        this.setErrorMessage(response.data.message);
                        this.loader = true;
                        setTimeout(() => {
                            this.loader = false;
                            this.router.push({ path: "/bankcard" });
                        }, 2000);
                    } else {
                        this.setErrorMessage(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error.data.error);
                });
        },
        setErrorMessage(values) {
            this.errorMessage = values;
            this.isErrorShow = true;
            setInterval(() => {
                this.errorMessage = "";
                this.isErrorShow = false;
            }, 5000);
        },
        countDownTimer() {
            this.countDown--;
            if (this.countDown === 0) {
                this.Disabled = "";
                this.countDown = 0;
                this.Disabledbutton = false;
            }
        },
    },
    mounted() {
        if (!localStorage.getItem("authToken")) {
            this.router.push({ path: "/login" });
        } else {
            this.getMineDashbordData();
        }

    },
};
</script>
<!-- <style scoped>
@import "../assets/css/add-bank-detail.css";

.form-group span {
    font-size: 12px !important;
    color: red;
    position: absolute;
    z-index: 2;
    transition: all .3s;
}


</style> -->
