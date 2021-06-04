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
    <br>

    We know you might have questions regarding the tool, here is a list of the most common questions asked and our answers to them. 
    <br><br><br>

Q1. How can I upload my source code for scanning? 

<br><br>

Ans: You can head over to the query page, and choose whether you want to upload a file, folder, or even a Github Repository link. 
    You can then browse your local files or drag and drop the file into the space provided and the scan will start running. 


    <br><br>

    G8 is powered by CodeQL, a code scanning engine which allows queries to be written in order to find the bugs in the code. After finding the issue, you can repair the code by using the provided solutions to save you some time. Once the code is fixed, you can also apply the same solution to the other vulnerabilities of the same kind. 

    <br><br>

    All the queries in G8 are customized to fit the different CVEs in the list and are constantly updated to match the ever-growing list. Securing code is an important step in the code development process, and we want to be part of that step to bring your code to greater heights. 

    <br><br><br>

    <h3>What does G8 support?</h3>
    
Supported file formats:


<li>
      .js files 
    </li>

    <li>
      Github repository links
    </li>

    <br>
Supported languages:
    <li>
      JavaScript
    </li>
<br><br><br>

    <h3>Privacy and Security</h3>

    When the codes are being put through our scanner, it is our policy to not store, or reproduce the information in any way possible. 
  
  </div>
</div>

</div>
</template>

<script>
// import Vue from 'vue';
// import Header from '@/components/Header/Header';
// import Sidebar from './Sidebar/Sidebar';

export default {
  name: 'Documentation',
  components: {  },
  data() { 
  }
};
</script>

<style src="./Documentation.scss" lang="scss" scoped />