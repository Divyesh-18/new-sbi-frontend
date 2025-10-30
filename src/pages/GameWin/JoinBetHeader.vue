<template>
  <div class="win">
    <div class="mine_top">
      <div class="mine_info">
        <div class="d-flex show-rules-containner">
          <p class="balance custom-font_size" style="margin-bottom: 0 !important">
            Available balance: ₹ {{ mineDashbordData.balance }}
          </p>
          <!-- <p
            class="text-white show-ruls-label cursor-pointer"
            v-on:click="isShowRules = true"
          >
            Rule
          </p> -->
        </div>
        <!-- <p class="active_users" style="margin-block-start: 0 !important">
          Total Withdrawal:₹ {{ mineDashbordData.totalwithdrawal }}
        </p> -->
        <div class="mine_info_btn">
          <div class="btn-r">
            <router-link to="/recharge">
              <button class="one_btn">Recharge</button>
            </router-link>
            <span v-if="isOneMinuteGame" class="d-none">
              <router-link to="/one/min/trend">
                <button>Trend</button>
              </router-link>
            </span>
            <span v-else class="d-none">
              <router-link to="/emerd">
                <button>Trend</button>
              </router-link>
            </span>
          </div>
          <div class="refresh">
            <img :src="require('../../assets/images/refresh.png')" v-on:click="router.go(0)" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- model -->
  <div class="win-game-rules-model-conatainner">
    <div class="privacy-policy-modal">
      <Modal v-model:visible="isShowRules" :maskClosable="false" height="50%" width="90%" offsetTop="10%">
        <div style="background: #fff" class="modal-header">
          <h5 class="modal-title text-start" style="color: #000; font-size: 25px">
            Rule
          </h5>
        </div>
        <div class="modal-body">
          <p>
            3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to
            show the lottery result. It opens all day. The total number of trade
            is 480.
          </p>
          <p class="add-color-rules-model-if">
            If you spend 100 to trade, after deducting 5 service fee, your
            contract amount is 95:
          </p>
          <p class="add-color-rules-model">1. JOIN GREEN:</p>
          <p>
            if the result shows 1,3,7,9, you will get (95*2) 190 If the result
            shows 5, you will get (95*1.5) 142.5
          </p>
          <p class="add-color-rules-model">2. JOIN RED:</p>
          <p>
            if the result shows 2,4,6,8, you will get (95*2) 190; If the result
            shows 0, you will get (95*1.5) 142.5
          </p>
          <p class="add-color-rules-model">3. JOIN VIOLET:</p>
          <p>if the result shows 0 or 5, you will get (95*4.5) 427.5</p>
          <p class="add-color-rules-model">4. SELECT NUMBER:</p>
          <p>
            if the result is the same as the number you selected, you will get
            (95*9) 855
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-comman btn-close active" data-dismiss="modal"
            v-on:click="isShowRules = false">
            Close
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { Modal } from "usemodal-vue3";
import { ref } from "vue";
export default {
  components: {
    Modal,
  },
  props: {
    mineDashbordData: {
      type: Object,
      required: true,
    },
    isOneMinuteGame: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter();
    const isShowRules = ref(false);
    const refreshPage = () => {
      router.go(0);
    };

    return {
      router,
      refreshPage,
      isShowRules,
    };
  },
};
</script>
