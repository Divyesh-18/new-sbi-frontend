<template>
  <i class="bi bi-list mr-1  toggle-sidebar fs-5 cursor-pointer" @click="
      {
    issidebaropen = !this.issidebaropen;
  }
    "></i>
  <div v-bind:class="issidebaropen == true
    ? 'main-sidebar  sidebar-fixed '
    : 'mini-sidebar sidebar-fixed'
    ">
    <div class="overflow-auto sidebar_overflow">
      <div v-bind:class="issidebaropen == true
        ? 'row content border sidebar-bg-color-set  h-100 sidebar-fixed sidebar-width pt-0 '
        : 'row content border sidebar-bg-color-set  h-100 sidebar-fixed pt-0'
        ">
        <div class="col-lg-2 sidenav pl-0 d-flex flex-column">

          <div class="text-white">
            <div class="navbar_part text-capitalize fs-2 fw-bold d-flex align-items-center  coustom-sidebar-width">
              <i data-v-6919d574="" class="bi bi-person-fill"></i>
            </div>
          </div>

          <div class="">
            <router-link to="/win" class="text-white" target="_blank">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>

                <span v-bind:class="'sidebar-item'">Go To Game</span>
              </p>
            </router-link>
          </div>
          <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/desktop" class="text-white">
            <div class="coustom-add-width-sidebar-menu"
              :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/desktop' }">
              <div>
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width"
                  :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/desktop' }">
                  <i class="fa fa-dashboard mr-1 text-white"></i>

                  <span v-bind:class="'sidebar-item'">Dashboard</span>
                </p>
              </div>
            </div>
          </router-link>

          <div class="coustom-add-width-sidebar-menu" @pointerdown="isResultActive == true" @pointerup="resultToggle()">
            <div :class="isResultActive &&
              'text-white text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width'
              " id="headingThree">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>
                <span v-bind:class="'sidebar-item text-white add-width-span'">Set Result Game</span>
                <i v-show="!isResultMenuOpen" class="bi bi-chevron-down text-white" aria-hidden="true"></i>
                <i v-show="isResultMenuOpen" class="bi bi-chevron-up text-white" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <div class="" v-show="(isOpenResultMenu(), isResultMenuOpen)">
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/oneMinResultSet" class="text-white">
              <div class="coustom-add-width-sidebar-menu"
                :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/oneMinResultSet' }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center pl-2 ml-2 coustom-sidebar-width"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/oneMinResultSet',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">One Minute Result</span>
                  </p>
                </div>
              </div>
            </router-link>
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/setresultgame" class="text-white">
              <div class="coustom-add-width-sidebar-menu"
                :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/setresultgame' }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center pl-2 ml-2 coustom-sidebar-width"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/setresultgame',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Three Minute Result</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <!-- Period History Drop Down -->
          <div class="coustom-add-width-sidebar-menu" @pointerdown="isPeriodHistoryMenuActive == true"
            @pointerup="periodhistoryToggle()">
            <div :class="isPeriodHistoryMenuActive &&
              'text-white text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width'
              " id="headingThree">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>
                <span v-bind:class="'sidebar-item text-white add-width-span'">Period History</span>
                <i v-show="!isPeriodHistoryMenuOpen" class="bi bi-chevron-down text-white" aria-hidden="true"></i>
                <i v-show="isPeriodHistoryMenuOpen" class="bi bi-chevron-up text-white" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <!--Period History Drop Down Option -->
          <div class="" v-show="(isOpenPeriodHistoryMenu(), isPeriodHistoryMenuOpen)">
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/one-minute-period-history" class="text-white">
              <div class="coustom-add-width-sidebar-menu"
                :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/one-minute-period-history' }">
                <div>
                  <p class="text-capitalize fs-2 pl-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/one-minute-period-history',
                    }">
                    <!-- <i class="bi bi-clock-history mr-1 text-white"></i> -->
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">One Minute History</span>
                  </p>
                </div>
              </div>
            </router-link>
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/periodhistory" class="text-white">
              <div class="coustom-add-width-sidebar-menu"
                :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/periodhistory' }">
                <div>
                  <p class="text-capitalize fs-2 pl-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/periodhistory',
                    }">
                    <!-- <i class="bi bi-clock-history mr-1 text-white"></i> -->
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Three Minute History</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/red-envelope" class="text-white">
            <div class="coustom-add-width-sidebar-menu"
              :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/red-envelope' }">
              <div>
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width" :class="{
                  'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/red-envelope',
                }">
                  <!-- <i class="bi bi-clock-history mr-1 text-white"></i> -->
                  <i class="fa fa-dashboard mr-1 text-white"></i>
                  <span v-bind:class="'sidebar-item'">Red Envelope</span>
                </p>
              </div>
            </div>
          </router-link>
          <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/alluser" class="text-white">
            <div class="coustom-add-width-sidebar-menu"
              :class="{ 'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/alluser' }">
              <div>
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width" :class="{
                  'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/alluser',
                }">
                  <i class="fa fa-dashboard mr-1 text-white"></i>

                  <span v-bind:class="'sidebar-item'">All Users</span>
                </p>
              </div>
            </div>
          </router-link>
          <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/userwallethistory" class="text-white">
            <div class="coustom-add-width-sidebar-menu" :class="{
              'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/userwallethistory',
            }">
              <div>
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width" :class="{
                  'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/userwallethistory',
                }">
                  <i class="fa fa-dashboard mr-1 text-white"></i>

                  <span v-bind:class="'sidebar-item'">User Wallet History</span>
                </p>
              </div>
            </div>
          </router-link>
          <!-- Recharge Hestory Drowp Down -->
          <div class="coustom-add-width-sidebar-menu" @pointerdown="isAccountCollapseActive == true"
            @pointerup="accountCollapseToggle()">
            <div :class="isAccountCollapseActive &&
              'text-white text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width'
              " id="headingThree">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>
                <span v-bind:class="'sidebar-item text-white add-width-span'">Recharge History</span>
                <i v-show="!isAccountCollapseOpen" class="bi bi-chevron-down text-white" aria-hidden="true"></i>
                <i v-show="isAccountCollapseOpen" class="bi bi-chevron-up text-white" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <!-- Recharge Hestory Drowp Down Options  -->
          <div class="" v-show="(isOpenRechargeHistoryMenu(), isAccountCollapseOpen)">
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/pendingrequest" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/pendingrequest',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/pendingrequest',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Pending Recharge</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/acceptrequest" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/acceptrequest',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/acceptrequest',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Accept Recharge</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/rejectrequest" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/rejectrequest',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/rejectrequest',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Reject Recharge</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Withdrawal Hestory Drowp Down -->
          <div class="coustom-add-width-sidebar-menu" @pointerdown="iswithdrawalCollapseActive == true"
            @pointerup="withdrawalCollapseToggle()">
            <div :class="iswithdrawalCollapseActive &&
              'text-white text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width'
              " id="headingThree">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>
                <span v-bind:class="'sidebar-item text-white add-width-span'">Withdrawal History</span>
                <i v-show="!iswithdrawalCollapseOpen" class="bi bi-chevron-down text-white" aria-hidden="true"></i>
                <i v-show="iswithdrawalCollapseOpen" class="bi bi-chevron-up text-white" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <!-- Withdrawal Hestory Drowp Down Options  -->
          <div class="" v-show="(isOpenwithdrawalHistoryMenu(), iswithdrawalCollapseOpen)">
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminrequestpenddingwithdrawal" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu':
                  $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminrequestpenddingwithdrawal',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu':
                        $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminrequestpenddingwithdrawal',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Withdrawal Pendding</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminacceptwithdrawal" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminacceptwithdrawal',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu':
                        $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminacceptwithdrawal',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Withdrawal Accept</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminrejectwithdrawal" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminrejectwithdrawal',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu':
                        $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminrejectwithdrawal',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Withdrawal Reject</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminqueries" class="text-white">
            <div class="coustom-add-width-sidebar-menu" :class="{
              'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminqueries',
            }">
              <div>
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width" :class="{
                  'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminqueries',
                }">
                  <i class="fa fa-dashboard mr-1 text-white"></i>
                  <span v-bind:class="'sidebar-item'">Queries</span>
                </p>
              </div>
            </div>
          </router-link>
          <!-- Setting Drop Down  -->
          <div class="coustom-add-width-sidebar-menu" @pointerdown="issettingCollapseActive == true"
            @pointerup="settingCollapseToggle()">
            <div :class="issettingCollapseActive &&
              'text-white text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width'
              " id="headingThree">
              <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width">
                <i class="fa fa-dashboard mr-1 text-white"></i>
                <span v-bind:class="'sidebar-item text-white add-width-span'">Setting</span>
                <i v-show="!issettingCollapseOpen" class="bi bi-chevron-down text-white" aria-hidden="true"></i>
                <i v-show="issettingCollapseOpen" class="bi bi-chevron-up text-white" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <!-- Setting Hestory Drowp Down Options  -->
          <div class="" v-show="(isOpenSiteSettingyMenu(), issettingCollapseOpen)">
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/setting" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/setting',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/setting',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Site Setting</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminnotification" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminnotification',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminnotification',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Notification</span>
                  </p>
                </div>
              </div>
            </router-link>

            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminmanagebanner" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminmanagebanner',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminmanagebanner',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Manage Banner</span>
                  </p>
                </div>
              </div>
            </router-link>
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminsetlaveluser" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminsetlaveluser',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminsetlaveluser',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>

                    <span v-bind:class="'sidebar-item'">Set Level User</span>
                  </p>
                </div>
              </div>
            </router-link>
            <router-link to="/dgklhtobgoijbrtoidfbgfgerjot/adminmanageproduct" class="text-white">
              <div class="coustom-add-width-sidebar-menu" :class="{
                'active-menu': $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminmanageproduct',
              }">
                <div>
                  <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width pl-2"
                    :class="{
                      'active-menu':
                        $route.path === '/dgklhtobgoijbrtoidfbgfgerjot/adminmanageproduct',
                    }">
                    <i class="fa fa-dashboard mr-1 text-white"></i>
                    <span v-bind:class="'sidebar-item'">Manage Products</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="coustom-add-width-sidebar-menu" v-on:click="showModel">
            <div class="" v-on:click="showModel">
              <div class="text-white" v-on:click="showModel">
                <p class="text-capitalize fs-2 fw-bold d-flex align-items-center ml-2 coustom-sidebar-width"
                  v-on:click="showModel">
                  <i class="fa fa-dashboard mr-1 text-white"></i>
                  <span v-bind:class="'sidebar-item'">Logout</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="notification-modals" v-if="isLogOutModalVisible">
    <div class="modal-containers">
      <div class="modal-headers">
        <b>Are You Sure You Want To Logout?</b>
      </div>
      <div class="modal-footers">
        <button class="btn btn-comman active" @click="hideModal">Cancel</button>
        <button class="btn btn-comman active" @click="logout(), hideModal()">
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SaidManuBar",
  data() {
    let isAccountCollapseActive = ref(false);
    let isPeriodHistoryMenuActive = ref(false);
    let isResultActive = ref(false);
    let isAccountCollapseOpen = ref(false);
    let isPeriodHistoryMenuOpen = ref(false);
    let isResultMenuOpen = ref(false);
    let iswithdrawalCollapseOpen = ref(false);
    let iswithdrawalCollapseActive = ref(false);
    let issettingCollapseActive = ref(false);
    let issettingCollapseOpen = ref(false);
    let isLogOutModalVisible = ref(false);
    const accountCollapseToggle = async () => {
      isAccountCollapseOpen.value = !isAccountCollapseOpen.value;
      isAccountCollapseActive.value = false;
      if (this.isAccountCollapseOpen == true) {
        this.iswithdrawalCollapseOpen = false;
        this.issettingCollapseOpen = false;
      }
    };

    const periodhistoryToggle = async () => {
      isPeriodHistoryMenuOpen.value = !isPeriodHistoryMenuOpen.value;
      isPeriodHistoryMenuActive.value = false;
      if (this.isPeriodHistoryMenuOpen == true) {
        this.iswithdrawalCollapseOpen = false;
        this.issettingCollapseOpen = false;
      }
    };
    const resultToggle = async () => {
      isResultMenuOpen.value = !isResultMenuOpen.value;
      isResultActive.value = false;
      if (this.isResultMenuOpen == true) {
        this.iswithdrawalCollapseOpen = false;
        this.issettingCollapseOpen = false;
      }
    };


    const withdrawalCollapseToggle = async () => {
      iswithdrawalCollapseOpen.value = !iswithdrawalCollapseOpen.value;
      iswithdrawalCollapseActive.value = false;
      if (this.iswithdrawalCollapseOpen == true) {
        this.isAccountCollapseOpen = false;
        this.isPeriodHistoryMenuOpen = false;
        this.isResultMenuOpen = false;
        this.issettingCollapseOpen = false;
      }
    };
    const settingCollapseToggle = async () => {
      issettingCollapseOpen.value = !issettingCollapseOpen.value;
      issettingCollapseActive.value = false;
      if (this.issettingCollapseOpen == true) {
        this.isAccountCollapseOpen = false;
        this.isPeriodHistoryMenuOpen = false;
        this.isResultMenuOpen = false,
          this.iswithdrawalCollapseOpen = false;
      }
    };
    return {
      issidebaropen: true,
      accountCollapseToggle,
      periodhistoryToggle,
      resultToggle,
      isAccountCollapseActive,
      isPeriodHistoryMenuActive,
      isResultActive,
      isAccountCollapseOpen,
      isPeriodHistoryMenuOpen,
      isResultMenuOpen,
      withdrawalCollapseToggle,
      iswithdrawalCollapseOpen,
      iswithdrawalCollapseActive,
      settingCollapseToggle,
      issettingCollapseOpen,
      issettingCollapseActive,
      isLogOutModalVisible,
    };
  },
  created() {
    this.router = this.$router;
  },
  methods: {
    logout() {
      const userInfo = localStorage.getItem("user-info");
      if (!userInfo) {
        alert("Admin Not Found");
      } else {
        localStorage.removeItem("user-info");
        this.router.push({ path: "/dgklhtobgoijbrtoidfbgfgerjot" });
      }
    },
    hideModal() {
      this.isLogOutModalVisible = false;
      document.body.classList.remove("modal-open");
    },
    showModel() {
      this.isLogOutModalVisible = true;
      document.body.classList.add("modal-open");
    },

    isOpenRechargeHistoryMenu() {
      if (
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/pendingrequest" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/acceptrequest" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/rejectrequest"
      ) {
        this.isAccountCollapseOpen = true;
      }
    },
    isOpenPeriodHistoryMenu() {
      if (
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/one-minute-period-history" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/periodhistory"
      ) {
        this.isPeriodHistoryMenuOpen = true;
      }
    },
    isOpenResultMenu() {
      if (
        this.$route.path === '/dgklhtobgoijbrtoidfbgfgerjot/setresultgame' ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/oneMinResultSet"
      ) {
        this.isResultMenuOpen = true;
      }
    },
    isOpenwithdrawalHistoryMenu() {
      if (
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminrequestpenddingwithdrawal" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminacceptwithdrawal" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminrejectwithdrawal"
      ) {
        this.iswithdrawalCollapseOpen = true;
      }
    },
    isOpenSiteSettingyMenu() {
      if (
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/setting" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminnotification" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminmanagebanner" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminsetlaveluser" ||
        this.$route.path === "/dgklhtobgoijbrtoidfbgfgerjot/adminmanageproduct"
      ) {
        this.issettingCollapseOpen = true;
      }
    },
  },
};
</script>

<style>
.sidebar_overflow {
  height: 92vh;
}

@import "../../assets/css/admin-style/admin-sidebar.css";

.notification-modals {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.modal-containers {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-headers {
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-footers {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
