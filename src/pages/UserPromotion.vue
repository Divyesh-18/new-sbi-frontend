<template>
  <link rel="stylesheet" :href="'/css/promotion1.css'" />
  <!-- <link rel="stylesheet" :href="'/css/pagination.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/common-modal.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" class="icon goBack" v-on:click="router.go(-1)">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle">Promotion</div>
    </div>
    <div class="right">
      <div class="dropdown">
        <a class="right-menu-icon" @click="toggleDropdown" role="button" id="dropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <img :src="require('../assets/images/menu.png')" />
        </a>

        <div v-if="drop == true" class="dropdown-menu">
          {{ console.log("hello") }}
          <router-link to="/bonusrecord">
            <!-- <router-link to="/"> -->
            <a class="dropdown-item">Bonus Record</a>
          </router-link>
          <router-link to="/applyrecord">
            <!-- <router-link to="/"> -->
            <a class="dropdown-item">Apply Record</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="promotion-modal">
    <Modal :class="`promotion-notice-modal`" x v-model:visible="isNoticeModalVisible" :maskClosable="false" width="70%"
      offsetTop="20%" offsetBottom="40%">
      <div style="background: #fff; padding: 30px" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 18px">
          Notice
        </h5>
      </div>
      <div class="modal-body user-promotion-notice-model">
        <div class="sign-info user-promotion-model logout-info">
          <p style="color: #000">
            When your friends trade, you will also receive a 30% commission.
            Therefore, the more friends you invite, the higher your commission.
            There is a fixed income every day, the commission is permanent, but
            the reward is only onceWhen they make money, they will invite their
            friends to join them, and then you can get a 20% commission. In this
            way, your team can spread quickly. Therefore, I hope everyone can
            use our platform to make money, make money, and make money!When they
            make money, they will invite their friends to join them, and then
            you can get a 20% commission. In this way, your team can spread
            quickly. Therefore, I hope everyone can use our platform to make
            money, make money, and make money!Level 1 commission: Friends who
            join through your own link belong to your level, when they trade,
            you will get 30% commission.Tier 2 commission: Friends who join
            through your friend link belong to your secondary commission. When
            they trade, you can get 20% commission.Level 3 commission: Friends
            who join through friends of friends belong to your level 3. When
            they trade, you get 10% commission.Promotional rewards: 10% bonus
            amount for the first recharge after the first-level lower level
            joins. If your friend joins through your invitation and recharges
            1000 for the first time, you will get 200
          </p>
        </div>
      </div>
      <div class="modal-footer" style="background-color: rgb(255, 255, 255) !important">
        <button type="button" class="btn btn-comman active pr-2" data-dismiss="modal"
          v-on:click="(isNoticeModalVisible = false), hideModal()">
          Close
        </button>
      </div>
    </Modal>
  </div>

  <!-- App Capsule -->
  <div id="appCapsule">
    <div class="">
      <div class="bonus-parent-title">
        <h3 class="text-center bonus-title">
          <span class="promotion-total_bonus" v-show="!apirun">{{
            `Bonus:₹ ${DashbordData.total_bonus}` }}</span>
          <!-- <div class="lds-ring" v-show="apirun">
            <div class="add-coustom-loading-proper"></div>
            <div class="add-coustom-loading-proper"></div>
            <div class="add-coustom-loading-proper"></div>
            <div class="add-coustom-loading-proper"></div>
          </div> -->
        </h3>
      </div>
      <!-- App Capsule -->
      <div id="appCapsule">
        <div class="appContent1 promotion-page-form">
          <div class="">
            <div class="d-flex justify-content-around text-center">
              <div class="col-md-6">
                <h3 class="total-user">
                  Total People
                  <br />
                  <span v-show="!apirun">{{ DashbordData.total_people }}</span>
                  <!-- <div class="lds-ring" style="padding: 0 27px 0 0" v-show="apirun">
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                  </div> -->
                </h3>
              </div>
              <div class="col-md-6">
                <h3 class="total-user">
                  Contribution
                  <br />
                  <span v-show="!apirun">₹ {{ DashbordData.contribution }}<br /></span>
                  <!-- <div class="lds-ring" style="padding: 0 0px 0 0" v-show="apirun">
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                    <div class="add-coustom-loading-proper"></div>
                  </div> -->
                </h3>
              </div>
            </div>
          </div>
          <div class="" style="padding: 15px 0">
            <div class="border-bottom inner-text-p">
              <label>My Promotion Code</label>
              <div>
                <span style="font-size: 16px; font-weight: 400">{{
                  promotioncode
                  }}</span>
              </div>
            </div>
            <div class="border-bottom inner-text-p" style="height: 109px">
              <label>My Promotion Link</label>
              <p style="font-size: 16px; font-weight: 400; margin-top:0px !important" id="text_element"></p>
            </div>
          </div>
          <div class="text-center copy-links">
            <button class="btn btn-copylink" @click="onCopy">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- appCapsule -->
      <div class="level-main-tab">
        <ul class="nav nav-tabs size2" id="myTab3" role="tablist">
          <li class="nav-item">
            <a v-on:click="levelTab = 1, getDashbordData()" :class="levelTab === 1 ? 'nav-link active' : 'nav-link'
              " id="home-tab3" role="tab">Level 1&nbsp;({{
                DashbordData.countlevel1
              }})<span id="al1"></span></a>
          </li>
          <li class="nav-item">
            <a v-on:click="levelTab = 2, getDashbordData()" :class="levelTab === 2 ? 'nav-link active' : 'nav-link'
              " id="profile-tab3" role="tab">Level 2&nbsp;({{
                DashbordData.countlevel2
              }})<span id="al2"></span></a>
          </li>
          <li class="nav-item">
            <a v-on:click="levelTab = 3, getDashbordData()" :class="levelTab === 3 ? 'nav-link active' : 'nav-link'
              " id="profile-tab4" role="tab">Level 3&nbsp;({{
                DashbordData.countlevel3
              }})<span id="al3"></span></a>
          </li>
          <!-- <li class="nav-item">
            <a v-on:click="levelTab = 4, getDashbordData()" :class="
              levelTab === 4 ? 'nav-link active' : 'nav-link'
            " id="profile-tab4" role="tab">Level 4&nbsp;({{
                DashbordData.countlevel4
              }})<span id="al4"></span></a>
          </li> -->
          <!-- <li class="nav-item">
            <a v-on:click="levelTab = 5, getDashbordData()" :class="
              levelTab === 5 ? 'nav-link active' : 'nav-link'
            " id="profile-tab5" role="tab">Level 5&nbsp;({{
                DashbordData.countlevel5
              }})<span id="al5"></span></a>
          </li> -->
        </ul>
      </div>
      <div class="mb-4 level-tables mine_page">
        <div class="tab-content" id="myTabContent">
          <div v-if="levelTab === 1" class="tab-pane fade active show" id="level1" role="tabpanel">
            <div class="">
              <div class="">
                <div style="overflow-x: auto" class="table-container listView set-shadow">
                  <div class="custom-search">
                    <div class="van-search__content van-search__content--square">
                      <div class="van-cell van-cell--borderless van-field">
                        <div class="van-field__left-icon">
                          <i class="van-icon van-icon-search" aria-hidden="true"></i>
                        </div>
                        <div class="van-cell__value van-cell__value--alone van-field__value">
                          <div class="van-field__body search_bar">
                            <input type="search" placeholder="search" class="van-field__control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table table-sm text-nowrap" id="tl1">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                          Water Reward
                        </th>
                        <th scope="col">
                          First Reward
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-show="apirun">
                        <!-- <td colspan="4">
                          <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </td> -->
                      </tr>

                      <tr v-for="item in DashbordData.level1" :key="item._id" v-show="!apirun">
                        <td>
                          {{ item.loginId }}
                        </td>
                        <td>{{ `91${item.mobile}` }}</td>
                        <td>{{ item.Water_reward }}</td>
                        <td>{{ item.First_reward }}</td>
                      </tr>



                    </tbody>
                  </table>
                  <p v-if="DashbordData.level1 && DashbordData.level1.length <= 0" class="null-data"
                    style="color: #000 !important; font-size: 12px; font-weight: 400; text-align: center;">No data
                    available</p>
                  <div class="pagination">
                    <ul class="page_box">
                      <li class="page">
                        <span>{{
                          lavel1Page *
                          lavel1PageRow -
                          lavel1PageRow +
                          1
                        }}-{{
                            lavel1Page *
                            lavel1PageRow
                          }}
                        </span>
                        of {{ totallavel1 }}
                      </li>
                      <li class="page_btn">
                        <i class="van-icon van-icon-arrow-left" v-on:click="handlegetlavel1Change(lavel1Page - 1)"></i>
                        <i class="van-icon van-icon-arrow" v-on:click="handlegetlavel1Change(lavel1Page + 1)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="levelTab === 2" class="tab-pane fade active show" id="level2" role="tabpanel">
            <div class="">
              <div class="">
                <div style="overflow-x: auto" class="table-container listView">
                  <div class="custom-search">
                    <div class="van-search__content van-search__content--square">
                      <div class="van-cell van-cell--borderless van-field">
                        <div class="van-field__left-icon">
                          <i class="van-icon van-icon-search" aria-hidden="true"></i>
                        </div>
                        <div class="van-cell__value van-cell__value--alone van-field__value">
                          <div class="van-field__body">
                            <input type="search" placeholder="search" class="van-field__control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table table-sm text-nowrap" id="tl2">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                          Water Reward
                        </th>
                        <th scope="col">
                          First Reward
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-show="apirun">
                        <!-- <td colspan="4">
                          <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </td> -->
                      </tr>
                      <tr v-for="item in DashbordData.level2" :key="item._id" v-show="!apirun">
                        <td>
                          {{ item.loginId }}
                        </td>
                        <!-- <td>{{ (String(item.mobile)).slice(0, -8) + '******' + (String(item.mobile)).slice(-2) }}</td> -->
                        <td>{{ `91${item.mobile}` }}</td>
                        <td>{{ item.Water_reward }}</td>
                        <td>{{ item.First_reward }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-if="DashbordData.level2 && DashbordData.level2.length <= 0" class="null-data"
                    style="color: #000 !important; font-size: 12px; font-weight: 400;">No data available</p>
                  <div class="pagination">
                    <ul class="page_box">
                      <li class="page">
                        <span>{{
                          lavel2Page *
                          lavel2PageRow -
                          lavel2PageRow +
                          1
                        }}-{{
                            lavel2Page *
                            lavel2PageRow
                          }}
                        </span>
                        of {{ totallavel2 }}
                      </li>
                      <li class="page_btn">
                        <i class="van-icon van-icon-arrow-left" v-on:click="handlegetlavel2Change(lavel2Page - 1)"></i>
                        <i class="van-icon van-icon-arrow" v-on:click="handlegetlavel2Change(lavel2Page + 1)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="levelTab === 3" class="tab-pane fade active show" id="level3" role="tabpanel">
            <div class="">
              <div class="">
                <div style="overflow-x: auto" class="table-container listView">
                  <div class="custom-search">
                    <div class="van-search__content van-search__content--square">
                      <div class="van-cell van-cell--borderless van-field">
                        <div class="van-field__left-icon">
                          <i class="van-icon van-icon-search" aria-hidden="true"></i>
                        </div>
                        <div class="van-cell__value van-cell__value--alone van-field__value">
                          <div class="van-field__body">
                            <input type="search" placeholder="search" class="van-field__control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table table-sm text-nowrap" id="tl3">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                          Water Reward
                        </th>
                        <th scope="col">
                          First Reward
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-show="apirun">
                        <!-- <td colspan="4">
                          <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </td> -->
                      </tr>
                      <tr v-for="item in DashbordData.level3" :key="item._id" v-show="!apirun">
                        <td>
                          {{ item.loginId }}
                        </td>
                        <!-- <td>{{ (String(item.mobile)).slice(0, -8) + '******' + (String(item.mobile)).slice(-2) }}</td> -->
                        <td>{{ `91${item.mobile}` }}</td>
                        <td>{{ item.Water_reward }}</td>
                        <td>{{ item.First_reward }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-if="DashbordData.level3 && DashbordData.level3.length <= 0" class="null-data"
                    style="color: #000 !important; font-weight: 400; font-size: 12px;">No data available</p>
                  <div class="pagination">
                    <ul class="page_box">
                      <li class="page">
                        <span>{{
                          lavel3Page *
                          lavel3PageRow -
                          lavel3PageRow +
                          1
                        }}-{{
                            lavel3Page *
                            lavel3PageRow
                          }}
                        </span>
                        of {{ totallavel3 }}
                      </li>
                      <li class="page_btn">
                        <i class="van-icon van-icon-arrow-left" v-on:click="handlegetlavel3Change(lavel3Page - 1)"></i>
                        <i class="van-icon van-icon-arrow" v-on:click="handlegetlavel3Change(lavel3Page + 1)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-if="levelTab === 4" class="tab-pane fade active show" id="level4" role="tabpanel">
            <div class="">
              <div class="">
                <div style="overflow-x: auto" class="table-container listView">
                  <div class="custom-search">
                    <div class="van-search__content van-search__content--square">
                      <div class="van-cell van-cell--borderless van-field">
                        <div class="van-field__left-icon">
                          <i class="van-icon van-icon-search" aria-hidden="true"></i>
                        </div>
                        <div class="van-cell__value van-cell__value--alone van-field__value">
                          <div class="van-field__body">
                            <input type="search" placeholder="search" class="van-field__control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table" id="tl4">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                          Water Reward
                        </th>
                        <th scope="col">
                          First Reward
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr v-show="apirun">         
                                    <td colspan="4">
                                      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    </td>
                      </tr>
                      <tr v-for="item in DashbordData.level4" :key="item._id" v-show="!apirun">
                        <td >
                          {{ item.id }}
                        </td>
                        <td>{{ (item.mobile) && item.mobile.slice(0, -8)+'******'+item.mobile.slice(-2) }}</td>
                        <td>{{  (item.Water_reward).toFixed(2) }}</td>
                        <td>{{ (item.First_reward).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-if="DashbordData.level4 && DashbordData.level4.length <= 0" class="null-data" style="color: #000 !important; font-weight: 400; font-size: 12px;">No data available</p>
                  <div class="pagination">
                    <ul class="page_box">
                      <li class="page">
                        <span>{{
                          lavel4Page *
                            lavel4PageRow -
                          lavel4PageRow +
                          1
                        }}-{{
                          lavel4Page *
                            lavel4PageRow
                          }}
                        </span>
                        of {{ totallavel4 }}
                      </li>
                      <li class="page_btn">
                        <i class="van-icon van-icon-arrow-left" v-on:click="handlegetlavel4Change(lavel4Page - 1)"></i>
                        <i class="van-icon van-icon-arrow" v-on:click="handlegetlavel4Change(lavel4Page + 1)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- <div v-if="levelTab === 5" class="tab-pane fade active show" id="level5" role="tabpanel">
            <div class="">
              <div class="">
                <div style="overflow-x: auto" class="table-container listView">
                  <div class="custom-search">
                    <div class="van-search__content van-search__content--square">
                      <div class="van-cell van-cell--borderless van-field">
                        <div class="van-field__left-icon">
                          <i class="van-icon van-icon-search" aria-hidden="true"></i>
                        </div>
                        <div class="van-cell__value van-cell__value--alone van-field__value">
                          <div class="van-field__body">
                            <input type="search" placeholder="search" class="van-field__control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table" id="tl5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                          Water Reward
                        </th>
                        <th scope="col">
                          First Reward
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-show="apirun">         
                                    <td colspan="4">
                                      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    </td>
                      </tr>
                      <tr v-for="item in DashbordData.level5" :key="item._id" v-show="!apirun">
                        <td >
                          {{ item.id }}
                        </td>
                        <td>{{ (item.mobile) && item.mobile.slice(0, -8)+'******'+item.mobile.slice(-2)}}</td>
                        <td>{{  (item.Water_reward).toFixed(2) }}</td>
                        <td>{{ (item.First_reward).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-if="DashbordData.level5 && DashbordData.level5.length <= 0" class="null-data" style="color: #000 !important; font-weight: 400; font-size: 12px;">No data available</p>
                  <div class="pagination">
                    <ul class="page_box">
                      <li class="page">
                        <span>{{
                          lavel5Page *
                            lavel5PageRow -
                          lavel5PageRow +
                          1
                        }}-{{
                          lavel5Page *
                            lavel5PageRow
                          }}
                        </span>
                        of {{ totallavel5 }}
                      </li>
                      <li class="page_btn">
                        <i class="van-icon van-icon-arrow-left" v-on:click="handlegetlavel5Change(lavel5Page - 1)"></i>
                        <i class="van-icon van-icon-arrow" v-on:click="handlegetlavel5Change(lavel5Page + 1)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <Footer />

  <div id="bonus" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header paymentheader" id="paymenttitle">
          <h4 class="modal-title text-dark">Apply to Balance</h4>
        </div>
        <form action="#" method="post" id="bonusForm" autocomplete="off">
          <div class="modal-body  mt-1" id="loadform">
            <div class="row">
              <div class="col-12">
                <div class="inner-addon left-addon mt-3">
                  <i class="icon"><i class="fa fa-rupee"></i></i>
                  <input type="number" id="bonusammount" name="bonusammount" class="form-control" placeholder="Bonus"
                    onKeyPress="return isNumber(event)" />
                </div>
                <input type="hidden" name="userid" id="userid" class="form-control" value="376" />
                <input type="hidden" name="action" id="action" class="form-control" value="bonus" />
              </div>
            </div>
          </div>
          <input type="hidden" name="tab" id="tab" value="parity" />
          <div class="modal-footer">
            <a type="button" class="pull-left btn btn-sm closebtn" data-dismiss="modal">CANCEL</a>
            <button type="submit" class="pull-left btn btn-sm btn-white text-info">
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a type="button" class="text-info" data-dismiss="modal">OK</a>
        </div>
      </div>
    </div>
  </div>

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
    <!-- <div class="toast-content" v-show="isErrorShow" style="position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;">
    <div class="toast-message">{{ errorMessage }}</div> -->
  </div>
  <PageReload />
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import $ from "jquery";
import { Modal } from "usemodal-vue3";
import Footer from "../components/CommonFooter.vue";
import PageReload from "../components/PageReload.vue";

export default {
  components: {
    Modal,
    Footer,
    PageReload,
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Promotion Page" });
    const router = useRouter();
    const DashbordData = ref([]);
    const levelTab = ref(1);
    let isNoticeModalVisible = ref(true);
    let drop = ref(false);
    const isErrorShow = ref(false);
    const errorMessage = ref("");

    const apirun = ref(true);
    const promotioncode = ref("");

    const lavel1Page = ref(1);
    const lavel1PageRow = ref(10);
    const totallavel1 = ref(0);

    const lavel2Page = ref(1);
    const lavel2PageRow = ref(10);
    const totallavel2 = ref(0);

    const lavel3Page = ref(1);
    const lavel3PageRow = ref(10);
    const totallavel3 = ref(0);

    const lavel4Page = ref(1);
    const lavel4PageRow = ref(10);
    const totallavel4 = ref(0);

    const lavel5Page = ref(1);
    const lavel5PageRow = ref(10);
    const totallavel5 = ref(0);

    const getpromotionlink = async () => {
      axios
        .get("/get-promotion-link", {})
        .then((response) => {
          if (response.data.success === true) {
            var origin = window.location.origin;
            promotioncode.value = response.data.data.promotion_code;
            var url =
              origin +
              "/#/register?r_code=" +
              response.data.data.promotion_code;
            $("#text_element").html(url);
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const toggleDropdown = () => {
      drop.value = !drop.value;
    };
    // const getDashbordData = async () => {
    //   apirun.value = true;
    //   axios
    //     .post("/promotion-dashbord", {
    //       lavel1Page: lavel1Page.value,
    //       lavel1PageRow: lavel1PageRow.value,
    //       lavel2Page: lavel2Page.value,
    //       lavel2PageRow: lavel2PageRow.value,
    //       lavel3Page: lavel3Page.value,
    //       lavel3PageRow: lavel3PageRow.value,
    //       lavel4Page: lavel4Page.value,
    //       lavel4PageRow: lavel4PageRow.value,
    //       lavel5Page: lavel5Page.value,
    //       lavel5PageRow: lavel5PageRow.value,
    //       levelTab: levelTab.value
    //     })
    //     .then((response) => {
    //       if (response.data.success === true) {
    //         DashbordData.value = response.data.data;
    //         totallavel1.value = response.data.data.countlevel1;
    //         totallavel2.value = response.data.data.countlevel2;
    //         totallavel3.value = response.data.data.countlevel3;
    //         totallavel4.value = response.data.data.countlevel4;
    //         totallavel5.value = response.data.data.countlevel5;

    //         apirun.value = false;
    //         // var origin = window.location.origin;
    //         // var url =
    //         //   origin +
    //         //   "/#/register?r_code=" +
    //         //   response.data.data.promotion_code;
    //         // $("#text_element").html(url);
    //       } else {
    //         alert(response.data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
    const getDashbordData = async () => {
      apirun.value = true;
      axios
        .post("/promotion-dashbord-new", {
          lavel1Page: lavel1Page.value,
          lavel1PageRow: lavel1PageRow.value,
          lavel2Page: lavel2Page.value,
          lavel2PageRow: lavel2PageRow.value,
          lavel3Page: lavel3Page.value,
          lavel3PageRow: lavel3PageRow.value,
          levelTab: levelTab.value,
        })
        .then((response) => {
          if (response.data.success === true) {
            DashbordData.value = response.data.data;
            totallavel1.value = response.data.data.countlevel1;
            totallavel2.value = response.data.data.countlevel2;
            totallavel3.value = response.data.data.countlevel3;
            // totallavel4.value = response.data.data.countlevel4;
            // totallavel5.value = response.data.data.countlevel5;

            apirun.value = false;
            // var origin = window.location.origin;
            // var url =
            //   origin +
            //   "/#/register?r_code=" +
            //   response.data.data.promotion_code;
            // $("#text_element").html(url);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getpromotionlink();
      getDashbordData();
    }

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 2000);
    };
    const onCopy = async () => {
      try {
        var curl = $("#text_element").html();
        await navigator.clipboard.writeText(curl);
        // alert("Copied");
        setErrorMessage("Success");
      } catch ($e) {
        setErrorMessage("Cannot copy");

        // alert("Cannot copy");
      }
    };

    const handlegetlavel1Change = (page) => {
      var page1 = totallavel1.value / lavel1PageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          lavel1Page.value = page;
          getDashbordData();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const handlegetlavel2Change = (page) => {
      var page1 = totallavel2.value / lavel2PageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          lavel2Page.value = page;
          getDashbordData();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const handlegetlavel3Change = (page) => {
      var page1 = totallavel3.value / lavel3PageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          lavel3Page.value = page;
          getDashbordData();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const handlegetlavel4Change = (page) => {
      var page1 = totallavel4.value / lavel4PageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          lavel4Page.value = page;
          getDashbordData();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const handlegetlavel5Change = (page) => {
      var page1 = totallavel5.value / lavel5PageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          lavel5Page.value = page;
          getDashbordData();
        } else {
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };

    // showModal();
    // modal-scroll-hidden
    // $(document).on('scroll touchmove mousewheel','.promotion-notice-modal',function(e){
    //   e.stopPropagation();
    //   return false;
    // });

    return {
      toggleDropdown,
      showModal,
      hideModal,
      levelTab,
      drop,
      getDashbordData,
      DashbordData,
      onCopy,
      router,
      isNoticeModalVisible,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      handlegetlavel1Change,
      handlegetlavel2Change,
      handlegetlavel3Change,
      handlegetlavel4Change,
      handlegetlavel5Change,
      getpromotionlink,
      lavel1Page,
      lavel1PageRow,
      totallavel1,

      lavel2Page,
      lavel2PageRow,
      totallavel2,

      lavel3Page,
      lavel3PageRow,
      totallavel3,

      lavel4Page,
      lavel4PageRow,
      totallavel4,

      lavel5Page,
      lavel5PageRow,
      totallavel5,

      promotioncode,
      apirun,
    };
  },
};
</script>
<style scoped>
/* @import "../assets/css/promotion.css";
@import "../assets/css/pagination.css";
@import "../assets/css/chunk-vendors.css"; */

.lds-ring {
  display: inline-block;
  position: relative;
  /* width: 80px; */
  height: 25px;
}

.user-promotion-notice-model {
  padding-left: 30px !important;
  padding-right: 25px !important;
}

.table-sm th,
.table-sm td {
  font-size: 12px;
  padding: 14px;
}

@media only screen and (max-width:576px) {

  .table-sm th,
  .table-sm td {
    font-size: 12px;
    padding: 4px;
    padding-bottom: 15px;
  }
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 8px;
  border: 2px solid #1c1313;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #443131 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 43px;
}

.lds-ellipsis div {
  position: absolute;
  top: 15px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #0f0d0d;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
