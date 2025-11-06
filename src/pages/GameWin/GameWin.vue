<template>
  <!-- <link rel="stylesheet" :href="'/css/Win.css'" />
  <link rel="stylesheet" :href="'/css/pagination.css'" />
  <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <link rel="stylesheet" :href="'/css/Win1.css'" />

  <div class="win">
    <MineComponent :mineDashbordData="mineDashbordData" :isOneMinuteGame="isOneMinuteGame" />

    <div class="main">
      <ul class="main_nav">
        <li class="active" v-on:click="router.go(0)">Parity</li>
      </ul>
      <div class="btn-r display-mobile-view">
        <button class="one_btn btn" :class="{ active: isOneMinuteGame == 0 }" @click="selectTime('30Sec')">
          Fast Win Game
        </button>
        <button class="one_btn btn" :class="{ active: isOneMinuteGame == 1}" @click="selectTime('1min')">
         WinGo 1 Minute Game
        </button>
        <button class="one_btn btn" :class="{ active: isOneMinuteGame == 2 }" @click="selectTime('3min')">
         WinGo 3 Minute Game
        </button>
      </div>
      <!-- <JoinBets :gameid="gameid" :countDownMinute="countDownMinute" :countDownSecond="countDownSecond"
        :countcontinue="countcontinue" :continueClass="continueClass" :Disabled="Disabled" :betbutton="betbutton" />
      <div class="nav_content mine_page">
        <EmerdRecordList :getResultbyCategoryList="getResultbyCategoryList"
          :getResultbyCategoryPage="getResultbyCategoryPage" :getResultbyCategoryPageRow="getResultbyCategoryPageRow"
          :totalgetResultbyCategory="totalgetResultbyCategory" :handlegetResultbyCategoryPageChange="handlegetResultbyCategoryPageChange
            " />

        <MyOrderList :userwaitlist="userwaitlist" :userresultList="userresultList"
          :iswaitCollapseOpen="iswaitCollapseOpen" :isResultCollapseOpen="isResultCollapseOpen"
          :userresultsPage="userresultsPage" :userresultsPageRow="userresultsPageRow"
          :totaluserresults="totaluserresults" :handleuserresultsPageChange="handleuserresultsPageChange"
          :myrecordmsg="myrecordmsg" @update:iswaitCollapseOpen="updateWaitCollapse"
          @update:isResultCollapseOpen="updateResultCollapse" /> -->
      <div v-if="isOneMinuteGame == 0">
        <fastWinJoinBet :fastgameid="fastgameid" :fastWinCountDownMinute="fastWinCountDownMinute"
          :fastWinCountDownSecond="fastWinCountDownSecond" :fastWinCountcontinue="fastWinCountcontinue"
          :fastWinContinueClass="fastWinContinueClass" :fastWinDisabled="fastWinDisabled" :betbutton="betbutton" />
          
        <fastWinEmerdRecordList :fastWinResultCategoryList="fastWinResultCategoryList" :fastWinPage="fastWinPage"
          :fastWinPageRow="fastWinPageRow" :fastWinTotalResult="fastWinTotalResult"
          :fastWinPageChange="fastWinPageChange" />

        <fastWinOrderList :fastWinUserWaitList="fastWinUserWaitList" :fastWinUserResultList="fastWinUserResultList"
          :iswaitCollapseOpen="iswaitCollapseOpen" :isResultCollapseOpen="isResultCollapseOpen"
          :fastWinUserPage="fastWinUserPage" :fastWinUserPageRow="fastWinUserPageRow"
          :fastWinUserTotal="fastWinUserTotal" :fastWinUserPageChange="fastWinUserPageChange"
          :fastWinRecordmsg="fastWinRecordmsg" @update:iswaitCollapseOpen="updateWaitCollapse"
          @update:isResultCollapseOpen="updateResultCollapse" />
      </div>
      <div v-else-if="isOneMinuteGame==1">
        <oneMinJoinBet :oneMinGameId="oneMinGameId" :oneMinCountDownMinute="oneMinCountDownMinute"
          :oneMinCountDownSecond="oneMinCountDownSecond" :oneMinCountcontinue="oneMinCountcontinue"
          :oneMinContinueClass="oneMinContinueClass" :oneMinDisabled="oneMinDisabled" :betbutton="betbutton" />

        <oneMinEmerdRecordList :oneMinResultCategoryList="oneMinResultCategoryList" :oneMinPage="oneMinPage"
          :oneMinPageRow="oneMinPageRow" :oneMinTotalResult="oneMinTotalResult" :oneMinPageChange="oneMinPageChange" />

        <oneMinOrderList :oneMinUserWaitList="oneMinUserWaitList" :oneMinUserResultList="oneMinUserResultList"
          :iswaitCollapseOpen="iswaitCollapseOpen" :isResultCollapseOpen="isResultCollapseOpen"
          :oneMinUserPage="oneMinUserPage" :oneMinUserPageRow="oneMinUserPageRow" :oneMinUserTotal="oneMinUserTotal"
          :oneMinUserPageChange="oneMinUserPageChange" :oneMinRecordmsg="oneMinRecordmsg"
          @update:iswaitCollapseOpen="updateWaitCollapse" @update:isResultCollapseOpen="updateResultCollapse" />
      </div>

      <div v-else-if="isOneMinuteGame == 2">
        <JoinBets :gameid="gameid" :countDownMinute="countDownMinute" :countDownSecond="countDownSecond"
          :countcontinue="countcontinue" :continueClass="continueClass" :Disabled="Disabled" :betbutton="betbutton" />
        <EmerdRecordList :getResultbyCategoryList="getResultbyCategoryList"
          :getResultbyCategoryPage="getResultbyCategoryPage" :getResultbyCategoryPageRow="getResultbyCategoryPageRow"
          :totalgetResultbyCategory="totalgetResultbyCategory"
          :handlegetResultbyCategoryPageChange="handlegetResultbyCategoryPageChange" />
        <MyOrderList :userwaitlist="userwaitlist" :userresultList="userresultList"
          :iswaitCollapseOpen="iswaitCollapseOpen" :isResultCollapseOpen="isResultCollapseOpen"
          :userresultsPage="userresultsPage" :userresultsPageRow="userresultsPageRow"
          :totaluserresults="totaluserresults" :handleuserresultsPageChange="handleuserresultsPageChange"
          :myrecordmsg="myrecordmsg" @update:iswaitCollapseOpen="updateWaitCollapse"
          @update:isResultCollapseOpen="updateResultCollapse" />
        <!-- </div> -->
      </div>
    </div>
  </div>

  <div class="all-violet-modal">
    <Modal v-model:visible="isContractModalVisible" height="auto" width="80%" :maskClosable="false" offsetTop="23%">
      <div :class="`modal-header ${batecolor}`">
        <h4 class="modal-title" id="chn">{{ batevalue }}</h4>
      </div>
      <div v-if="isOneMinuteGame == 1">
        <Form action="#" @submit="oneMinBateSubmit" method="post" id="bettingForm" autocomplete="off">
          <div class="modal-body" id="loadform">
            <div class="row">
              <div class="col-12">
                <p class="contract-money">Contract Money</p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <!-- <label v-on:click="levelTab = 5" :class="levelTab === 5
                  ? 'btn btn-secondary active'
                  : 'btn btn-secondary'
                  ">
                  <input type="radio" name="contract" id="hoursofoperation" value="1" :class="levelTab === 5
                    ? 'contract checked'
                    : 'contract'
                    " v-on:click="moneycount" />
                  1
                </label> -->
                  <label v-on:click="levelTab = 6" :class="levelTab === 6
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="5"
                      :class="levelTab === 6 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10
                  </label>
                  <!-- <label
                  v-on:click="levelTab = 1"
                  :class="
                    levelTab === 1 ? 'btn btn-secondary active' : 'btn btn-secondary'
                  "
                >
                  <input
                    type="radio"
                    name="contract"
                    id="hoursofoperation"
                    value="10"
                    :class="levelTab === 1 ? 'contract checked' : 'contract'"
                    v-on:click="moneycount"
                  />
                  10
                </label> -->
                  <label v-on:click="levelTab = 2" :class="levelTab === 2
                    ? 'btn btn-secondary active'
                    : 'btn  money-counter'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="100"
                      :class="levelTab === 2 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    100
                  </label>
                  <label v-on:click="levelTab = 3" :class="levelTab === 3
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="1000"
                      :class="levelTab === 3 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    1000
                  </label>
                  <label v-on:click="levelTab = 4" :class="levelTab === 4
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="10000"
                      :class="levelTab === 4 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10000
                  </label>
                </div>
                <Field type="hidden" v-model="contractmoney" value="10" :rules="validatename" name="contractmoney"
                  id="contractmoney" onKeyPress="" />
                <p class="contract-money">Number</p>
                <div class="def-number-input number-input safari_only">
                  <button type="button" v-on:click="stepDown" class="minus"></button>
                  <input class="quantity" min="1" name="amount" id="amount" :value="amount" type="number" />
                  <button type="button" v-on:click="stepUp" class="plus"></button>
                </div>
                <Field type="hidden" :value="type1" v-model="type1" name="type" id="type" class="form-control" />
                <Field type="hidden" :value="value1" v-model="value1" name="value" id="value" class="form-control" />
                <Field type="hidden" name="counter" id="counter" class="form-control" />
                <Field type="hidden" :value="oneMinGameId" v-model="oneMinGameId" name="inputgameid" id="inputgameid"
                  class="form-control" />
                <div class="contract-money">
                  Total contract money is
                  <span id="showamount" style="font-size: 14px;">{{ totalamount }}</span>
                </div>
                <Field type="hidden" :value="totalamount" v-model="totalamount" name="finalamount" id="finalamount"
                  class="form-control" />
                <!-- <div class="custom-control custom-checkbox">
                    <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                    <label class="custom-control-label text-muted" for="presalerule"
                      v-on:click="isContractModalVisible = false">I agree <a data-toggle="modal" data-backdrop="static"
                        v-on:click="isNoticeModalVisible = true">PRESALE RULE</a></label>
                  </div> -->
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                  <label class="custom-control-label text-muted" for="presalerule">I agree
                    <a data-toggle="modal" data-backdrop="static" v-on:click="
                      (isNoticeModalVisible = true),
                      (isContractModalVisible = false)
                      ">PRESALE RULE</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Field type="hidden" value="parity" name="tab" id="tab" class="form-control" />
          <div class="modal-footer">
            <a type="button" class="pull-left btn btn-sm closebtn"
              v-on:click="(isContractModalVisible = false), hideModal()">CANCEL</a>
            <button type="submit" class="pull-left btn btn-sm btn-white confirm-text" v-on:click="conformbat = true"
              :class="conformbat ? 'Disabled' : ''">
              CONFIRM
            </button>
          </div>
        </Form>
      </div>
      <div v-else-if="isOneMinuteGame == 2">
        <Form action="#" @submit="onSubmit" method="post" id="bettingForm" autocomplete="off">
          <div class="modal-body" id="loadform">
            <div class="row">
              <div class="col-12">
                <p class="contract-money">Contract Money</p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <!-- <label v-on:click="levelTab = 5" :class="levelTab === 5
                  ? 'btn btn-secondary active'
                  : 'btn btn-secondary'
                  ">
                  <input type="radio" name="contract" id="hoursofoperation" value="1" :class="levelTab === 5
                    ? 'contract checked'
                    : 'contract'
                    " v-on:click="moneycount" />
                  1
                </label> -->
                  <label v-on:click="levelTab = 6" :class="levelTab === 6
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="5"
                      :class="levelTab === 6 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10
                  </label>
                  <!-- <label
                  v-on:click="levelTab = 1"
                  :class="
                    levelTab === 1 ? 'btn btn-secondary active' : 'btn btn-secondary'
                  "
                >
                  <input
                    type="radio"
                    name="contract"
                    id="hoursofoperation"
                    value="10"
                    :class="levelTab === 1 ? 'contract checked' : 'contract'"
                    v-on:click="moneycount"
                  />
                  10
                </label> -->
                  <label v-on:click="levelTab = 2" :class="levelTab === 2
                    ? 'btn btn-secondary active'
                    : 'btn  money-counter'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="100"
                      :class="levelTab === 2 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    100
                  </label>
                  <label v-on:click="levelTab = 3" :class="levelTab === 3
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="1000"
                      :class="levelTab === 3 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    1000
                  </label>
                  <label v-on:click="levelTab = 4" :class="levelTab === 4
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="10000"
                      :class="levelTab === 4 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10000
                  </label>
                </div>
                <Field type="hidden" v-model="contractmoney" value="10" :rules="validatename" name="contractmoney"
                  id="contractmoney" onKeyPress="" />
                <p class="contract-money">Number</p>
                <div class="def-number-input number-input safari_only">
                  <button type="button" v-on:click="stepDown" class="minus"></button>
                  <input class="quantity" min="1" name="amount" id="amount" :value="amount" type="number" />
                  <button type="button" v-on:click="stepUp" class="plus"></button>
                </div>
                <Field type="hidden" :value="type1" v-model="type1" name="type" id="type" class="form-control" />
                <Field type="hidden" :value="value1" v-model="value1" name="value" id="value" class="form-control" />
                <Field type="hidden" name="counter" id="counter" class="form-control" />
                <Field type="hidden" :value="gameid" v-model="gameid" name="inputgameid" id="inputgameid"
                  class="form-control" />
                <div class="contract-money">
                  Total contract money is
                  <span id="showamount" style="font-size: 14px;">{{ totalamount }}</span>
                </div>
                <Field type="hidden" :value="totalamount" v-model="totalamount" name="finalamount" id="finalamount"
                  class="form-control" />
                <!-- <div class="custom-control custom-checkbox">
                    <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                    <label class="custom-control-label text-muted" for="presalerule"
                      v-on:click="isContractModalVisible = false">I agree <a data-toggle="modal" data-backdrop="static"
                        v-on:click="isNoticeModalVisible = true">PRESALE RULE</a></label>
                  </div> -->
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                  <label class="custom-control-label text-muted" for="presalerule">I agree
                    <a data-toggle="modal" data-backdrop="static" v-on:click="
                      (isNoticeModalVisible = true),
                      (isContractModalVisible = false)
                      ">PRESALE RULE</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Field type="hidden" value="parity" name="tab" id="tab" class="form-control" />
          <div class="modal-footer">
            <a type="button" class="pull-left btn btn-sm closebtn"
              v-on:click="(isContractModalVisible = false), hideModal()">CANCEL</a>
            <button type="submit" class="pull-left btn btn-sm btn-white confirm-text" v-on:click="conformbat = true"
              :class="conformbat ? 'Disabled' : ''">
              CONFIRM
            </button>
          </div>
        </Form>
      </div>
      <div v-else-if="isOneMinuteGame == 0">
        <Form action="#" @submit="onFastWinSubmit" method="post" id="bettingForm" autocomplete="off">
          <div class="modal-body" id="loadform">
            <div class="row">
              <div class="col-12">
                <p class="contract-money">Contract Money</p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <!-- <label v-on:click="levelTab = 5" :class="levelTab === 5
                  ? 'btn btn-secondary active'
                  : 'btn btn-secondary'
                  ">
                  <input type="radio" name="contract" id="hoursofoperation" value="1" :class="levelTab === 5
                    ? 'contract checked'
                    : 'contract'
                    " v-on:click="moneycount" />
                  1
                </label> -->
                  <label v-on:click="levelTab = 6" :class="levelTab === 6
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="5"
                      :class="levelTab === 6 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10
                  </label>
                  <!-- <label
                  v-on:click="levelTab = 1"
                  :class="
                    levelTab === 1 ? 'btn btn-secondary active' : 'btn btn-secondary'
                  "
                >
                  <input
                    type="radio"
                    name="contract"
                    id="hoursofoperation"
                    value="10"
                    :class="levelTab === 1 ? 'contract checked' : 'contract'"
                    v-on:click="moneycount"
                  />
                  10
                </label> -->
                  <label v-on:click="levelTab = 2" :class="levelTab === 2
                    ? 'btn btn-secondary active'
                    : 'btn  money-counter'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="100"
                      :class="levelTab === 2 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    100
                  </label>
                  <label v-on:click="levelTab = 3" :class="levelTab === 3
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="1000"
                      :class="levelTab === 3 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    1000
                  </label>
                  <label v-on:click="levelTab = 4" :class="levelTab === 4
                    ? 'btn btn-secondary active'
                    : 'btn'
                    ">
                    <input type="radio" name="contract" id="hoursofoperation" value="10000"
                      :class="levelTab === 4 ? 'contract checked' : 'contract'" v-on:click="moneycount" />
                    10000
                  </label>
                </div>
                <Field type="hidden" v-model="contractmoney" value="10" :rules="validatename" name="contractmoney"
                  id="contractmoney" onKeyPress="" />
                <p class="contract-money">Number</p>
                <div class="def-number-input number-input safari_only">
                  <button type="button" v-on:click="stepDown" class="minus"></button>
                  <input class="quantity" min="1" name="amount" id="amount" :value="amount" type="number" />
                  <button type="button" v-on:click="stepUp" class="plus"></button>
                </div>
                <Field type="hidden" :value="type1" v-model="type1" name="type" id="type" class="form-control" />
                <Field type="hidden" :value="value1" v-model="value1" name="value" id="value" class="form-control" />
                <Field type="hidden" name="counter" id="counter" class="form-control" />
                <Field type="hidden" :value="fastgameid" v-model="fastgameid" name="inputgameid" id="inputgameid"
                  class="form-control" />
                <div class="contract-money">
                  Total contract money is
                  <span id="showamount" style="font-size: 14px;">{{ totalamount }}</span>
                </div>
                <Field type="hidden" :value="totalamount" v-model="totalamount" name="finalamount" id="finalamount"
                  class="form-control" />
                <!-- <div class="custom-control custom-checkbox">
                    <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                    <label class="custom-control-label text-muted" for="presalerule"
                      v-on:click="isContractModalVisible = false">I agree <a data-toggle="modal" data-backdrop="static"
                        v-on:click="isNoticeModalVisible = true">PRESALE RULE</a></label>
                  </div> -->
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" checked class="custom-control-input" id="presalerule" name="presalerule" />
                  <label class="custom-control-label text-muted" for="presalerule">I agree
                    <a data-toggle="modal" data-backdrop="static" v-on:click="
                      (isNoticeModalVisible = true),
                      (isContractModalVisible = false)
                      ">PRESALE RULE</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Field type="hidden" value="parity" name="tab" id="tab" class="form-control" />
          <div class="modal-footer">
            <a type="button" class="pull-left btn btn-sm closebtn"
              v-on:click="(isContractModalVisible = false), hideModal()">CANCEL</a>
            <button type="submit" class="pull-left btn btn-sm btn-white confirm-text" v-on:click="conformbat = true"
              :class="conformbat ? 'Disabled' : ''">
              CONFIRM
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  </div>

  <div class="privacy-policy-modal">
    <Modal v-model:visible="isNoticeModalVisible" :maskClosable="false" height="50%" width="90%" offsetTop="10%">
      <PrivacyPolicyModel />
      <div class="modal-footer">
        <button type="button" class="btn btn-comman btn-close active" data-dismiss="modal"
          v-on:click="(isNoticeModalVisible = false), hideModal()">
          Close
        </button>
      </div>
    </Modal>
  </div>

  <Footer />
  <PageReload />
  <Loader :isShow="loader" />

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="
        top: 50% !important;
        font-size: 14px;
        min-width: 120px;
        padding: 8px 12px;
        text-align: center;
        margin: 0 auto;
        position: fixed;
      ">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import Footer from "../../components/CommonFooter.vue";
import PageReload from "../../components/PageReload.vue";
import { onMounted, ref } from "vue";
import { Modal } from "usemodal-vue3";
import axios from "axios";
import { useRouter } from "vue-router";
import $ from "jquery";
import { Form, Field } from "vee-validate";
import io from "socket.io-client";
import MineComponent from "./JoinBetHeader.vue";
import JoinBets from "./JoinBets.vue";
import EmerdRecordList from "./EmerdRecordList.vue";
import MyOrderList from "./MyOrderDetails.vue";
import PrivacyPolicyModel from "./PrivacyPolicyModel.vue";
import Loader from "../../components/UserLoader.vue";
import oneMinJoinBet from "../GameWin/oneMinGame/JoinBets.vue";
import oneMinEmerdRecordList from "../GameWin/oneMinGame/EmerdRecordList.vue";
import oneMinOrderList from "../GameWin/oneMinGame/myOderDetails.vue";
import fastWinJoinBet from "../GameWin/fastWinGame/JoinBets.vue";
import fastWinEmerdRecordList from "../GameWin/fastWinGame/EmerdRecordList.vue";
import fastWinOrderList from "../GameWin/fastWinGame/myOderDetails.vue";
export default {
  components: {
    Footer,
    Form,
    Field,
    Modal,
    PageReload,
    MineComponent,
    JoinBets,
    EmerdRecordList,
    MyOrderList,
    Loader,
    PrivacyPolicyModel,
    oneMinJoinBet,
    oneMinEmerdRecordList,
    fastWinEmerdRecordList,
    oneMinOrderList,
    fastWinJoinBet,
    fastWinOrderList
  },

  setup() {
    // useMeta({ title: "Win" });
    const router = useRouter();
    let isContractModalVisible = ref(false);
    let isNoticeModalVisible = ref(false);
    const mineDashbordData = ref({});
    const gameid = ref("");
    const oneMinGameId = ref("");
    const fastgameid = ref("");
    const userresult = ref();
    const batecolor = ref("paymentheader");
    const batevalue = ref("");
    const levelTab = ref(6);
    const amount = ref(1);
    const totalamount = ref(10);
    const type1 = ref("");
    const value1 = ref("");
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    let isResultCollapseOpen = ref("");
    let iswaitCollapseOpen = ref("");
    const userresultsPage = ref(1);
    const userresultsPageRow = ref(10);
    const userresultsPageRowOpen = ref(false);
    const totaluserresults = ref(0);
    const userresultList = ref([]);
    const oneMinUserResultList = ref([]);
    const fastWinUserResultList = ref([]);
    const oneMinUserPage = ref(1);
    const fastWinUserPage = ref(1);
    const oneMinUserPageRow = ref(10);
    const fastWinUserPageRow = ref(10);
    const oneMinUserTotal = ref(0);
    const fastWinUserTotal = ref(0);
    const oneMinUserResultPageOpen = ref(false);
    const getResultbyCategoryPage = ref(1);
    const getResultbyCategoryPageRow = ref(10);
    const oneMinPage = ref(1);
    const fastWinPage = ref(1);
    const fastWinPageRow = ref(10);
    const oneMinPageRow = ref(10);
    const oneMinTotalResult = ref(0);
    const fastWinTotalResult = ref(0);
    const oneMinOpenPage = ref(false);
    const getResultbyCategoryPageRowOpen = ref(false);
    const totalgetResultbyCategory = ref(0);
    const getResultbyCategoryList = ref("");
    const oneMinResultCategoryList = ref("");
    const fastWinResultCategoryList = ref("");
    const userwaitlist = ref([]);
    const oneMinUserWaitList = ref([]);
    const fastWinUserWaitList = ref([]);
    const Disabled = ref("");
    const countDownMinute = ref(0);
    const countDownSecond = ref(0);
    const countcontinue = ref(false);
    const oneMinDisabled = ref("");
    const fastWinDisabled = ref("");
    const oneMinCountDownMinute = ref(0);
    const fastWinCountDownMinute = ref(0);
    const oneMinCountDownSecond = ref(0);
    const fastWinCountDownSecond = ref(0);
    const oneMinCountcontinue = ref(false);
    const fastWinCountcontinue = ref(false);
    const oneMinContinueClass = ref("");
    const fastWinContinueClass = ref("");
    const myrecordmsg = ref(false);
    const oneMinRecordmsg = ref(false);
    const fastWinRecordmsg = ref(false);
    const continueClass = ref("");
    let loader = ref(false);
    let conformbat = ref(false);
    let userresultsTotalpage = ref(0);
    const blueline = ref("none");
    const isOneMinuteGame = ref(0);
    let socket = io(process.env.VUE_APP_SOCAT_URL, { transports: ['websocket'] });
    socket.connect();

    window.onload = function () {
      window.onfocus = function () {
        location.reload();
      };
    };

    const getuserresults = async () => {
      await axios
        .post("/userresult", {
          page: userresultsPage.value,
          pagerow: userresultsPageRow.value,

          category: "parity",
          periodid: gameid.value,
        })
        .then((response) => {
          if (response.data.success) {
            userresultList.value = response.data.data;
            totaluserresults.value = response.data.total;
            userresultsTotalpage.value = response.data.totalPages;
            userresultsPage.value = response.data.currentpage;
            userwaitlist.value = response.data.waitlist;
            if (userwaitlist.value.length === 0 || !userresultList.value) {
              myrecordmsg.value = true;
            } else {
              myrecordmsg.value = false;
            }
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const getOneMinUserResult = async () => {
      await axios
        .post("/one/min/user-result", {
          page: oneMinUserPage.value,
          pagerow: oneMinUserPageRow.value,

          category: "parity",
          periodid: oneMinGameId.value,
        })
        .then((response) => {
          if (response.data.success) {
            oneMinUserResultList.value = response.data.data;
            oneMinUserTotal.value = response.data.total;
            userresultsTotalpage.value = response.data.totalPages;
            oneMinUserPage.value = response.data.currentpage;
            oneMinUserWaitList.value = response.data.waitlist;
            if (oneMinUserWaitList.value.length === 0 || !oneMinUserResultList.value) {
              oneMinRecordmsg.value = true;
            } else {
              oneMinRecordmsg.value = false;
            }
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const getFastWinUserResult = async () => {
      await axios
        .post("/fast/win/user-result", {
          page: fastWinUserPage.value,
          pagerow: fastWinUserPageRow.value,
          category: "parity",
          periodid: fastgameid.value,
        })
        .then((response) => {
          if (response.data.success) {
            fastWinUserResultList.value = response.data.data;
            fastWinUserTotal.value = response.data.total;
            userresultsTotalpage.value = response.data.totalPages;
            fastWinUserPage.value = response.data.currentpage;
            fastWinUserWaitList.value = response.data.waitlist;
            if (fastWinUserWaitList.value.length === 0 || !fastWinUserResultList.value) {
              fastWinRecordmsg.value = true;
            } else {
              fastWinRecordmsg.value = false;
            }
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    // const userwaitlistfun = () => {
    // axios
    //   .post("/userwaitlist", {
    //     periodid: gameid.value,
    //     category: "parity",
    //   })
    //   .then((response) => {
    //     if (response.data.success) {
    //       // userwaitlist.value = response.data.data;
    //     } else {
    //       alert(response.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.data.error);
    //   });
    // };

    const getResultbyCategory = async () => {
      await axios
        .post("/getResultbyCategory", {
          page: getResultbyCategoryPage.value,
          pagerow: getResultbyCategoryPageRow.value,
          category: "parity",
        })
        .then((response) => {
          if (response.data.success) {
            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
            }, 2000);
            getResultbyCategoryList.value = response.data.data;
            totalgetResultbyCategory.value = response.data.total;
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const handlegetResultbyCategoryPageRowChange = (row) => {
      if (row) {
        getResultbyCategoryPageRow.value = row;
        getResultbyCategoryPageRowOpen.value = false;
        getResultbyCategory();
      }
    };

    const handlegetResultbyCategoryPageChange = (page) => {
      var page1 =
        totalgetResultbyCategory.value / getResultbyCategoryPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          getResultbyCategoryPage.value = page;
          getResultbyCategory();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const getOneMinResultbyCategory = async () => {
      try {
        const response = await axios.get("/one/min/result", {
          params: {
            page: oneMinPage.value,
            pageRow: oneMinPageRow.value,
            category: "parity",
          },
        });

        if (response.data.success) {
          $("#blrow").css("display", "contents");
          setTimeout(() => {
            $("#blrow").css("display", "none");
          }, 2000);
          oneMinResultCategoryList.value = response.data.data;
          oneMinTotalResult.value = response.data.total;
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("API error:", error);
        setErrorMessage("Server error occurred.");
      }
    };
    const fastWinResultbyCategory = async () => {
      try {
        const response = await axios.get("/fast/win/result", {
          params: {
            page: fastWinPage.value,
            pageRow: fastWinPageRow.value,
            category: "parity",
          },
        });
        if (response) {
          $("#blrow").css("display", "contents");
          setTimeout(() => {
            $("#blrow").css("display", "none");
          }, 2000);
          fastWinResultCategoryList.value = response.data.data;
          fastWinTotalResult.value = response.data.totalResults;
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("API error:", error);
        setErrorMessage("Server error occurred.");
      }
    };
    const oneMinPageRowChange = (row) => {
      if (row) {
        oneMinPageRow.value = row;
        oneMinOpenPage.value = false;
        getOneMinResultbyCategory();
      }
    };
    const fastWinPageRowChange = (row) => {
      if (row) {
        fastWinPageRow.value = row;
        oneMinOpenPage.value = false;
        fastWinResultbyCategory();
      }
    };
    

    const oneMinPageChange = (page) => {
      var page1 =
        oneMinTotalResult.value / oneMinPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          oneMinPage.value = page;
          getOneMinResultbyCategory();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };
    const fastWinPageChange = (page) => {
      var page1 =
        fastWinTotalResult.value / fastWinPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          fastWinPage.value = page;
          fastWinResultbyCategory();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };


    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 1500);
    };

    const handleuserresultsPageRowChange = (row) => {
      if (row) {
        userresultsPageRow.value = row;
        userresultsPageRowOpen.value = false;
        getuserresults();
      }
    };

    const handleuserresultsPageChange = (page) => {
      var page1 = totaluserresults.value / userresultsPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          userresultsPage.value = page;
          getuserresults();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const oneMinUserPageRowChange = (row) => {
      if (row) {
        oneMinUserPageRow.value = row;
        oneMinUserResultPageOpen.value = false;
        getOneMinUserResult();
      }
    };
    const fastWinUserPageRowChange = (row) => {
      if (row) {
        fastWinUserPageRow.value = row;
        oneMinUserResultPageOpen.value = false;
        getFastWinUserResult();
      }
    };

    const oneMinUserPageChange = (page) => {
      var page1 = oneMinUserTotal.value / oneMinUserPageRow.value;
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          oneMinUserPage.value = page;
          getOneMinUserResult();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };
    const fastWinUserPageChange = (page) => {
      var page1 = fastWinUserTotal.value / fastWinUserPageRow.value;
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          fastWinUserPage.value = page;
          getFastWinUserResult();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };


    const getMineDashbordData = async () => {
      await axios
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

    const betbutton = async (color, type, name) => {
      if (type == "number") {
        $("#paymenttitle").css("background", color);
        batecolor.value = "garycolor";
        batevalue.value = "Select " + name;
      } else {
        $("#paymenttitle").css("background", "yellow");
        batecolor.value = name;
        batevalue.value = "Join " + name;
      }

      type1.value = type;
      value1.value = name;
      $("#value").val(name);
      isContractModalVisible.value = true;
      showModal();
      amount.value = 1;
      levelTab.value = 6;
      totalamount.value = 10;
    };

    const gameidfun = async () => {
      await axios
        .get("/gameid", {})
        .then((response) => {
          if (response.data.success === true) {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
            }, 2000);
            gameid.value = response.data.data.gameid;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const oneMinPeriodId = async () => {
      await axios
        .get("/one/min/period-id", {})
        .then((response) => {
          if (response.data.success === true) {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
            }, 2000);
            oneMinGameId.value = response.data.data.gameid;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fastWinPeriodId = async () => {
      await axios
        .get("/fast/win/period-id", {})
        .then((response) => {
          if (response.data.success === true) {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
            }, 2000);
            fastgameid.value = response.data.data.gameid;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const stepUp = async () => {
      amount.value = amount.value + 1;
      moneycount();
    };

    const stepDown = async () => {
      if (amount.value == 1) {
        alert("minimumm range is 1");
      } else {
        amount.value = amount.value - 1;
        moneycount();
      }
    };

    const onSubmit = async (values) => {
      // console.log(values);
      await axios
        .post("/batenow", {
          type: values.type,
          value: values.value,
          counter: "32",
          inputgameid: values.inputgameid,
          finalamount: values.finalamount,
          tab: values.tab,
          presalerule: "on",
        })
        .then((response) => {
          if (response.data.success) {
            isContractModalVisible.value = false;
            conformbat.value = false;
            getMineDashbordData();
            hideModal();
            setErrorMessage(response.data.message);
            socket.emit("bate", response.data.data);

            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getuserresults();
            //   window.location.reload(true);
          } else {
            setErrorMessage(response.data.message);
            isContractModalVisible.value = false;
            conformbat.value = false;
            hideModal();
            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getuserresults();
          }
          // socket.emit("amount", response.data.data.value);
          // socket.emit("userID", response.data.data.userid);
        })
        .catch((error) => {
          console.log(error.data.error);
        });
      socket.on("value", (data) => {
        socket.emit("values", data);
        console.log("on data", data || "undefined");
      });
      socket.on("amount", (data) => {
        socket.emit("amounts", data);
        console.log("on data", data || "undefined");
      });
      socket.on("userID", (data) => {
        socket.emit("user", data);
      });
    };
    const onFastWinSubmit = async (values) => {
      await axios
        .post("/fast/win/bate", {
          type: values.type,
          value: values.value,
          counter: "32",
          inputgameid: values.inputgameid,
          finalamount: values.finalamount,
          tab: values.tab,
          presalerule: "on",
        })
        .then((response) => {
          if (response.data.success) {
            isContractModalVisible.value = false;
            conformbat.value = false;
            getMineDashbordData();
            hideModal();
            setErrorMessage(response.data.message);
            socket.emit("fastWinBate", response.data.data);

            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getFastWinUserResult();
            //   window.location.reload(true);
          } else {
            setErrorMessage(response.data.message);
            isContractModalVisible.value = false;
            conformbat.value = false;
            hideModal();
            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getFastWinUserResult();
          }
          // socket.emit("amount", response.data.data.value);
          // socket.emit("userID", response.data.data.userid);
        })
        .catch((error) => {
          console.log(error.data.error);
        });
      socket.on("value", (data) => {
        socket.emit("values", data);
        console.log("on data", data || "undefined");
      });
      socket.on("amount", (data) => {
        socket.emit("amounts", data);
        console.log("on data", data || "undefined");
      });
      socket.on("userID", (data) => {
        socket.emit("user", data);
      });
    };

    const oneMinBateSubmit = async (values) => {
      // console.log(values);
      await axios
        .post("/one/min/bate", {
          type: values.type,
          value: values.value,
          counter: "32",
          inputgameid: values.inputgameid,
          finalamount: values.finalamount,
          tab: values.tab,
          presalerule: "on",
        })
        .then((response) => {
          if (response.data.success) {
            isContractModalVisible.value = false;
            conformbat.value = false;
            getMineDashbordData();
            hideModal();
            setErrorMessage(response.data.message);
            socket.emit("oneMniBate", response.data.data);

            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getOneMinUserResult();
            //   window.location.reload(true);
          } else {
            setErrorMessage(response.data.message);
            isContractModalVisible.value = false;
            conformbat.value = false;
            hideModal();
            $("#blrow").css("display", "contents");

            setTimeout(() => {
              $("#blrow").css("display", "none");
              // userwaitlistfun();
            }, 2000);
            getOneMinUserResult();
          }
          // socket.emit("amount", response.data.data.value);
          // socket.emit("userID", response.data.data.userid);
        })
        .catch((error) => {
          console.log(error.data.error);
        });
      socket.on("value", (data) => {
        socket.emit("values", data);
        console.log("on data", data || "undefined");
      });
      socket.on("amount", (data) => {
        socket.emit("amounts", data);
        console.log("on data", data || "undefined");
      });
      socket.on("userID", (data) => {
        socket.emit("user", data);
      });
    };

    const moneycount = async () => {
      var tog = 0;
      if (levelTab.value == 1) {
        tog = 10;
      } else if (levelTab.value == 2) {
        tog = 100;
      } else if (levelTab.value == 3) {
        tog = 1000;
      } else if (levelTab.value == 4) {
        tog = 10000;
      } else if (levelTab.value == 5) {
        tog = 1;
      } else if (levelTab.value == 6) {
        tog = 10;
      }
      var count = amount.value;
      totalamount.value = count * tog;
    };

    const pagereload = async () => {
      router.reload();
    };
    const showTimer = () => {
      var countDownDate = Date.parse(new Date()) / 1e3;
      var distance = 180 - (countDownDate % 180);
      var i = distance / 60,
        n = distance % 60;
      countDownMinute.value = Math.floor(i);
      countDownSecond.value = ("0" + Math.floor(n)).slice(-2);

      // if (distance <= 180 && distance > 174) {
      if (distance === 180) {
        countcontinue.value = true;
        continueClass.value = "Disabled";
      }

      if (distance === 176) {
        continueClass.value = "continue";
      }

      if (distance === 174) {
        countcontinue.value = false;
        continueClass.value = "";
      }

      if (distance <= 30) {
        Disabled.value = "Disabled";
      } else {
        Disabled.value = "";
      }

      // if (distance == 176) {
      if (distance == 177) {
        // winnerResultfun();
        if (!localStorage.getItem("authToken")) {
          router.push({ path: "/login" });
        } else {
          getResultbyCategory();
          getMineDashbordData();
          setTimeout(() => {
            getuserresults();
            //   // userwaitlistfun();
          }, 2000);
          gameidfun();
        }
      }
    };
    setInterval(function () {
      showTimer();
    }, 1e3);

    const oneMinShowTimer = () => {
      var countDownDate = Date.parse(new Date()) / 1e3;
      var distance = 60 - (countDownDate % 60);
      var i = distance / 60,
        n = distance % 60;
      oneMinCountDownMinute.value = Math.floor(i);
      oneMinCountDownSecond.value = ("0" + Math.floor(n)).slice(-2);

      // if (distance <= 180 && distance > 174) {
      if (distance === 60) {
        oneMinCountcontinue.value = true;
        oneMinContinueClass.value = "Disabled";
      }

      if (distance === 56) {
        oneMinContinueClass.value = "continue";
      }

      if (distance === 54) {
        oneMinCountcontinue.value = false;
        oneMinContinueClass.value = "";
      }

      if (distance <= 5) {
        oneMinDisabled.value = "Disabled";
      } else {
        oneMinDisabled.value = "";
      }
      // if (distance == 176) {
      if (distance == 55) {
        // winnerResultfun();
        if (!localStorage.getItem("authToken")) {
          router.push({ path: "/login" });
        } else {
          getOneMinResultbyCategory();
          getMineDashbordData();
          setTimeout(() => {
            getOneMinUserResult();
            //   // userwaitlistfun();
          }, 2000);
          oneMinPeriodId();
        }
      }
    };
    setInterval(function () {
      oneMinShowTimer();
    }, 1e3);

    const fastWinShowTimer = () => {
      var countDownDate = Date.parse(new Date()) / 1e3;
      var distance = 30 - (countDownDate % 30);
      var i = distance / 60,
        n = distance % 60;
      fastWinCountDownMinute.value = Math.floor(i);
      fastWinCountDownSecond.value = ("0" + Math.floor(n)).slice(-2);

      // if (distance <= 180 && distance > 174) {
      if (distance === 30) {
        fastWinCountcontinue.value = true;
        fastWinContinueClass.value = "Disabled";
      }

      if (distance === 28) {
        fastWinContinueClass.value = "continue";
      }

      if (distance === 27) {
        fastWinCountcontinue.value = false;
        fastWinContinueClass.value = "";
      }

      if (distance <= 3) {
        fastWinDisabled.value = "Disabled";
      } else {
        fastWinDisabled.value = "";
      }
      // if (distance == 176) {
      if (distance == 28) {
        // winnerResultfun();
        if (!localStorage.getItem("authToken")) {
          router.push({ path: "/login" });
        } else {
          fastWinResultbyCategory();
          getMineDashbordData();
          setTimeout(() => {
            getFastWinUserResult();
          }, 1000);
          fastWinPeriodId();
        }
      }
    };
    setInterval(function () {
      fastWinShowTimer();
    }, 1e3);

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getMineDashbordData();
      setTimeout(() => {
        // userwaitlistfun();
        getuserresults();
        getOneMinUserResult();
        getFastWinUserResult();
      }, 2000);
      fastWinPeriodId();
    }
    const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };

    const updateWaitCollapse = (newId) => {
      iswaitCollapseOpen.value = newId;
    };
    const updateResultCollapse = (newId) => {
      isResultCollapseOpen.value = newId;
    };
    const selectTime = (value) => {
     if (value === "30Sec"){
        isOneMinuteGame.value = 0;
        fastWinPage.value = 1;
       fastWinResultbyCategory();
       getFastWinUserResult();
     }
     else if (value === "1min") {
        isOneMinuteGame.value = 1;
        // Reset pagination for 1-min game
        oneMinPage.value = 1;
        getOneMinResultbyCategory();
        getOneMinUserResult();
      } else if (value === "3min") {
        isOneMinuteGame.value = 2;
        // Reset pagination for 3-min game
        getResultbyCategoryPage.value = 1;
        getResultbyCategory();
        getuserresults();
      }
      // Refresh game ID based on selected time
      if (isOneMinuteGame.value === 0) {
        fastWinPeriodId();
      }
      else if (isOneMinuteGame.value === 1) {
        oneMinPeriodId();
      }else if(isOneMinuteGame.value === 2){
        gameidfun();
      } 
    };
    onMounted(() => {
      getMineDashbordData();
      getOneMinResultbyCategory();
      fastWinResultbyCategory();
    });

    // Add CSS for active button state
    const styles = document.createElement('style');
    styles.textContent = `
      .btn-r .btn.active {
        background-color: #17181a !important;
        color: white !important;
      }
    `;
    document.head.appendChild(styles);

    return {
      showModal,
      hideModal,
      mineDashbordData,
      gameidfun,
      oneMinPeriodId,
      fastWinPeriodId,
      gameid,
      oneMinGameId,
      fastgameid,
      getMineDashbordData,
      pagereload,
      router,
      isContractModalVisible,
      betbutton,
      batecolor,
      batevalue,
      levelTab,
      stepUp,
      amount,
      stepDown,
      totalamount,
      moneycount,
      isNoticeModalVisible,
      value1,
      type1,
      onSubmit,
      onFastWinSubmit,
      oneMinBateSubmit,
      isResultCollapseOpen,
      iswaitCollapseOpen,
      userresult,
      userresultList,
      oneMinUserResultList,
      fastWinUserResultList,
      userresultsPage,
      userresultsPageRow,
      getuserresults,
      getOneMinUserResult,
      handleuserresultsPageChange,
      userresultsPageRowOpen,
      handleuserresultsPageRowChange,
      totaluserresults,
      getResultbyCategory,
      getResultbyCategoryList,
      oneMinResultCategoryList,
      fastWinResultCategoryList,
      getResultbyCategoryPage,
      getResultbyCategoryPageRow,
      handlegetResultbyCategoryPageChange,
      getResultbyCategoryPageRowOpen,
      handlegetResultbyCategoryPageRowChange,
      totalgetResultbyCategory,
      userwaitlist,
      oneMinUserWaitList,
      fastWinUserWaitList,
      Disabled,
      oneMinDisabled,
      fastWinDisabled,
      countDownMinute,
      oneMinCountDownMinute,
      fastWinCountDownMinute,
      countDownSecond,
      oneMinCountDownSecond,
      fastWinCountDownSecond,
      countcontinue,
      oneMinCountcontinue,
      fastWinCountcontinue,
      loader,
      continueClass,
      oneMinContinueClass,
      fastWinContinueClass,
      setErrorMessage,
      isErrorShow,
      errorMessage,
      blueline,
      myrecordmsg,
      oneMinRecordmsg,
      fastWinRecordmsg,
      conformbat,
      updateWaitCollapse,
      updateResultCollapse,
      selectTime,
      getOneMinResultbyCategory,
      fastWinResultbyCategory,
      oneMinOpenPage,
      oneMinPageRowChange,
      fastWinPageRowChange,
      oneMinPageChange,
      fastWinPageChange,
      oneMinUserPageRowChange,
      fastWinUserPageRowChange,
      oneMinUserPageChange,
      fastWinUserPageChange,
      isOneMinuteGame,
      oneMinTotalResult,
      fastWinTotalResult,
      oneMinPage,
      fastWinPage,
      fastWinPageRow,
      oneMinPageRow,
      oneMinUserPageRow,
      oneMinUserPage,
      oneMinUserTotal,
      fastWinUserTotal,
      fastWinUserPage,
      fastWinUserPageRow
    };
  },
};
</script>


<!-- <style scoped>
@import "../assets/css/Win.css";
@import "../assets/css/pagination.css";
@import "../assets/css/chunk-vendors.css";
</style> -->


<style scoped>
  @media only screen and (max-width: 425px) {
     .display-mobile-view{
        display: flex;
     }
     .display-mobile-view .one_btn {
         height: 64px !important;
     }
    
  }
</style>