<template>
  <link rel="stylesheet" :href="'/css/register1.css'" />

  <div class="appHeader1 mb-3">
    <div class="left">
      <a href="#" v-on:click="reloadPage" class="icon goBack">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle">Register</div>
    </div>
  </div>

  <div id="appCapsule" class="error-message-text register-page-scroll">
    <div class="appContent1 mb-2">
      <Form @submit="onSubmit" method="post" id="Register" class="card-body" autocomplete="off">
        <div class="login-image" style="text-align: center;">
          <img src="../../src//assets/images/shared image.jpeg" alt="" width="100px" style="margin-bottom: 20px">
        </div>
        <div class="row">
          <div class="col-12">
            <div class="inner-addon left-addon">
              <div class="number-img">
                <img :src="require('../assets/images/mobile-img.png')" v-show="mobileimg === 0 && true"
                  class="gray-phn" />
                <img :src="require('../assets/images/mobile-img-pink.png')" v-show="mobileimg === 1 && true" style=""
                  class="pink-phn" />
                <img :src="require('../assets/images/mobile-img-red.png')" v-show="mobileimg === 2 && true" style=""
                  class="red-phn" />
              </div>
              <!-- <select @change="updateRegMobile" v-model="selectedRegMobile">
                              <option
                                v-for="mobile in regMobileOptions"
                                :key="mobile"
                                :value="mobile"
                                name="selectedRegMobile"
                              >
                                {{ mobile }}
                              </option>
                            </select> -->
              <div class="form-group">
                <!-- <select
                  ref="selectElement"
                  class="form-control m-1 add-select-2-coustom-style"
                  @change="updateRegMobile"
                  v-model="selectedRegMobile"
                  id="selectedRegMobile"
                >
                  <option
                    :value="option.country_code"
                    v-for="(option, index) in regMobileOptions1"
                    :key="index"
                  >
                    {{ option.country_code }}
                  </option>
                </select> -->
                <!-- <span>+91</span> -->
                <Field type="hidden" v-model="selectedRegMobileCode" name="selectedRegMobile" id="selectedRegMobile"
                  class="form-control" placeholder="Mobile Number" />
              </div>
              <!-- <Field style="display: none" value="{{ selectedRegMobile }}" /> -->
              <Field type="text" v-model="regMobile" :rules="validateRegMobile" name="regMobile" id="mobile"
                class="form-control" placeholder="Mobile Number" @focus="mobileimgfun(regMobile); mobileimg = 1"
                @blur="mobileimgfun(regMobile)" />
              <!-- <span>{{ regMobileError }}</span> -->
            </div>
            <ErrorMessage name="regMobile" class="col-md-12 text-danger small verification-text" />
          </div>
          <!-- <div class="col-12">
            <div class="inner-addon left-addon">
              <div class="number-img">
                <img
                  :src="require('../assets/images/email.png')"
                  v-show="emailimg === 0 && true"
                  class="gray-phn"
                />
                <img
                  :src="require('../assets/images/email-pink.png')"
                  v-show="emailimg === 1 && true"
                  style=""
                  class="pink-phn"
                />
                <img
                  :src="require('../assets/images/email-red.png')"
                  v-show="emailimg === 2 && true"
                  style=""
                  class="red-phn"
                />
              </div>

              <Field
                type="email"
                v-model="regEmail"
                :rules="validateEmail"
                name="regEmail"
                id="email"
                onKeyPress=""
                class="form-control"
                placeholder="Enter Email"
                @focus="emailimg = 1"
                @blur="emailimgfun(regEmail)"
              />
               <span>{{ regMobileError }}</span> 
            </div>
            <ErrorMessage
              name="regEmail"
              class="col-md-12 text-danger small verification-text"
            />
          </div> -->
        </div>

        <div class="special_box">
          <div style="width: 70%; position: relative">
            <div class="inner-addon left-addon right-margin">
              <div class="number-img">
                <img :src="require('../assets/images/verifiy.png')" class="gray-verify"
                  v-show="codeimg === 0 && true" />
                <img :src="require('../assets/images/verifiy-pink.png')" class="pink-verify" style=""
                  v-show="codeimg === 1 && true" />
                <img :src="require('../assets/images/verifiy-red.png')" class="red-verify" style=""
                  v-show="codeimg === 2 && true" />
              </div>
              <Field type="text" :rules="validateRegOtp" name="regOtp" id="cd" class="form-control"
                placeholder="Verification Code" maxlength="10" @focus="codeimg = 1" @blur="codeimgfun(regOtp)" />
            </div>
            <ErrorMessage name="regOtp" class="col-md-12 text-danger small verification-text" />
          </div>
          <div style="width: 26%">
            <a v-show="!Disabledbutton" v-on:click="
              selectedRegMobile == '+91' ? sendOtp() : sendOtpEmail(),
              (Disabled = 'Disabled')
              " class="btn-otp" :class="Disabled" id="reg_otp" style="/*cursor: pointer;*/">OTP</a>

            <a v-show="Disabledbutton" class="btn-otp" :class="Disabled" id="reg_otp"
              style="/*cursor: pointer;*/ font-size: 15px">WAIT{{ countDown }}S</a>
          </div>
        </div>
        <input type="hidden" name="email" id="email" class="form-control" value="275978406@gmail.com"
          placeholder="Email-id" />
        <div class="inner-addon left-addon">
          <div class="number-img">
            <img :src="require('../assets/images/key-img.png')" v-show="passwordimg === 0 && true" class="gray-key" />
            <img :src="require('../assets/images/key-img-pink.png')" v-show="passwordimg === 1 && true"
              class="pink-key" />
            <img :src="require('../assets/images/key-img-red.png')" v-show="passwordimg === 2 && true"
              class="red-key" />
          </div>
          <Field type="text" :rules="validateRegPassword" name="regPassword" id="password" class="form-control"
            placeholder="Password" @focus="passwordimg = 1" @blur="passwordimgfun(regPassword)" />
          <ErrorMessage name="regPassword" class="col-md-12 text-danger small password-text" />
        </div>
        <div class="inner-addon left-addon">
          <div class="number-img">
            <img :src="require('../assets/images/recommendation.png')" v-show="refcodeimg === 0 && true"
              class="gray-recommend" />
            <img :src="require('../assets/images/recommendation-pink.png')" v-show="refcodeimg === 1 && true"
              class="pink-recommend" />
          </div>
          <Field type="text" name="regRcode" id="rcode" v-model="regCode" class="form-control"
            placeholder="Recommendation Code" value="" @focus="refcodeimg = 1" @blur="refcodeimg = 0" />
          <ErrorMessage name="regRcode" />
        </div>
        <input type="hidden" name="action" value="register" />
        <div class="">
          <div class="">
            <div class="custom-control custom-checkbox" style="cursor: pointer">
              <Field type="checkbox" :rules="validateRegAgree" name="regAgree" class="custom-control-input"
                v-model="regAgree" :checked="true" id="remember" style="cursor: pointer" />
              <ErrorMessage name="regAgree" />
              <label class="custom-control-label" for="remember" style="color: rgba(0, 0, 0, 0.54); cursor: pointer">I
                agree
                <a data-toggle="modal" v-on:click="(isNoticeModalVisible = true), showModal()"
                  style="cursor: pointer">Privacy Policy</a>
              </label>
              <div></div>
            </div>
          </div>
        </div>
        <!-- <div class="form-group row privacy-policy">
        <div class="col-12 p-0">
          <div class="custom-control custom-checkbox">
            <Field type="checkbox" :rules="validateRegAgree" name="regAgree" class="custom-control-input"
              :checked="true" id="remember" />
            <ErrorMessage name="regAgree" />
            <label class="custom-control-label" for="remember" style="color: rgba(0,0,0,.54);">I agree
              <a data-toggle="modal" v-on:click="isNoticeModalVisible = true">Privacy Policy</a>
            </label>
          </div>
        </div>
      </div> -->

        <div>
          <div class="text-center register-top-btn" v-on:click="qpqp()">
            <button style="cursor: auto !important" type="submit" class="btn btn-register text-white ripple m-0">
              Register
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <div class="privacy-policy-modal">
    <Modal v-model:visible="isNoticeModalVisible" :maskClosable="false" height="auto" width="90%" offsetTop="2%">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Privacy Policy</h5>
      </div>
      <div class="modal-body">
        <div class="main-privacy-policy">
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>
          <h1>Interpretation and Definitions</h1>
          <h2>Interpretation</h2>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions.
          </p>
          <p>
            The following definitions shall have the same meaning regardless of
            whether they appear in singular or in plural.
          </p>
          <h2>Definitions</h2>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <p>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </p>
            </li>
            <li>
              <p>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Agreement) refers to Coem Shop.
              </p>
            </li>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party, where
              &quot;control&quot; means ownership of 50% or more of the shares,
              equity interest or other securities entitled to vote for election
              of directors or other managing authority.
            </li>
            <li>
              <strong>Account</strong> means a unique account created for You to
              access our Service or parts of our Service.
            </li>
            <li>
              <strong>Website</strong> refers to Coem Shop, accessible from
              https://coem.in
            </li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Country</strong> refers to: Uttar Pradesh, India</li>
            <li>
              <p>
                <strong>Service Provider</strong>
                means any natural or legal person who processes the data on
                behalf of the Company. It refers to third-party companies or
                individuals employed by the Company to facilitate the Service,
                to provide the Service on behalf of the Company, to perform
                services related to the Service or to assist the Company in
                analyzing how the Service is used.
              </p>
            </li>
            <li>
              <strong>Third-party Social Media Service</strong>
              refers to any website or any social network website through which
              a User can log in or create an account to use the Service.
            </li>
            <li>
              <p>
                <strong>Personal Data</strong> is any information that relates
                to an identified or identifiable individual.
              </p>
            </li>
            <li>
              <strong>Cookies</strong> are small files that are placed on Your
              computer, mobile device or any other device by a website,
              containing the details of Your browsing history on that website
              among its many uses.
            </li>
            <li>
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </li>
            <li>
              <strong>Usage Data</strong> refers to data collected
              automatically, either generated by the use of the Service or from
              the Service infrastructure itself (for example, the duration of a
              page visit).
            </li>
          </ul>
          <h1>Collecting and Using Your Personal Data</h1>
          <h2>Types of Data Collected</h2>
          <h3>Personal Data</h3>
          <p>
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
          </ul>
          <h3>Usage Data</h3>
          <p>Usage Data is collected automatically when using the Service.</p>
          <p>
            Usage Data may include information such as Your Device&apos;s
            Internet Protocol address (e.g. IP address), browser type, browser
            version, the pages of our Service that You visit, the time and date
            of Your visit, the time spent on those pages, unique device
            identifiers and other diagnostic data.
          </p>
          <p>
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile device
            unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </p>
          <p>
            We may also collect information that Your browser sends whenever You
            visit our Service or when You access the Service by or through a
            mobile device.
          </p>
          <h3>Tracking Technologies and Cookies</h3>
          <p>
            We use Cookies and similar tracking technologies to track the
            activity on Our Service and store certain information. Tracking
            technologies used are beacons, tags, and scripts to collect and
            track information and to improve and analyze Our Service.
          </p>
          <p>
            You can instruct Your browser to refuse all Cookies or to indicate
            when a Cookie is being sent. However, if You do not accept Cookies,
            You may not be able to use some parts of our Service.
          </p>
          <p>
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
            Cookies. Persistent Cookies remain on your personal computer or
            mobile device when You go offline, while Session Cookies are deleted
            as soon as You close your web browser.
          </p>
          <p>
            We use both session and persistent Cookies for the purposes set out
            below:
          </p>
          <ul>
            <li>
              <p>
                <strong>Necessary / Essential Cookies</strong>
              </p>
              <p>Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts. Without these Cookies,
                the services that You have asked for cannot be provided, and We
                only use these Cookies to provide You with those services.
              </p>
            </li>
            <li>
              <p>
                <strong>Cookies Policy / Notice Acceptance Cookies</strong>
              </p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies identify if users have accepted the use
                of cookies on the Website.
              </p>
            </li>
            <li>
              <p>
                <strong>Functionality Cookies</strong>
              </p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies allow us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference. The purpose of these Cookies is to
                provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the
                Website.
              </p>
            </li>
          </ul>
          <p>
            For more information about the cookies we use and your choices
            regarding cookies, please visit our Cookies Policy.
          </p>
          <h2>Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li>
              <strong>To provide and maintain our Service</strong>, including to
              monitor the usage of our Service.
            </li>
            <li>
              <strong>To manage Your Account:</strong>
              to manage Your registration as a user of the Service. The Personal
              Data You provide can give You access to different functionalities
              of the Service that are available to You as a registered user.
            </li>
            <li>
              <strong>For the performance of a contract:</strong>
              the development, compliance and undertaking of the purchase
              contract for the products, items or services You have purchased or
              of any other contract with Us through the Service.
            </li>
            <li>
              <strong>To contact You:</strong> To contact You by email,
              telephone calls, SMS, or other equivalent forms of electronic
              communication, such as a mobile application&apos;s push
              notifications regarding updates or informative communications
              related to the functionalities, products or contracted services,
              including the security updates, when necessary or reasonable for
              their implementation.
            </li>
            <li>
              <strong>To provide You</strong> with news, special offers and
              general information about other goods, services and events which
              we offer that are similar to those that you have already purchased
              or enquired about unless You have opted not to receive such
              information.
            </li>
            <li>
              <strong>To manage Your requests:</strong>
              To attend and manage Your requests to Us.
            </li>
          </ul>
          <p>
            We may share your personal information in the following situations:
          </p>
          <ul>
            <li>
              <strong>With Service Providers:</strong>
              We may share Your personal information with Service Providers to
              monitor and analyze the use of our Service, to contact You.
            </li>
            <li>
              <strong>For Business transfers:</strong>
              We may share or transfer Your personal information in connection
              with, or during negotiations of, any merger, sale of Company
              assets, financing, or acquisition of all or a portion of our
              business to another company.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share Your information
              with Our affiliates, in which case we will require those
              affiliates to honor this Privacy Policy. Affiliates include Our
              parent company and any other subsidiaries, joint venture partners
              or other companies that We control or that are under common
              control with Us.
            </li>
            <li>
              <strong>With Business partners:</strong>
              We may share Your information with Our business partners to offer
              You certain products, services or promotions.
            </li>
            <li>
              <strong>With other users:</strong> when You share personal
              information or otherwise interact in the public areas with other
              users, such information may be viewed by all users and may be
              publicly distributed outside. If You interact with other users or
              register through a Third-Party Social Media Service, Your contacts
              on the Third-Party Social Media Service may see You name, profile,
              pictures and description of Your activity. Similarly, other users
              will be able to view descriptions of Your activity, communicate
              with You and view Your profile.
            </li>
          </ul>
          <h2>Retention of Your Personal Data</h2>
          <p>
            The Company will retain Your Personal Data only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use Your Personal Data to the extent necessary to comply
            with our legal obligations (for example, if we are required to
            retain your data to comply with applicable laws), resolve disputes,
            and enforce our legal agreements and policies.
          </p>
          <p>
            The Company will also retain Usage Data for internal analysis
            purposes. Usage Data is generally retained for a shorter period of
            time, except when this data is used to strengthen the security or to
            improve the functionality of Our Service, or We are legally
            obligated to retain this data for longer time periods.
          </p>
          <h2>Transfer of Your Personal Data</h2>
          <p>
            Your information, including Personal Data, is processed at the
            Company&apos;s operating offices and in any other places where the
            parties involved in the processing are located. It means that this
            information may be transferred to &mdash; and maintained on &mdash;
            computers located outside of Your state, province, country or other
            governmental jurisdiction where the data protection laws may differ
            than those from Your jurisdiction.
          </p>
          <p>
            Your consent to this Privacy Policy followed by Your submission of
            such information represents Your agreement to that transfer.
          </p>
          <p>
            The Company will take all steps reasonably necessary to ensure that
            Your data is treated securely and in accordance with this Privacy
            Policy and no transfer of Your Personal Data will take place to an
            organization or a country unless there are adequate controls in
            place including the security of Your data and other personal
            information.
          </p>
          <h2>Disclosure of Your Personal Data</h2>
          <h3>Business Transactions</h3>
          <p>
            If the Company is involved in a merger, acquisition or asset sale,
            Your Personal Data may be transferred. We will provide notice before
            Your Personal Data is transferred and becomes subject to a different
            Privacy Policy.
          </p>
          <h3>Law enforcement</h3>
          <p>
            Under certain circumstances, the Company may be required to disclose
            Your Personal Data if required to do so by law or in response to
            valid requests by public authorities (e.g. a court or a government
            agency).
          </p>
          <h3>Other legal requirements</h3>
          <p>
            The Company may disclose Your Personal Data in the good faith belief
            that such action is necessary to:
          </p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>
              Prevent or investigate possible wrongdoing in connection with the
              Service
            </li>
            <li>
              Protect the personal safety of Users of the Service or the public
            </li>
            <li>Protect against legal liability</li>
          </ul>
          <h2>Security of Your Personal Data</h2>
          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>
          <h1>Children&apos;s Privacy</h1>
          <p>
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data
            from anyone under the age of 13 without verification of parental
            consent, We take steps to remove that information from Our servers.
          </p>
          <p>
            If We need to rely on consent as a legal basis for processing Your
            information and Your country requires consent from a parent, We may
            require Your parent&apos;s consent before We collect and use that
            information.
          </p>
          <h1>Links to Other Websites</h1>
          <p>
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party&apos;s site. We strongly advise You to
            review the Privacy Policy of every site You visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>
          <h1>Changes to this Privacy Policy</h1>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the
            &quot;Last updated&quot; date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
          <h1>Contact Us</h1>
          <p>
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <ul>
            <li>
              By visiting this page on our website: https://coem.in/#/suggestion
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-comman btn-close active" data-dismiss="modal"
          v-on:click="(isNoticeModalVisible = false), hideModal()">
          Close
        </button>
      </div>
    </Modal>
  </div>

  <Footer />

  <div id="registerthanksPopup" class="modal fade" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center">
            <h5>Thank you !</h5>
            <h6>Your account has been created successfully....</h6>
            <div class="text-center">
              <button type="button" class="btn btn-sm btn-primary" onClick="window.location='';">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="registertoast" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="text-center" id="regtoast"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="
        top: 50% !important;
        font-size: 14px;
        min-width: 120px;
        padding: 7px 12px;
        text-align: center;
        margin: 0 auto;
        position: fixed;
      ">
      {{ errorMessage }}
    </div>
  </div>

  <!-- loader -->
  <Loader :isShow="loader" />
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";
import { Modal } from "usemodal-vue3";
import $ from "jquery"; // Import jQuery
import "select2/dist/css/select2.min.css";
import "select2";
import Loader from "../components/UserLoader.vue"

export default {
  name: "UserRegister",
  components: {
    Modal,
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
    // useMeta({ title: "Register Page" });
    var formValidation = false;
    const router = useRouter();
    const regMobile = ref("");
    const regEmail = ref("");
    const regMobileError = ref("");
    const regCode = ref("");
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const Disabled = ref("");
    const Disabledbutton = ref(false);
    const countDown = ref(0);
    let isNoticeModalVisible = ref(false);
    const mobileimg = ref(0);
    const emailimg = ref(0);
    const codeimg = ref(0);
    const passwordimg = ref(0);
    const refcodeimg = ref(0);
    let loader = ref(false);
    var selectedRegMobile = ref("+91");
    let regMobileOptions1 = ref([]);
    const selectElement = ref(null);

    onMounted(() => {
      $(selectElement.value).select2();

      $(selectElement.value).on("change", (event) => {
        selectedRegMobile.value = event.target.value;
      });
    });
    onMounted(() => {
      $(selectElement.value).select2();
    });

    // console.log($("#selectedRegMobile").val() + "testst");
    const mobileimgfun = async (value) => {
      if (!value) {
        regMobile.value = "+91";
        mobileimg.value = 2;
        formValidation = false;
      } else {
        mobileimg.value = 0;
      }
    };

    const emailimgfun = async (value) => {
      if (!value) {
        emailimg.value = 2;
        formValidation = false;
      } else {
        emailimg.value = 0;
      }
    };

    const codeimgfun = async (value) => {
      if (!value) {
        codeimg.value = 2;
        formValidation = false;
      } else {
        codeimg.value = 0;
      }
    };

    const passwordimgfun = async (value) => {
      if (!value) {
        passwordimg.value = 2;
        formValidation = false;
      } else {
        passwordimg.value = 0;
      }
    };

    const validateRegMobile = async (value) => {
      if (!value) {
        if (formValidation) {
          if (mobileimg.value == "2") {
            formValidation = false;
            setErrorMessage("Mobile number is required.");
            return "Mobile number is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Mobile number is required";
        }
      }
      return true;
    };
    const selectedRegMobileCode = async (value) => {
      if (!value) {
        if (formValidation) {
          if (selectedRegMobile.value == "2") {
            formValidation = false;
            setErrorMessage("Contry Code is required.");
            return "Contry Code is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Contry Code is required";
        }
      }
      return true;
    };
    // const validateEmail = async (value) => {
    //   if (!value) {
    //     if (formValidation) {
    //       if (emailimg.value == "2") {
    //         formValidation = false;
    //         setErrorMessage("Email is required.");
    //         return "Email is required";
    //       } else {
    //         return true;
    //       }
    //     } else {
    //       formValidation = false;
    //       return "Email is required";
    //     }
    //   }
    //   return true;
    // };
    const validateRegPassword = async (value) => {
      if (!value) {
        if (formValidation) {
          if (passwordimg.value == "2") {
            formValidation = false;
            setErrorMessage("New password is required.");
            return "New password is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "New password is required";
        }
      }
      return true;
    };

    const validateRegOtp = async (value) => {
      if (!value) {
        if (formValidation) {
          if (codeimg.value == "2") {
            formValidation = false;
            setErrorMessage("Verification Code is required.");
            return "Verification Code is required";
          } else {
            return true;
          }
        } else {
          formValidation = false;
          return "Verification Code is required";
        }
      }
      return true;
    };

    const qpqp = async () => {
      formValidation = true;
    };

    if (localStorage.getItem("authToken")) {
      router.push({ path: "/mine" });
    }

    const sendOtpEmail = async () => {
      regMobileError.value = "";
      axios
        .post("/send-otp-email", {
          mobile_number: regMobile.value,
          email: regEmail.value,
        })
        .then((response) => {
          // setErrorMessage(response.data.message);
          if (response.data.success) {
            setErrorMessage(response.data.message);
            Disabled.value = "Disabled";
            countDown.value = 179;
            setInterval(function () {
              countDownTimer();
            }, 1000);
            Disabledbutton.value = true;
          } else {
            Disabled.value = "";
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const sendOtp = async () => {
      Disabled.value = "Disabled";
      regMobileError.value = "";
      let normalizedMobile = regMobile.value.trim();
      if (normalizedMobile.startsWith('+91')) {
        normalizedMobile = normalizedMobile.substring(3).trim();
      }
      axios
        .post("/send-otp", {
          mobile_number: normalizedMobile,
          email: regEmail.value,
        })
        .then((response) => {
          // setErrorMessage(response.data.message);
          if (response.data.success) {
            setErrorMessage('success');
            countDown.value = 179;
            setInterval(function () {
              countDownTimer();
            }, 1000);
            Disabledbutton.value = true;
          } else {
            Disabled.value = "";
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const countDownTimer = () => {
      countDown.value--;
      if (countDown.value === 0) {
        Disabled.value = "";
        countDown.value = 0;
        Disabledbutton.value = false;
      }
    };

    const onSubmit = async (values) => {
      console.log(values.regAgree);
      let normalizedMobile = values.regMobile.trim();
      if (normalizedMobile.startsWith('+91')) {
        normalizedMobile = normalizedMobile.substring(3).trim();
      }
      axios
        .post("/register", {
          mobile_number: normalizedMobile,
          email: values.regEmail,
          selectedRegMobile: selectedRegMobile.value
            ? selectedRegMobile.value
            : "+91",
          otp: values.regOtp,
          password: values.regPassword,
          ref_code: values.regRcode,
          agree: values.regAgree === "on" ? " " : "on",
        })
        .then((response) => {
          if (response.data.status === "success") {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
              router.push({ path: "/login" });
            }, 2000);
          } else {
            // alert(response.data.message);
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    var url = $(location).attr("href");
    let paramString = url.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      if (pair[0] == "r_code") {
        regCode.value = pair[1];
      }
    }
    // const kkk = async () => {
    //     if (regMobile.value === '') {
    //     regMobile.value = '+91';
    // }
    //     mobileimg.value = 1;
    // };
    const fetchCountryCode = () => {
      axios
        .get("/get-country-code")
        .then((response) => {
          regMobileOptions1.value = response.data.data;
          onMounted(() => {
            $("#selectedRegMobile").select2();
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCountryCode();

    const updateRegMobile = (event) => {
      selectedRegMobile.value = event.target.value;
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


    const reloadPage = () => {
      router.go(-1);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }

    return {
      // regMobileOptions: ["+91", "+1", "+92"], // Define your regMobile options
      selectedRegMobile,
      mobileimg: 1,
      emailimg: 1,
      showModal,
      hideModal,
      router,
      regMobile,
      regEmail,
      regMobileError,
      onSubmit,
      sendOtpEmail,
      sendOtp,
      regCode,
      setErrorMessage,
      // validateEmail,
      isErrorShow,
      errorMessage,
      // kkk,
      Disabled,
      Disabledbutton,
      countDown,
      isNoticeModalVisible,
      validateRegMobile,
      validateRegOtp,
      validateRegPassword,
      passwordimgfun,
      codeimgfun,
      mobileimgfun,
      emailimgfun,
      refcodeimg,
      passwordimg,
      codeimg,
      qpqp,
      loader,
      updateRegMobile,
      selectedRegMobileCode,
      fetchCountryCode,
      regMobileOptions1,
      selectElement,
      reloadPage
    };
  },
};
</script>

<style scoped>
/* @import "../assets/css/register.css"; */
@font-face {
  font-family: "password";
  font-style: normal;
  src: url(https://jsbin-user-assets.s3.amazonaws.com/rafaelcastrocouto/password.ttf);
}

input#password {
  font-family: "password";
}

input#password::-webkit-input-placeholder {
  font-family: "myFont", Arial, Helvetica, sans-serif;
}
</style>
