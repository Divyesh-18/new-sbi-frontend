<template>
  <div class="center_text">
    <ul class="center_top">
      <li class="left_li">
        <ol class="top_ol">
          <img :src="require('../../assets/images/win.png')" alt="" />
          <span>Period</span>
        </ol>
        <ol class="bot_ol">
          {{
            gameid
          }}
        </ol>
      </li>
      <li class="right_li">
        <ol class="top_ol">
          <span>Count Down</span>
        </ol>
        <ol class="bot_ol">
          <button
            :class="localContinueClass"
            style="
              padding: 8px 15px;
              font-size: 14px;
              border-radius: 2px;
              border: 0;
            "
            v-if="localCountcontinue"
            v-on:click="(localCountcontinue = false), (localContinueClass = '')"
          >
            Continue
          </button>
          <div class="countdown" v-if="!localCountcontinue">
            <div class="van-count-down">
              <span class="span">{{
                countDownMinute > 9 ? countDownMinute.toString().charAt(0) : 0
              }}</span>
              <span class="span">{{
                countDownMinute > 9
                  ? countDownMinute.toString().charAt(1)
                  : countDownMinute.toString().charAt(0)
              }}</span>
              <span class="add-color-countdown-dot">:</span>
              <span class="span">{{
                countDownSecond.toString().charAt(0)
                  ? countDownSecond.toString().charAt(0)
                  : 0
              }}</span>
              <span class="span">{{
                countDownSecond.toString().charAt(1)
                  ? countDownSecond.toString().charAt(1)
                  : 0
              }}</span>
            </div>
          </div>
        </ol>
      </li>
    </ul>
    <div class="btn_center">
      <button
        :class="Disabled"
        style="background: rgb(76, 175, 80); color: white"
        v-on:click="betbutton('#4caf50', 'color', 'Green')"
      >
        Join Green
      </button>
      <button
        :class="Disabled"
        style="background: rgb(156, 39, 176); color: white"
        v-on:click="betbutton('#4caf50', 'color', 'Violet')"
      >
        Join Violet
      </button>
      <button
        :class="Disabled"
        style="background: rgb(244, 67, 54); color: white"
        v-on:click="betbutton('#4caf50', 'color', 'Red')"
      >
        Join Red
      </button>
    </div>
    <ul class="center_notes">
      <li>
        <ol
          :class="Disabled"
          style="
            background: linear-gradient(
              to right bottom,
              rgb(156, 39, 176) 50%,
              rgb(244, 67, 54) 50%
            );
            color: white;
          "
          v-on:click="betbutton('#4caf50', 'number', '0')"
        >
          0
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(76, 175, 80)"
          v-on:click="betbutton('#4caf50', 'number', '1')"
        >
          1
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(244, 67, 54)"
          v-on:click="betbutton('#4caf50', 'number', '2')"
        >
          2
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(76, 175, 80)"
          v-on:click="betbutton('#4caf50', 'number', '3')"
        >
          3
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(244, 67, 54)"
          v-on:click="betbutton('#4caf50', 'number', '4')"
        >
          4
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="
            background: linear-gradient(
              to right bottom,
              rgb(156, 39, 176) 50%,
              rgb(76, 175, 80) 50%
            );
          "
          v-on:click="betbutton('#4caf50', 'number', '5')"
        >
          5
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(244, 67, 54)"
          v-on:click="betbutton('#4caf50', 'number', '6')"
        >
          6
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(76, 175, 80)"
          v-on:click="betbutton('#4caf50', 'number', '7')"
        >
          7
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(244, 67, 54)"
          v-on:click="betbutton('#4caf50', 'number', '8')"
        >
          8
        </ol>
      </li>
      <li>
        <ol
          :class="Disabled"
          style="background: rgb(76, 175, 80)"
          v-on:click="betbutton('#4caf50', 'number', '9')"
        >
          9
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    gameid: {
      type: Number,
      required: true,
    },
    countDownMinute: {
      type: Number,
      required: true,
    },
    countDownSecond: {
      type: String,
      required: true,
    },
    countcontinue: {
      type: Boolean,
      required: true,
    },
    continueClass: {
      type: String,
      required: true,
    },
    Disabled: {
      type: String,
      required: true,
    },
    betbutton: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localCountcontinue: this.countcontinue,
      localContinueClass: this.continueClass,
    };
  },

  watch: {
    countcontinue(newVal) {
      this.localCountcontinue = newVal;
    },
    continueClass(newVal) {
      this.localContinueClass = newVal;
    },
  },

  methods: {
    handleContinueClick() {
      this.localCountcontinue = false;
      this.localContinueClass = "";
      this.$emit("update:countcontinue", this.localCountcontinue);
      this.$emit("update:continueClass", this.localContinueClass);
    },
  },
};
</script>
