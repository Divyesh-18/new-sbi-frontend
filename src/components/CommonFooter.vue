<template>
  <div class="appBottomMenu">
    <div class="item" :class="icon1 === 'index' && 'active'">
      <router-link to="/">
        <a>
          <div>
            <img :src="require('@/assets/images/home.png')" class="" style="width: 18px; height: 18px" />
            <p style="color: #868f8b; font-size: 12px">Home</p>
          </div>
        </a>
      </router-link>
    </div>
    <div class="item" :class="icon1 === 'search' && 'active'">
      <router-link to="/search">
        <a>
          <div>
            <img :src="require('@/assets/images/search.png')" class="" style="width: 18px; height: 18px" />
            <p style="color: #868f8b; font-size: 12px">Search</p>
          </div>
        </a>
      </router-link>
    </div>
    <!-- <div class="item" :class="icon1 === 'wallet' && 'active'" v-show="isLogin">
      <router-link to="/wallet">
        <a>
          <div>
            <img
              :src="require('@/assets/images/wallet.png')"
              class=""
              style="width: 18px; height: 18px"
            />
            <p style="color: #868f8b; font-size: 12px">Wallet</p>
          </div>
        </a>
      </router-link>
    </div> -->
    <div class="item" :class="icon1 === 'win' && 'active'" v-show="isLogin">
      <router-link to="/win">
        <a>
          <div>
            <img :src="require('@/assets/images/win.png')" class="" style="width: 18px; height: 18px" />
            <p style="color: #868f8b; font-size: 12px">Win</p>
          </div>
        </a>
      </router-link>
    </div>
    <div class="item" :class="icon1 === 'my' && 'active'">
      <router-link :to="myroute">
        <a class="icon toggleSidebar">
          <div>
            <img :src="require('@/assets/images/man.png')" class="" style="width: 18px; height: 18px" id="iman" />
            <p style="color: #868f8b; font-size: 12px">My</p>
          </div>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "CommonFooter",
  props: {
    msg: String,
  },
  setup() {
    const isLogin = ref(false);
    const myroute = ref("/login");
    const router = useRouter();
    const icon = ref("");
    const icon1 = ref("my");

    if (localStorage.getItem("authToken")) {
      isLogin.value = true;
      myroute.value = "/mine";
    }

    // console.log(router);
    icon.value = router?.currentRoute?._value?.name;
    if (icon.value === "index") {
      icon1.value = "index";
    }
    if (icon.value === "wallet") {
      icon1.value = "wallet";
    }
    if (icon.value === "win") {
      icon1.value = "win";
    }

    return {
      isLogin,
      router,
      icon1,
      icon,
      myroute,
    };
  },
};
</script>

<style scoped>
.active img {
  /* filter: invert(15%) sepia(90%) saturate(5000%) hue-rotate(350deg) brightness(95%) contrast(120%); */
  filter: invert(14%) sepia(97%) saturate(7200%) hue-rotate(95deg) brightness(92%) contrast(105%);
}
</style>
