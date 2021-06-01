<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
        <b-nav-item right class="mr-2" @click=routeToHomepage><i class="fa fa-home fa-fw"></i>Home</b-nav-item>
        <b-nav-item right class="mr-2" @click=routeToDashboard><i class="fa fa-codiepie fa-fw"></i>Dashboard</b-nav-item>
        <b-nav-item right class="mr-2" @click=routeToDocumentation><i class="fa fa-info-circle fa-fw"></i>Documentation</b-nav-item>
        <b-nav-item class="d-md-none" @click="switchSidebarMethod" ><i class="la la-navicon px-2" /></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  components: {  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
  },
  methods: {
    ...mapActions('layout', ['switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    routeToHomepage() {
      this.$router.push('/homepage');
    },
    routeToDashboard() {
      this.$router.push('/app/dashboard');
    },
    routeToDocumentation() {
      this.$router.push('/documentation');
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" />