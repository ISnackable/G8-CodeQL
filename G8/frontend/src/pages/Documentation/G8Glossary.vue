<template>
  <div id="root">
    <Header />
    <Sidebar />

    <div class="tables-basic">
      <div id="location">
        <b-breadcrumb>
          <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
          <b-breadcrumb-item active>G8 Glossary</b-breadcrumb-item>
        </b-breadcrumb>
      </div>

      <div id="content">
        <h2>G8 Glossary</h2>
        <br />

        <table>
          <tr>
            <th>Term</th>
            <th>Description</th>
          </tr>

          <tr>
            <td>G8</td>
            <td>The name of the group that built this source code scanning tool. Also known as Group 8.</td>
          </tr>

          <tr>
            <td>Query Language</td>
            <td>
              Language used by database software. Learning the query language allows for writing of queries from scratch.
            </td>
          </tr>

          <tr>
            <td>query</td>
            <td>
              A set of instructions used to retrieve information from a database.
            </td>
          </tr>

          <tr>
            <td>CodeQL</td>
            <td>
              The analysis engine used by G8 to automate source code scanning.
            </td>
          </tr>

          <tr>
            <td>Source code</td>
            <td>
              Main source of the computer program that contains instructions which tell the program how to function. 
            </td>
          </tr>

<tr>
            <td>Vulnerabilities </td>
            <td>
              A flaw or weakness which occurs in an information system, program, security procedures or implementations that can be exploited or triggered by a threat source.
            </td>
          </tr>

          <tr>
            <td>CVE List</td>
            <td>
              A list of records , each containing an identification number , description, and public reference for publicly known cybersecurity vulnerabilities. 
            </td>
          </tr>

          <tr>
            <td>Bugs </td>
            <td>
              Commonly known as “errors”, bugs are an unexpected defect, fault, flaw or imperfection in a computer program or system. 
            </td>
          </tr>

          <tr>
            <td>Patches </td>
            <td>
              A repair job for a piece of programming . An immediate solution to previously known flaws in a program . Commonly known as a “fix”.
            </td>
          </tr>

          <tr>
            <td>Repository </td>
            <td>
              A database service capable of storing information. E.g. GitHub Repository
            </td>
          </tr>

        </table>
      </div>

    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Widget from '@/components/Widget/Widget';
// import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: "G8Glossary",
  components: {},
  data() {},
};
</script>

<style src="./Documentation.scss" lang="scss" scoped />