<template>
  <div class="admin-layout">
    <NavBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <SideMenuBar :isSidebarOpen="isSidebarOpen" />
    <main class="main-content" :class="{ 'expanded': !isSidebarOpen }">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from '../pages/admin/Navbar.vue'
import SideMenuBar from '../pages/admin/SideMenuBar.vue'

export default {
  name: 'AdminLayout',
  components: {
    NavBar,
    SideMenuBar
  },
  data() {
    return {
      isSidebarOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>