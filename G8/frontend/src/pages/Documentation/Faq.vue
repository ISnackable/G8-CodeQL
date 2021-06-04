<template>
  <div id="root">
    <Header />
    <Sidebar />

<div class="tables-basic">
    <div id="location">
      <b-breadcrumb>
        <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
        <b-breadcrumb-item active>FAQ</b-breadcrumb-item>
      </b-breadcrumb>
    </div>

    <div id="content">
      <h2>FAQ</h2>
      <br />

      We know you might have questions regarding the tool, 
      here is a list of the
      most common questions asked and our answers to them.
      <br /><br /><br />

      <div class="question"><h3>How can I upload my source code for scanning?</h3></div>

      

      You can head over to the query page, and choose 
      whether you want to
      upload a file, folder, or even a Github Repository 
      link. You can then
      browse your local files or drag and drop the file 
      into the space provided
      and the scan will start running.

      <br /><br />
    </div>

  </div>
  
  </div>
</template>

<script>
// import Vue from 'vue';
// import Header from '@/components/Header/Header';
// import Sidebar from './Sidebar/Sidebar';

export default {
  name: "Faq",
  components: {},
  data() {},
};
</script>

<style src="./Documentation.scss" lang="scss" scoped />