<template>
  <!-- <link rel="stylesheet" :href="'/css/order.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/pagination.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../../../assets/images/left.png')" />
      </a>
      <div class="pageTitle">WinGo One Minute Orders</div>
    </div>
  </div>
  <div class="order-wrapper">
    <ul class="nav nav-tabs size2 level" id="myTab3" role="tablist">
      <li class="nav-item">
        <a v-on:click="levelTab = 1; getuserresults();" :class="levelTab === 1 ? 'nav-link active' : 'nav-link'"
          id="home-tab1" data-toggle="tab" role="tab">All</a>
      </li>
      <li class="nav-item">
        <a v-on:click="levelTab = 2; getuserresults();" :class="levelTab === 2 ? 'nav-link active' : 'nav-link'"
          data-toggle="tab" role="tab">UNDELIVER</a>
      </li>
      <li class="nav-item">
        <a v-on:click="levelTab = 3; getuserresults();" :class="levelTab === 3 ? 'nav-link active' : 'nav-link'"
          id="profile-tab3" data-toggle="tab" role="tab">UNRECEIVE</a>
      </li>
      <li class="nav-item">
        <a v-on:click="levelTab = 4; getuserresults();" :class="levelTab === 4 ? 'nav-link active' : 'nav-link'"
          id="profile-tab4" data-toggle="tab" role="tab">SUCCESS</a>
      </li>
    </ul>
  </div>
  <div class="listView appContent1-addbankcard">
    <div class="tab-content" id="myTabContent">
      <div v-if="levelTab === 1" class="tab-pane fade active show" id="level1" role="tabpanel">
        <div class="table-responsive">
          <div class="table-container">
            <table class="table table-borderless" id="myrecordparityt">
              <thead style="display: none">
                <tr>
                  <th class="kkk"></th>
                </tr>
              </thead>
              <tbody>
                <!-- <div id="paritywait"></div> -->
                <tr v-on:click="
                  isResultCollapseOpen =
                  isResultCollapseOpen === item.id ? '' : item.id
                  " v-for="item in waitlist" :key="item.id" class="clickable user-order-table arrow-custom">
                  <td class="myRecordTd" style="border: none">
                    <div class="van-cell van-cell--clickable van-collapse-item__title"
                      style="background-color: #ffff !important;">
                      <span>{{ item.periodid }} &nbsp; &nbsp;
                        <span class="text-warning"> wait </span>
                      </span>
                      <div :class="isResultCollapseOpen === item.id ? 'testing' : ''
                        ">
                        <!-- <i class="van-icon van-icon-arrow van-cell__right-icon"></i> -->
                        <!-- <i class="bi bi-chevron-down add-icon-size" ></i> -->
                      </div>
                    </div>
                    <div id="t" class="detail mt-1 mb-1 p-1" v-show="isResultCollapseOpen === item.id ? true : false"
                      style="padding: 0px 30px">
                      <p style="color: #2d9688; text-align: start; font-weight: bolder;">Period Detail</p>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Period</div>
                        <div class="point2 addclass">{{ item.period }}</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Money</div>
                        <div class="point2 addclass">
                          {{ item.amount.toFixed(2) }}
                        </div>
                      </div>

                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Delivery</div>
                        <div class="point2 addclass orange" style="color: #f39839">
                          {{ ((item.amount * 95) / 100).toFixed(2) }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Fee</div>
                        <div class="point2 addclass">
                          {{ ((item.amount * 5) / 100).toFixed(2) }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Open Price</div>
                        <div class="point2 addclass">wait</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Result</div>
                        <div class="point2 addclass" style="color: #2197f3">
                          Wait
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Select</div>
                        <div class="point2 addclass" style="color: #4caf50 !important" v-if="item.value === 'Green'">
                          {{ item.value }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important" v-else-if="item.value === 'Red'">
                          {{ item.value }}
                        </div>
                        <div class="point2 addclass" style="color: rgb(156, 39, 176) !important"
                          v-else-if="item.value === 'Violet'">
                          {{ item.value }}
                        </div>
                        <div class="point2 addclass" v-else>
                          {{ item.value }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Status</div>
                        <div class="point2 addclass" style="color: #f39839 !important; font-size: 14px">
                          Wait
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Amount</div>
                        <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                          v-if="item.status === 'success'"></div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Create Time</div>
                        <div class="point2 addclass">{{ formatDate(item.created_at) }}</div>
                      </div>
                      <!-- <div class="mt-1" style="display: flex">
      <div class="point2 addclass">Type</div>
      <div class="point2 addclass">{{ item.type }}</div>
    </div> -->
                      <div class="mt-1 pre-pay-btn" style="display: flex">
                        <div class="point2 addclass"></div>
                        <!-- <router-link to="/product?goodsId=25"> -->
                        <button class="btn-primary">Pre Pay</button>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-on:click="
                  isResultCollapseOpen =
                  isResultCollapseOpen === item.id ? '' : item.id
                  " v-for="item in userresultList" :key="item.id" class="clickable user-order-table">
                  <td class="myRecordTd" style="border: none">
                    <div class="van-cell van-cell--clickable van-collapse-item__title"
                      style="background-color: #ffff !important;">
                      <span>{{ item.period }} &nbsp; &nbsp;
                        <span :class="'text-success'" v-if="item.status === 'success'">
                          {{ item.status ? "success" : "Fail" }}
                          &nbsp;&nbsp;&nbsp; +{{ item.delivery }}
                        </span>

                        <span :class="'text-danger'" v-else>
                          {{ item.status ? "Fail" : "success" }}
                          &nbsp;&nbsp;&nbsp; -{{ item.delivery }}
                        </span>
                      </span>
                      <div :class="isResultCollapseOpen === item.id ? 'testing' : ''
                        ">
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                      </div>
                    </div>
                    <div id="t" class="myRecordDetail detail mt-1"
                      v-show="isResultCollapseOpen === item.id ? true : false">
                      <p style="color: #2d9688; font-size: 14px; text-align: start; font-weight: bolder;">Period Detail
                      </p>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Period</div>
                        <div class="point2 addclass">{{ item.period }}</div>
                        <!-- {{console.log("hi",item.periodid)}} -->
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Money</div>
                        <div class="point2 addclass">
                          {{ item.contract_money }}
                        </div>
                        <!-- {{console.log("hi",item?.contract_money)}} -->
                      </div>
                      <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Count</div>
                        <div class="point2 addclass">{{ item.contract_count }}</div>
                      </div> -->
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Delivery</div>
                        <div class="point2 addclass orange" style="color: #f39839">
                          {{ item.delivery }}
                        </div>
                        <!-- {{console.log("hi",item.delivery)}} -->
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Fee</div>
                        <div class="point2 addclass">{{ item.fee }}</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Open Price</div>
                        <div class="point2 addclass">{{ item.open_price }}</div>
                        <!-- {{console.log("p",item.open_price)}} -->
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Result</div>
                        <div class="point2 addclass" style="color: #2197f3">
                          {{ item.result_number }}
                          <span style="color: rgb(76, 175, 80)" v-if="item.result_color === 'Green'">{{
                            item.result_color }}</span>
                          <span style="color: #ff0000" v-else-if="item.result_color === 'Red'">{{ item.result_color
                            }}</span>
                          <span style="color: rgb(156, 39, 176)" v-else-if="item.result_color === 'Violet'">{{
                            item.result_color }}</span>
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Select</div>
                        <!-- <div class="point2 addclass" style="color:#2197f3">{{ item.select }}</div> -->
                        <div class="point2 addclass" style="color: #4caf50 !important" v-if="item.select === 'Green'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important"
                          v-else-if="item.select === 'Red'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: rgb(156, 39, 176) !important"
                          v-else-if="item.select === 'Violet'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: #2197f3" v-else>
                          {{ item.select }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Status</div>
                        <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                          v-if="item.status === 'success'">
                          {{ item.status }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                          {{ item.status }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Amount</div>
                        <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                          v-if="item.status === 'success'">
                          +{{ item.amount }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                          -{{ item.amount }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Create Time</div>
                        <div class="point2 addclass">{{ formatDate(item.created_at) }}</div>
                      </div>
                      <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Type</div>
                        <div class="point2 addclass">{{ item.type }}</div>
                      </div> -->
                      <div class="mt-1 pre-pay-btn" style="display: flex">
                        <div class="point2 addclass"></div>
                        <!-- <router-link to="/product?goodsId=25"> -->
                        <button class="btn-primary">Pre Pay</button>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <p v-show="userresultList && waitlist" style="
                font-size: 12px;
                text-align: center;
                padding: 15px 0px;
                color: rgb(136, 136, 136) !important;
                margin-bottom: 0;
              ">
              <span v-show="!userwaitlist"> no more </span>
            </p> -->
          </div>
          <p v-show="!userresultList && !waitlist" style="
              font-size: 12px;
              text-align: center;
              padding: 15px 0px;
              color: rgb(136, 136, 136) !important;
            ">
            <span v-show="!userwaitlist"> No More data available </span>
          </p>
          <div class="pagination" style="padding-bottom:60px;">
            <ul class="page_box">
              <li class="page">
                <span>{{ userresultsPage * userresultsPageRow - userresultsPageRow + 1
                  }} to {{ userresultsPage * userresultsPageRow }}
                </span>
              </li>
              <li class="page_btn">
                <i class="van-icon van-icon-arrow-left"
                  v-on:click="handleuserresultsPageChange(userresultsPage - 1)"></i>
                <i class="van-icon van-icon-arrow" v-on:click="handleuserresultsPageChange(userresultsPage + 1)"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="levelTab === 2" class="tab-pane fade active show" id="level2" role="tabpanel">
        <div class="table-responsive">
          <table class="table table-borderless" id="myrecordparityt">
            <tbody>
              <tr v-on:click="
                    isResultCollapseOpen =
                    isResultCollapseOpen === item.id ? '' : item.id
                    " v-for="item in waitlist" :key="item.id" class="clickable user-order-table">
                <td class="myRecordTd" style="border: none">
                  <div class="van-cell van-cell--clickable van-collapse-item__title"
                    style="background-color: #ffff !important;">
                    <span>{{ item.periodid }} &nbsp; &nbsp;
                      <span class="text-warning"> wait </span>
                    </span>
                    <div :class="isResultCollapseOpen === item.id ? 'testing' : ''
                          ">
                      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                  </div>

                  <div id="t" class="detail mt-1 mb-1 p-1" v-show="isResultCollapseOpen === item.id ? true : false"
                    style="padding: 0px 30px">
                    <p style="color: #2d9688; text-align: start; font-weight: bolder;">Period Detail</p>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Period</div>
                      <div class="point2 addclass">{{ item.periodid }}</div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Contract Money</div>
                      <div class="point2 addclass">
                        {{ item.amount.toFixed(2) }}
                      </div>
                    </div>

                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Delivery</div>
                      <div class="point2 addclass orange" style="color: #f39839">
                        {{ ((item.amount * 95) / 100).toFixed(2) }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Fee</div>
                      <div class="point2 addclass">
                        {{ ((item.amount * 5) / 100).toFixed(2) }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Open Price</div>
                      <div class="point2 addclass">wait</div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Result</div>
                      <div class="point2 addclass" style="color: #2197f3">
                        Wait
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Select</div>
                      <div class="point2 addclass" style="color: #4caf50 !important" v-if="item.value === 'Green'">
                        {{ item.value }}
                      </div>
                      <div class="point2 addclass" style="color: #ff0000 !important" v-else-if="item.value === 'Red'">
                        {{ item.value }}
                      </div>
                      <div class="point2 addclass" style="color: rgb(156, 39, 176) !important"
                        v-else-if="item.value === 'Violet'">
                        {{ item.value }}
                      </div>
                      <div class="point2 addclass" v-else>
                        {{ item.value }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Status</div>
                      <div class="point2 addclass" style="color: #f39839 !important; font-size: 14px">
                        Wait
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Amount</div>
                      <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                        v-if="item.status === 'success'"></div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Create Time</div>
                      <div class="point2 addclass">
                        {{ formatDate(item.created_at) }}
                      </div>
                    </div>
                    <!-- <div class="mt-1" style="display: flex">
      <div class="point2 addclass">Type</div>
      <div class="point2 addclass">{{ item.type }}</div>
    </div> -->
                    <div class="mt-1 pre-pay-btn" style="display: flex">
                      <div class="point2 addclass"></div>
                      <!-- <router-link to="/product?goodsId=25"> -->
                      <button class="btn-primary">Pre Pay</button>
                      <!-- </router-link> -->
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-show="!userresultList.wait" style="
            font-size: 12px;
            text-align: center;
            padding: 15px 0px;
            color: rgb(136, 136, 136) !important;
          ">
          <span> No More data available </span>
        </p>
        <div class="pagination" style="padding-bottom:60px;">
          <ul class="page_box">
            <li class="page">
              <span>{{ userresultsPage * userresultsPageRow - userresultsPageRow + 1
                }} to {{ userresultsPage * userresultsPageRow }}
              </span>
            </li>
            <li class="page_btn">
              <i class="van-icon van-icon-arrow-left" v-on:click="handleuserresultsPageChange(userresultsPage - 1)"></i>
              <i class="van-icon van-icon-arrow" v-on:click="handleuserresultsPageChange(userresultsPage + 1)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="levelTab === 3" class="tab-pane fade active show" id="level3" role="tabpanel">
        <div class="table-responsive">
          <table class="table table-borderless" id="myrecordparityt">
            <tbody>
              <tr v-on:click="
                    isResultCollapseOpen =
                    isResultCollapseOpen === item.id ? '' : item.id
                    " v-for="item in userresultList" :key="item._id" class="clickable user-order-table"
                v-show="item.status === 'Fail'">
                <td class="myRecordTd" style="border: none">
                  <div class="van-cell van-cell--clickable van-collapse-item__title"
                    style="background-color: #ffff !important;">
                    <span>{{ item.period }} &nbsp; &nbsp;
                      <span :class="'text-success'" v-if="item.status === 'success'">
                        {{ item.status === "success" ? "success" : "Fail" }}
                        &nbsp;&nbsp;&nbsp; +{{ item.delivery }}
                      </span>

                      <span :class="'text-danger'" v-else>
                        {{ item.status === "success" ? "success" : "Fail" }}
                        &nbsp;&nbsp;&nbsp; -{{ item.delivery }}
                      </span>
                    </span>
                    <div :class="isResultCollapseOpen === item.id ? 'testing' : ''
                          ">
                      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                  </div>
                  <div id="t" class="myRecordDetail detail mt-1"
                    v-show="isResultCollapseOpen === item.id ? true : false">
                    <p style="color: #2d9688; font-size: 14px; text-align: start; font-weight: bolder;">Period
                      Detail</p>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Period</div>
                      <div class="point2 addclass">{{ item.period }}</div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Contract Money</div>
                      <div class="point2 addclass">
                        {{ item.contract_money }}
                      </div>
                    </div>
                    <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Count</div>
                        <div class="point2 addclass">{{ item.contract_count }}</div>
                      </div> -->
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Delivery</div>
                      <div class="point2 addclass orange" style="color: #f39839">
                        {{ item.delivery }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Fee</div>
                      <div class="point2 addclass">{{ item.fee }}</div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Open Price</div>
                      <div class="point2 addclass">
                        {{ item.open_price }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Result</div>
                      <div class="point2 addclass" style="color: #2197f3">
                        {{ item.result_number }}
                        <span style="color: rgb(76, 175, 80)" v-if="item.result_color === 'Green'">{{
                          item.result_color }}</span>
                        <span style="color: #ff0000" v-else-if="item.result_color === 'Red'">{{ item.result_color
                          }}</span>
                        <span style="color: rgb(156, 39, 176)" v-else-if="item.result_color === 'Violet'">{{
                          item.result_color }}</span>
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Select</div>
                      <!-- <div class="point2 addclass" style="color:#2197f3">{{ item.select }}</div> -->
                      <div class="point2 addclass" style="color: #4caf50 !important" v-if="item.select === 'Green'">
                        {{ item.select }}
                      </div>
                      <div class="point2 addclass" style="color: #ff0000 !important" v-else-if="item.select === 'Red'">
                        {{ item.select }}
                      </div>
                      <div class="point2 addclass" style="color: rgb(156, 39, 176) !important"
                        v-else-if="item.select === 'Violet'">
                        {{ item.select }}
                      </div>
                      <div class="point2 addclass" style="color: #2197f3" v-else>
                        {{ item.select }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Status</div>
                      <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                        v-if="item.status === 'success'">
                        {{ item.status }}
                      </div>
                      <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                        {{ item.status }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Amount</div>
                      <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                        v-if="item.status === 'success'">
                        +{{ item.amount }}
                      </div>
                      <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                        -{{ item.amount }}
                      </div>
                    </div>
                    <div class="mt-1" style="display: flex">
                      <div class="point2 addclass">Create Time</div>
                      <div class="point2 addclass">
                        {{ formatDate(item.created_at) }}
                      </div>
                    </div>
                    <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Type</div>
                        <div class="point2 addclass">{{ item.type }}</div>
                      </div> -->
                    <div class="mt-1 pre-pay-btn" style="display: flex">
                      <div class="point2 addclass"></div>
                      <!-- <router-link to="/product?goodsId=25"> -->
                      <button class="btn-primary">Pre Pay</button>
                      <!-- </router-link> -->
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-show="userresultList.loss" style="
              font-size: 12px;
              text-align: center;
              padding: 15px 0px;
              color: rgb(136, 136, 136) !important;
            ">
            <span v-show="!userwaitlist"> no more </span>
          </p>
        </div>
        <p v-show="!userresultList" style="
            font-size: 12px;
            text-align: center;
            padding: 15px 0px;
            color: rgb(136, 136, 136) !important;
          ">
          <span v-show="!userwaitlist"> No More data available </span>
        </p>
        <div class="pagination" style="padding-bottom:60px;">
          <ul class="page_box">
            <li class="page">
              <span>{{ userresultsPage * userresultsPageRow - userresultsPageRow + 1
                }} to {{ userresultsPage * userresultsPageRow }}
              </span>
            </li>
            <li class="page_btn">
              <i class="van-icon van-icon-arrow-left" v-on:click="handleuserresultsPageChange(userresultsPage - 1)"></i>
              <i class="van-icon van-icon-arrow" v-on:click="handleuserresultsPageChange(userresultsPage + 1)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="levelTab === 4" class="tab-pane fade active show" id="level4" role="tabpanel">
        <div class="table-responsive">
          <div class="table-container">
            <table class="table table-borderless" id="myrecordparityt">
              <tbody>
                <tr v-on:click="
                  isResultCollapseOpen =
                  isResultCollapseOpen === item.id ? '' : item.id
                  " v-for="item in userresultList" :key="item.id" class="clickable user-order-table"
                  v-show="item.status === 'success'">
                  <td class="myRecordTd" style="border: none">
                    <div class="van-cell van-cell--clickable van-collapse-item__title"
                      style="background-color: #ffff !important;">
                      <span>{{ item.period }} &nbsp; &nbsp;
                        <span :class="'text-success'" v-if="item.status === 'success'">
                          {{ item.status === "success" ? "success" : "Fail" }}
                          &nbsp;&nbsp;&nbsp; +{{ item.delivery }}
                        </span>

                        <span :class="'text-danger'" v-else>
                          {{ item.status === "success" ? "success" : "Fail" }}
                          &nbsp;&nbsp;&nbsp; -{{ item.delivery }}
                        </span>
                      </span>
                      <div :class="isResultCollapseOpen === item.id ? 'testing' : ''
                        ">
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                      </div>
                    </div>
                    <div id="t" class="myRecordDetail detail mt-1"
                      v-show="isResultCollapseOpen === item.id ? true : false">
                      <p style="color: #2d9688; font-size: 14px; text-align: start; font-weight: bolder;">Period Detail
                      </p>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Period</div>
                        <div class="point2 addclass">{{ item.period }}</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Money</div>
                        <div class="point2 addclass">
                          {{ item.contract_money }}
                        </div>
                      </div>
                      <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Contract Count</div>
                        <div class="point2 addclass">{{ item.contract_count }}</div>
                      </div> -->
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Delivery</div>
                        <div class="point2 addclass orange" style="color: #f39839">
                          {{ item.delivery }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Fee</div>
                        <div class="point2 addclass">{{ item.fee }}</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Open Price</div>
                        <div class="point2 addclass">{{ item.open_price }}</div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Result</div>
                        <div class="point2 addclass" style="color: #2197f3">
                          {{ item.result_number }}
                          <span style="color: rgb(76, 175, 80)" v-if="item.result_color === 'Green'">{{
                            item.result_color }}</span>
                          <span style="color: #ff0000" v-else-if="item.result_color === 'Red'">{{ item.result_color
                            }}</span>
                          <span style="color: rgb(156, 39, 176)" v-else-if="item.result_color === 'Violet'">{{
                            item.result_color }}</span>
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Select</div>
                        <!-- <div class="point2 addclass" style="color:#2197f3">{{ item.select }}</div> -->
                        <div class="point2 addclass" style="color: #4caf50 !important" v-if="item.select === 'Green'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important"
                          v-else-if="item.select === 'Red'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: rgb(156, 39, 176) !important"
                          v-else-if="item.select === 'Violet'">
                          {{ item.select }}
                        </div>
                        <div class="point2 addclass" style="color: #2197f3" v-else>
                          {{ item.select }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Status</div>
                        <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                          v-if="item.status === 'success'">
                          {{ item.status }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                          {{ item.status }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Amount</div>
                        <div class="point2 addclass" style="color: #4caf50 !important; font-size: 14px"
                          v-if="item.status === 'success'">
                          +{{ item.amount }}
                        </div>
                        <div class="point2 addclass" style="color: #ff0000 !important; font-size: 14px" v-else>
                          -{{ item.amount }}
                        </div>
                      </div>
                      <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Create Time</div>
                        <div class="point2 addclass">{{ formatDate(item.created_at) }}</div>
                      </div>
                      <!-- <div class="mt-1" style="display: flex">
                        <div class="point2 addclass">Type</div>
                        <div class="point2 addclass">{{ item.type }}</div>
                      </div> -->
                      <div class="mt-1 pre-pay-btn" style="display: flex">
                        <div class="point2 addclass"></div>
                        <!-- <router-link to="/product?goodsId=25"> -->
                        <button class="btn-primary">Pre Pay</button>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-show="userresultList.win" style="
                font-size: 12px;
                text-align: center;
                padding: 15px 0px;
                color: rgb(136, 136, 136) !important;
              ">
              <span v-show="!userwaitlist"> no more </span>
            </p>
          </div>
          <p v-show="!userresultList" style="
              font-size: 12px;
              text-align: center;
              padding: 15px 0px;
              color: rgb(136, 136, 136) !important;
            ">
            <span v-show="!userwaitlist"> No More data available </span>
          </p>
          <div class="pagination" style="padding-bottom:60px;">
            <ul class="page_box">
              <li class="page">
                <span>{{ userresultsPage * userresultsPageRow - userresultsPageRow + 1
                  }} to {{ userresultsPage * userresultsPageRow }}
                </span>
              </li>
              <li class="page_btn">
                <i class="van-icon van-icon-arrow-left"
                  v-on:click="handleuserresultsPageChange(userresultsPage - 1)"></i>
                <i class="van-icon van-icon-arrow" v-on:click="handleuserresultsPageChange(userresultsPage + 1)"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="toast-content" style="position:fixed;top: 0px;bottom: 0px;left: 0px;right: 0px; display: none;">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>
  <Loader :isShow="loader" />

  <Footer />
  <PageReload />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, watch } from "vue";
import Footer from "../../../components/CommonFooter.vue";
import PageReload from "../../../components/PageReload.vue";
import Loader from "../../../components/UserLoader.vue";
export default {
  components: {
    Footer,
    PageReload,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },

  setup() {
    // useMeta({ title: "Order Page" });
    const router = useRouter();
    const levelTab = ref(1);
    const userresultsPage = ref(1);
    const userresultsPageRow = ref(10);
    const userresultsPageRowOpen = ref(false);
    const totaluserresults = ref(0);
    const userresultList = ref("");
    let isResultCollapseOpen = ref("");
    let gameid = ref("");
    let waitlist = ref("");
    let errorMessage = ref("");
    let loader = ref(false);
    const gameidfun = async () => {
      axios
        .get("/one/min/period-id", {})
        .then((response) => {
          if (response.data.success === true) {
            gameid.value = response.data.data.gameid;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    watch(levelTab, (newValue) => {
      if (newValue === 1 || newValue === 2 || newValue === 3 || newValue === 4) {
        userresultsPage.value = 1;
        getuserresults();
      }
    });
    const getuserresults = () => {
      loader.value = true;
      axios
        .post("/one/min/order-list", {
          page: userresultsPage.value,
          pagerow: userresultsPageRow.value,
          levelTab: levelTab.value,
          category: "parity",
          periodid: gameid.value,
        })
        .then((response) => {
          if (response.data.success) {
            userresultList.value = response.data.orderlist;
            waitlist.value = response.data.waitlist;
            totaluserresults.value = response?.data?.total;
            loader.value = false;
          } else {
            loader.value = false;
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          loader.value = false;
          console.log(error.data.error);
        });
    };
    const setErrorMessage = (value) => {
      errorMessage.value = value;
      document.querySelector(".toast-content").style.display = "block";
      setInterval(() => {
        errorMessage.value = "";
        document.querySelector(".toast-content").style.display = "none";
      }, 5000);
    };

    const handleuserresultsPageRowChange = (row) => {
      if (row) {
        userresultsPageRow.value = row;
        userresultsPageRowOpen.value = false;
        getuserresults();
      }
    };

    const handleuserresultsPageChange = (page) => {
      const totalUserResultsValue = Math.ceil(totaluserresults.value / 10);
      console.log("totalUserResultsValue", totalUserResultsValue);
      if (page < 1) {
        setErrorMessage("First Page Now!");
      } else if (page > totalUserResultsValue) {
        setErrorMessage("Last Page Now!");
      } else {
        userresultsPage.value = page;
        getuserresults();
      }
    };



    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      gameidfun();
      setTimeout(() => {
        getuserresults();
      }, 2000);
    }
    const formatDate = (date) => {
      if (!date) return 'N/A';
      const d = new Date(date);

      // Format components
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');

      // Combine components into the desired format
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    return {
      handleuserresultsPageRowChange,
      handleuserresultsPageChange,
      levelTab,
      router,
      userresultList,
      getuserresults,
      totaluserresults,
      isResultCollapseOpen,
      gameid,
      gameidfun,
      userresultsPageRow,
      userresultsPage,
      waitlist,
      formatDate,
      setErrorMessage,
      errorMessage,
      loader,
    };
  },
};
</script>

<style>
.page_btn {
  cursor: pointer;
}

.nav-item {
  cursor: pointer;
}
</style>

<!-- <style scoped>
@import "../assets/css/order.css";
@import "../assets/css/pagination.css";
@import "../assets/css/chunk-vendors.css";
</style> -->
