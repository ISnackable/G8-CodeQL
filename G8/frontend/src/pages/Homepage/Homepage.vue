
<template>

<div>
<div :class="{root: true, sidebarClose}">

  <Header/>
  <Sidebar/>
  <Carousel/>
  <Widget>

  <div class="information">


  <b-col lg="9" class="chunk">
          <h5 class="G8header"><strong>What is G8?</strong></h5>
          <p class="whatg8">G8 is a javascript source code vulnerability scanner designed to allow users to upload their source codes via file , folder or github repositories.  
              The scanner will then make use of CodeQL , a technology which allows queries to be written , and run against the provided source code , before highlighting potential
               vulnerabilities at the end of the scan.
          </p>

          <h5 class="G8header"><strong>Who created G8?</strong></h5>
          <p class = "whog8">G8 is created as part of a Final Year Project done by students from Singapore Polytechnic Diploma in Infocomm Security Management Group 3A68 . 
            This project is kindly sponsored by Defense Science Organization ( DSO ) , under the supervision of Mr Peter Teoh ( DSO ) and Mr Vernon Tan ( SP ) 
          </p>

          <h5 class="G8header"><strong>Why use G8?</strong></h5>
          <p class = "whyg8">G8 offers visual representation of results through Neo4J , a graph database that enables users to understand the end results better. It also encompasses features 
            such as fuzzing to reduce false positives in results , and machine learning for the scanner to be abe to adapt to new vulnerabilities which may not have been discovered yet.
          </p>


        </b-col>


      </div>


  </Widget>
  
  
</div>
</div>

</template>



<script>
import Widget from '@/components/Widget/Widget';

import { mapState, mapActions } from 'vuex';
import Sidebar from '@/components/Sidebar/SidebarHomepage';
import Header from '@/components/Header/HeaderHomepage';
import Carousel from '@/components/Carousel/CarouselHomepage';

export default {
  name: 'Homepage',
  components: { Header , Sidebar , Carousel , Widget },
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

<style src="../../components/Header/Header.scss" lang="scss" />
