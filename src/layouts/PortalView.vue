<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper PortalView">
    <!-- <CheckUserStatus />
		<NavBar /> -->
    <div class="inner-wrapper" :class="$newStore.asideStatus ? 'small-me' : ''">
      <!-- <Sidebar></Sidebar> -->
      <div
        id="bcct"
        class="main-container bg-light-op-300 hide-scrollbar mb-0"
        :class="{
          'aside-active': asideStatus && !isScreenSmall,
          'tw-pr-3': !isScreenSmall,
        }"
      >
        <!-- <BreadCrumbs class="custom-portal" /> -->
        <RouterView class="hide-scrollbar" />
      </div>
    </div>
    <!-- <Footer /> -->
  </div>

  <!-- <PortalModalsView /> -->
</template>

<script>
// import CheckUserStatus from "../components/authentication/CheckUserStatus.vue";
// import NavBar from "../components/main-layout/NavBar.vue";
// import Sidebar from "../components/main-layout/Sidebar.vue";
// import BreadCrumbs from "../components/main-layout/BreadCrumbs.vue";
// import Footer from "../components/main-layout/Footer.vue";
// import PortalModalsView from "./PortalModalsView.vue";
import { watch } from "vue";

export default {
  name: "PortalView",
  //   components: {
  //     Sidebar,
  //     CheckUserStatus,
  //     NavBar,
  //     BreadCrumbs,
  //     Footer,
  //     PortalModalsView,
  //   },
  data() {
    return {
      asideStatus: this.$newStore.asideStatus,
      isScreenSmall: this.$newStore.isScreenSmall,
    };
  },
  created() {},
  beforeMount() {
    document.body.classList.add("d-body", "light", "MizbanCloud");
    watch(
      () => this.$newStore.asideStatus,
      (newValue, oldValue) => {
        this.asideStatus = newValue;
      }
    );
    watch(
      () => this.$newStore.isScreenSmall,
      (newValue, oldValue) => {
        this.isScreenSmall = newValue;
      }
    );
  },
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
