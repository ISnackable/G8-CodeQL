<template>
<div id="root">
  <Header />
  <Sidebar />
  
  <div class="tables-basic">
    <div id="location">
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>About G8</b-breadcrumb-item>
    </b-breadcrumb>
    </div>

  <div id="content">
    <h2>About G8</h2>
    <br>

    <h3>Why use G8?</h3>

    Source codes are an integral part of any technological device in the world. From routers, switches to smart home systems, the 
    implementation of the codes shape the usability of the devices. However, such source codes might be at risk of the lurking 
    threats of bugs and cyber-attacks in the cyberspace due to the loopholes in certain parts of the code. Fixing these loopholes 
    is a tiring, tedious and mind-boggling process which we, at G8, aim to resolve using our automatic tool. 
    <br><br><br>

    <h3>How to use G8?</h3>

    G8 is a source code scanning tool which automatically runs a scan of your uploaded code for current and potential 
    vulnerabilities according to the CVE list. After the scan, G8 will present to you the results of the scan, including possible 
    patches for the vulnerability. With bugs becoming increasingly common and varied, failing to fix a vulnerability can lead to 
    dire consequences in the device and throughout the whole system. 

    <br><br>

    G8 is powered by CodeQL, a code scanning engine which allows queries to be written in order to find the bugs in the code. After 
    finding the issue, you can repair the code by using the provided solutions to save you some time. Once the code is fixed, you 
    can also apply the same solution to the other vulnerabilities of the same kind. 

    <br><br>

    All the queries in G8 are customized to fit the different CVEs in the list and are constantly updated to match the ever-growing 
    list. Securing code is an important step in the code development process, and we want to be part of that step to bring your 
    code to greater heights. 

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

    When the codes are being put through our scanner, it is our policy to not store, or reproduce the information in any way 
    possible. 
  
  </div>
</div>

</div>
</template>

<script>
// import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'
// import Header from '@/components/Header/Header';
// import Sidebar from './Sidebar/Sidebar';

export default {
  name: 'Documentation',
  components: { Widget, Sparklines },
  data() { 
  }
};
</script>

<style src="./Documentation.scss" lang="scss" scoped />