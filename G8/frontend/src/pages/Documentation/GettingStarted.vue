<template>
<div id="root">
<Header />
  <Sidebar />
  
  <div id="location">
  <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Getting Started</b-breadcrumb-item>
    </b-breadcrumb>
  </div>

  <div id="content">

    <h2> Getting Started</h2>

    <br>
    <p> 
      Welcome to LGTM.

      LGTM provides useful insights and code quality information for all sorts of people participating in software 
      development—whether you:

    <li>

      Use open source libraries and frameworks in private projects and want to know how well they're being maintained

    </li>
    <br>
    <li>
      Contribute to open source repositories and want to find out about the quality of the code you contribute
    </li>
    <br>
    <li>
      Own or administer a public Git repository and want to integrate code quality analysis into your pull request review workflow
    </li>
    <br>
    <li>
      Want to join the debate on how to define good quality code
    </li>
    <br>

    
     <h2> Exploring code quality</h2>
     <br>

      LGTM.com analyzes tens of thousands of repositories hosted publicly on Bitbucket, GitHub or GitLab, ranging from massive 
      projects such as Apache Hadoop to small projects that are just getting started. Right now LGTM analyzes codebases written in C/C
      ++, C#, Go, Java, JavaScript/TypeScript and Python.
      <br>
      <br>

      Projects are assessed for code quality, and to give you insight into the impact of each contribution. Every commit to a project 
      is analyzed against a core set of queries, each of which corresponds to particular aspect of coding best practice. The result 
      is data showing trends in productivity and quality, which also provides fine-grained details about individual contributors and 
      individual commits.
      <br>
      <br>

      Get started by:
<br>
<li>
      Searching for projects you are interested in—see Searching
</li>
<li>
      Viewing quality trends and problems in the latest revision—see Exploring projects
</li>
<li>
      Following projects you use or are involved with—see Personalizing content 
</li>

      </div>

    
</div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'
// import Header from '@/components/Header/Header';
// import Sidebar from './Sidebar/Sidebar';

export default {
  name: 'gettingStarted',
  components: { Widget, Sparklines },
  data() {
    return {
      tableStyles: [
        {
          id: 1,
          picture: require('../../assets/tables/1.jpg'), // eslint-disable-line global-require
          description: 'Palo Alto',
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2018'),
          size: '45.6 KB',
          progress: {
            percent: 29,
            colorClass: 'success',
          },
        },
        {
          id: 2,
          picture: require('../../assets/tables/2.jpg'), // eslint-disable-line global-require
          description: 'The Sky',
          info: {
            type: 'PSD',
            dimensions: '2400x1455',
          },
          date: new Date('November 14, 2018'),
          size: '15.3 MB',
          progress: {
            percent: 33,
            colorClass: 'warning',
          },
        },
        {
          id: 3,
          picture: require('../../assets/tables/3.jpg'), // eslint-disable-line global-require
          description: 'Down the road',
          label: {
            colorClass: 'danger',
            text: 'INFO!',
          },
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2018'),
          size: '49.0 KB',
          progress: {
            percent: 38,
            colorClass: 'inverse',
          },
        },
        {
          id: 4,
          picture: require('../../assets/tables/4.jpg'), // eslint-disable-line global-require
          description: 'The Edge',
          info: {
            type: 'PNG',
            dimensions: '210x160',
          },
          date: new Date('September 15, 2018'),
          size: '69.1 KB',
          progress: {
            percent: 17,
            colorClass: 'danger',
          },
        },
        {
          id: 5,
          picture: require('../../assets/tables/5.jpg'), // eslint-disable-line global-require
          description: 'Fortress',
          info: {
            type: 'JPEG',
            dimensions: '1452x1320',
          },
          date: new Date('October 1, 2018'),
          size: '2.3 MB',
          progress: {
            percent: 41,
            colorClass: 'primary',
          },
        },
      ],
      checkboxes1: [false, false, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };
  },
  methods: {
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    getRandomData() {
      const result = [];

      for (let i = 0; i <= 8; i += 1) {
        result.push(Math.floor(Math.random() * 20) + 1);
      }

      return [{data: result}];
    },
    getRandomColor() {
      const colors = ['#547fff', '#9964e3', '#f55d5d', '#ffc247', '#3abf94'];
      return {colors: [colors[Math.floor(Math.random() * colors.length)]]}
    }
  },
};
</script>

<style src="./Documentation.scss" lang="scss" scoped />