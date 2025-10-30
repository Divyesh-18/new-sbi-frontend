<template>
  <!-- <link rel="stylesheet" :href="'/css/parity.css'" /> -->
  <div id="app">
    <div class="layout-content">
      <div class="parity-content">
        <div class="van-nav-bar van-hairline--bottom" style="z-index: 1">
          <div class="van-nav-bar__left"></div>
          <div class="van-nav-bar__title van-ellipsis">Parity Record</div>
          <div class="van-nav-bar__right"></div>
        </div>
        <div>
          <div class="kline">
            <div class="reservation-chunk">
              <div class="reservation-chunk-sub">
                <div class="reservation-chunk-sub-title">Period</div>
                <div class="reservation-chunk-sub-num">
                  {{ gameid }}
                </div>
              </div>
              <div class="reservation-chunk-sub" style="text-align: right">
                <div class="reservation-chunk-sub-title">Count Down</div>
                <button :class="continueClass" style="
                    padding: 6px 12px;
                    font-size: 14px;
                    border-radius: 2px;
                    border: 0;
                  " v-if="countcontinue" v-on:click="(countcontinue = false), (continueClass = '')">
                  Continue
                </button>
                <!-- <div class="countdown" v-if="!countcontinue">
                  <div class="van-count-down">
                    <span class="span">{{ countDownMinute > 9 ? countDownMinute.toString().charAt(0) : 0 }}</span>
                    <span class="span">{{ countDownMinute > 9 ? countDownMinute.toString().charAt(1) :
                    countDownMinute.toString().charAt(0) }}</span>
                    <span>:</span>
                    <span class="span">{{ (countDownSecond.toString().charAt(0)) ? countDownSecond.toString().charAt(0) :
                    0 }}</span>
                    <span class="span">{{ (countDownSecond.toString().charAt(1)) ? countDownSecond.toString().charAt(1) :
                    0 }}</span>
                  </div>
                </div> -->
                <div class="reservation-chunk-sub-num" v-if="!countcontinue">
                  <div class="time">
                    <span class="time-sub">
                      <span class="span">
                        {{
                          countDownMinute > 9
                            ? countDownMinute.toString().charAt(0)
                            : 0
                        }}
                      </span>
                    </span>
                    <span class="time-sub">
                      <span class="span">
                        {{
                          countDownMinute > 9
                            ? countDownMinute.toString().charAt(1)
                            : countDownMinute.toString().charAt(0)
                        }}
                      </span>
                    </span>
                    <span class="time-sub-dot">:</span>
                    <span class="time-sub">
                      <span class="span">
                        {{
                          countDownSecond.toString().charAt(0)
                            ? countDownSecond.toString().charAt(0)
                            : 0
                        }}
                      </span>
                    </span>
                    <span class="time-sub">
                      <span class="span">
                        {{
                          countDownSecond.toString().charAt(1)
                            ? countDownSecond.toString().charAt(1)
                            : 0
                        }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kline">
            <div class="reservation-chunk">
              <div class="reservation-chunk-sub">
                <div class="reservation-chunk-sub-title">PrePeriod</div>
                <div class="reservation-chunk-sub-num">
                  {{ lastresult?.periodid }}
                </div>
              </div>
              <div class="reservation-chunk-sub" style="text-align: center">
                <div class="reservation-chunk-sub-title">Result</div>
                <div class="reservation-chunk-sub-num">
                  <div :class="'item-' + lastresult?.randomcolor" style="margin: 9px 0px 0px 35px"
                    v-if="lastresult?.resulttype === 'random'">
                    {{ lastresult?.randomresult }}
                  </div>
                  <div :class="'item-' + lastresult?.color" style="margin: 9px 0px 0px 35px"
                    v-if="lastresult?.resulttype === 'real'">
                    {{ lastresult?.result }}
                  </div>
                </div>
              </div>
              <div class="reservation-chunk-sub" style="text-align: right">
                <div class="reservation-chunk-sub-title">OpenPrice</div>
                <div class="reservation-chunk-sub-num">
                  <div style="color: rgb(232, 57, 241)">
                    {{ lastresult?.randomprice }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kline">
            <div class="title">
              <div class="red">Red:{{ redcount }}</div>
              <div class="green">Green:{{ greencount }}</div>
              <div class="violet">Violet:{{ violetcount }}</div>
            </div>
            <div class="switchBox">
              <button class="van-button van-button--small" :class="show === 'period'
                ? 'van-button--primary'
                : 'van-button--default'
                " v-on:click="show = 'period'">
                <span class="van-button__text">ShowPeriod</span>
              </button>
              <button class="van-button van-button--small" :class="show === 'num' ? 'van-button--primary' : 'van-button--default'
                " v-on:click="show = 'num'">
                <span class="van-button__text">ShowOpenNum</span>
              </button>
            </div>
            <div class="box">
              <div class="grid">
                <div class="row" v-for="(item, key) in getResultbyCategoryList" :key="key">
                  <div class="index">
                    {{ key + 1 }}
                  </div>
                  <div class="cell border" v-for="(item1, key1) in item" :key="key1">
                    <div :class="'item-' + item1.color" v-if="item1 != ''">
                      <span v-show="show === 'num'">{{ item1.value }}</span>
                      <span v-show="show === 'period'">{{ item1.parity }}</span>
                    </div>
                    <div class="item-null" v-if="item1 == ''"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kline">
            <div class="top-selete" style="margin:0px">
              <div class="top-selete-sub" :class="RD === 3 ? 'active' : ''" v-on:click="RD = 3">
                Rd.3
              </div>
              <div class="top-selete-sub" :class="RD === 4 ? 'active' : ''" v-on:click="RD = 4">
                Rd.4
              </div>
              <div class="top-selete-sub" :class="RD === 5 ? 'active' : ''" v-on:click="RD = 5">
                Rd.5
              </div>
              <div class="top-selete-sub" :class="RD === 6 ? 'active' : ''" v-on:click="RD = 6">
                Rd.6
              </div>
              <div class="top-selete-sub" :class="RD === 7 ? 'active' : ''" v-on:click="RD = 7">
                Rd.7
              </div>
              <div class="top-selete-sub" :class="RD === 8 ? 'active' : ''" v-on:click="RD = 8">
                Rd.8
              </div>
            </div>
            <div class="box">
              <div class="grid">
                <div class="row">
                  <div class="index">1</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">0</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                </div>
                <div class="row">
                  <div class="index">2</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                </div>
                <div class="row">
                  <div class="index">3</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
                <div class="row" v-show="RD >= 4">
                  <div class="index">4</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
                <div class="row" v-show="RD >= 5">
                  <div class="index">5</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
                <div class="row" v-show="RD >= 6">
                  <div class="index">6</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
                <div class="row" v-show="RD >= 7">
                  <div class="index">7</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
                <div class="row" v-show="RD >= 8">
                  <div class="index">8</div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <div class="item-violet-green">5</div>
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">7</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <div class="item-violet-red">0</div>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">8</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">1</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">4</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">9</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">2</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <div class="item-red">6</div>
                    <!---->
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-green">3</div>
                    <!---->
                  </div>
                  <div class="cell border">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <div class="item-null"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kline">
            <div class="box">
              <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(245, 40, 39)"
                        :style="'width:' + redloader + '%;'">
                        <span class="van-progress__pivot" style="background: rgb(245, 40, 39)"
                          :style="'left:' + 90 + '%;'">Red:{{ redcount }}</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(21, 114, 57)"
                        :style="'width:' + greenloader + '%;'"><span class="van-progress__pivot"
                          style="background: rgb(21, 114, 57)" :style="'left:' + 90 + '%;'">Green:{{ greencount
                          }}</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(232, 57, 241)"
                        :style="'width:' + violetloader + '%;'"><span class="van-progress__pivot"
                          style="background: rgb(232, 57, 241)" :style="'left:' + 90 + '%;'">Violet:{{ violetcount
                          }}</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 2%"><span
                          class="van-progress__pivot" style="left: 30%; background: rgb(0, 122, 204)">0:12</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 5%"><span
                          class="van-progress__pivot" style="left: 30%; background: rgb(0, 122, 204)">1:36</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 5%"><span
                          class="van-progress__pivot" style="left: 30%; background: rgb(0, 122, 204)">2:37</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 3%"><span
                          class="van-progress__pivot" style="left: 30%; background: rgb(0, 122, 204)">3:44</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 2.5%"><span
                          class="van-progress__pivot" style="left: 30%; background: rgb(0, 122, 204)">4:44</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 51.04px"><span
                          class="van-progress__pivot"
                          style="left: 44.6px; background: rgb(0, 122, 204)">5:14</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 112.56px"><span
                          class="van-progress__pivot"
                          style="left: 102.52px; background: rgb(0, 122, 204)">6:50</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 102.08px"><span
                          class="van-progress__pivot"
                          style="left: 94.2px; background: rgb(0, 122, 204)">7:30</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 114.84px"><span
                          class="van-progress__pivot"
                          style="left: 106.6px; background: rgb(0, 122, 204)">8:31</span></span>
                    </div>
                  </div>
                </div>
                <div class="van-cell">
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-progress">
                      <span class="van-progress__portion" style="background: rgb(0, 122, 204); width: 140.36px"><span
                          class="van-progress__pivot"
                          style="left: 131.4px; background: rgb(0, 122, 204)">9:37</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="van-toast van-toast--middle van-toast--loading" style="z-index: 2053" v-show="loader">
    <div class="van-loading van-loading--circular van-toast__loading">
      <span class="van-loading__spinner van-loading__spinner--circular">
        <svg viewBox="25 25 50 50" class="van-loading__circular">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </span>
    </div>
    <div class="van-toast__text">Loading...</div>
  </div>
</template>

<script>
// import { useMeta } from "vue-meta";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  components: {},
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "sapreshow" });
    const router = useRouter();
    const countDownMinute = ref(0);
    const countDownSecond = ref(0);
    const countcontinue = ref(false);
    const continueClass = ref("");
    const gameid = ref("");
    const getResultbyCategoryList = ref("");
    const greencount = ref("");
    const violetcount = ref("");
    const redcount = ref("");
    const lastresult = ref("");
    const show = ref("num");
    const redloader = ref("");
    const greenloader = ref("");
    const violetloader = ref("");
    const loader = ref(false);
    const RD = ref(3);

    const getResultbyCategory = () => {
      axios
        .post("/trend", {
          category: "parity",
        })
        .then((response) => {
          if (response.data.success) {
            getResultbyCategoryList.value = response?.data?.data?.allresult;
            redcount.value = response?.data?.data?.redcount;
            violetcount.value = response?.data?.data?.totalviolet;
            greencount.value = response?.data?.data?.greencount;
            lastresult.value = response?.data?.data?.latresult;
            redloader.value = (response?.data?.data?.redcount * 100) / 480;
            greenloader.value = (response?.data?.data?.greencount * 100) / 480;
            violetloader.value =
              (response?.data?.data?.totalviolet * 100) / 480;
          } else {
            //alert("ERRORR");
          }
        })
        .catch((error) => {
          console.log(error.data?.error);
        });
    };

    const gameidfun = async () => {
      loader.value = true;
      setTimeout(() => {
        loader.value = false;
      }, 3000);

      axios
        .get("/gameid", {})
        .then((response) => {
          if (response.data.success === true) {
            // loader.value = true;
            // setTimeout(function () { loader.value = false }, 2000);
            gameid.value = response.data.data.gameid;
          } else {
            //  alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    gameidfun();

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

      if (distance == 1) {
        // winnerResultfun();
        // getResultbyCategory();
        // getMineDashbordData();
        gameidfun();
        // setTimeout(() => {
        //   getuserresults();
        //   // userwaitlistfun();
        // }, 2000);
      }
    };

    getResultbyCategory();
    setInterval(function () {
      showTimer();
    }, 1e3);

    return {
      router,
      countDownMinute,
      countDownSecond,
      countcontinue,
      continueClass,
      gameidfun,
      gameid,
      getResultbyCategoryList,
      greencount,
      violetcount,
      redcount,
      lastresult,
      show,
      violetloader,
      greenloader,
      redloader,
      loader,
      RD,
    };
  },
};
</script>
<!-- <style scoped>
@import "../assets/css/parity.css";
</style> -->
